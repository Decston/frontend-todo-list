import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { todoService } from '@/services/todoService'

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
    // Após criar, invalida o cache para refazer a busca automaticamente
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TODOS_KEY }),
  })

  // Mutation para atualizar (ex: marcar como concluído)
  const updateTodo = useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      todoService.update(id, { completed }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TODOS_KEY }),
  })

  // Mutation para remover um todo
  const removeTodo = useMutation({
    mutationFn: (id: string) => todoService.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TODOS_KEY }),
  })

  return {
    todos: todosQuery.data ?? [],
    isLoading: todosQuery.isLoading,
    isError: todosQuery.isError,
    createTodo,
    updateTodo,
    removeTodo,
  }
}