import axios from 'axios'
import type { Todo } from '@/types/todo'

const BASE_URL = 'http://localhost:3001'

const api = axios.create({
  baseURL: BASE_URL,
})

export const todoService = {
  // Busca todos os todos
  getAll: async (): Promise<Todo[]> => {
    const response = await api.get('/todos')
    return response.data
  },

  // Cria um novo todo
  create: async (title: string): Promise<Todo> => {
    const response = await api.post('/todos', { title, completed: false })
    return response.data
  },

  // Atualiza um todo existente (ex: marcar como concluído)
  update: async (id: string, data: Partial<Todo>): Promise<Todo> => {
    const response = await api.patch(`/todos/${id}`, data)
    return response.data
  },

  // Remove um todo
  remove: async (id: string): Promise<void> => {
    await api.delete(`/todos/${id}`)
  },
}