import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { useTodos } from '@/hooks/useTodos'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { TodoEditModal } from '@/components/TodoEditModal'
import type { Todo } from '@/types/todo'

export function TodoList() {
  const { todos, isLoading, isError, updateTodo, removeTodo } = useTodos()
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)

  if (isLoading) return <p className="text-center text-gray-500">Carregando...</p>
  if (isError) return <p className="text-center text-red-500">Erro ao carregar tarefas.</p>
  if (todos.length === 0) return <p className="text-center text-gray-400">Nenhuma tarefa ainda.</p>

  return (
    <>
      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-3 border rounded-lg"
          >
            <div className="flex items-center gap-3">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={(checked) =>
                  updateTodo.mutate({ id: todo.id, completed: !!checked })
                }
              />
              <span className={todo.completed ? 'line-through text-gray-400' : ''}>
                {todo.title}
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setEditingTodo(todo)}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeTodo.mutate(todo.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal de edição — só renderiza quando há um todo sendo editado */}
      <TodoEditModal
        todo={editingTodo}
        onClose={() => setEditingTodo(null)}
      />
    </>
  )
}