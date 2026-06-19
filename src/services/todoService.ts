import type { Todo } from '@/types/todo'

const BASE_URL = 'http://localhost:3001/todos'

export const todoService = {
  // Busca todos os todos
  getAll: async (): Promise<Todo[]> => {
    const response = await fetch(BASE_URL)
    return response.json()
  },

  // Cria um novo todo
  create: async (title: string): Promise<Todo> => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, completed: false }),
    })
    return response.json()
  },

  // Atualiza um todo existente (ex: marcar como concluído)
  update: async (id: string, data: Partial<Todo>): Promise<Todo> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  // Remove um todo
  remove: async (id: string): Promise<void> => {
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
  },
}