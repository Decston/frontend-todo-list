import { useTodos } from '@/hooks/useTodos'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

export function TodoList() {
  const { todos, isLoading, isError, updateTodo, removeTodo } = useTodos()

  if (isLoading) return <p className="text-center text-gray-500">Carregando...</p>
  if (isError) return <p className="text-center text-red-500">Erro ao carregar tarefas.</p>
  if (todos.length === 0) return <p className="text-center text-gray-400">Nenhuma tarefa ainda.</p>

  return (
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
          <Button
            variant="destructive"
            size="sm"
            onClick={() => removeTodo.mutate(todo.id)}
          >
            Remover
          </Button>
        </li>
      ))}
    </ul>
  )
}