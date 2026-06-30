import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { todoService } from '@/services/todoService'

import type { Todo } from '@/types/todo'

// Chave usada pelo TanStack Query para identificar e cachear essa query
const TODOS_KEY = ['todos']

export function useTodos() {
  const queryClient = useQueryClient()

  // Busca todos os todos da API e armazena em cache
  const todosQuery = useQuery({
    queryKey: TODOS_KEY,
    queryFn: todoService.getAll,
  })

  // Mutation para criar um novo todo
  const createTodo = useMutation({
    mutationFn: (title: string) => todoService.create(title),
    onSuccess: (newTodo) => {
      // Atualiza o cache diretamente, adicionando o novo todo à lista existente
      queryClient.setQueryData<Todo[]>(TODOS_KEY, (oldTodos) => {
        if (!oldTodos) return [newTodo]
        return [...oldTodos, newTodo]
      })
    },
  })

  // Mutation para atualizar (ex: marcar como concluído)
  const updateTodo = useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      todoService.update(id, { completed }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TODOS_KEY }),
  })

  // Mutation para editar o título de um todo
  const editTodo = useMutation({
  mutationFn: ({ id, title }: { id: string; title: string }) =>
    todoService.update(id, { title }),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: TODOS_KEY }),
})

  // Mutation para remover um todo
  const removeTodo = useMutation({
    mutationFn: (id: string) => todoService.remove(id),
    onSuccess: (_data, id) => {
      // _data é o retorno da mutationFn (vazio nesse caso)
      // id é o argumento que foi passado para o .mutate(id)
      queryClient.setQueryData<Todo[]>(TODOS_KEY, (oldTodos) => {
        if (!oldTodos) return []
        return oldTodos.filter((todo) => todo.id !== id)
      })
    },
  })

  return {
    todos: todosQuery.data ?? [],
    isLoading: todosQuery.isLoading,
    isError: todosQuery.isError,
    createTodo,
    updateTodo,
    editTodo,
    removeTodo,
  }
}