import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTodos } from '@/hooks/useTodos'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Schema de validação: título obrigatório com mínimo de 3 caracteres
const todoSchema = z.object({
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres'),
})

type TodoFormData = z.infer<typeof todoSchema>

export function TodoForm() {
  const { createTodo } = useTodos()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
  })

  function onSubmit(data: TodoFormData) {
    createTodo.mutate(data.title, {
      onSuccess: () => reset(), // limpa o formulário após criar
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <div className="flex flex-col flex-1">
        <Input
          placeholder="Digite uma nova tarefa..."
          {...register('title')}
        />
        {errors.title && (
          <span className="text-red-500 text-sm mt-1">
            {errors.title.message}
          </span>
        )}
      </div>
      <Button type="submit" disabled={createTodo.isPending}>
        {createTodo.isPending ? 'Adicionando...' : 'Adicionar'}
      </Button>
    </form>
  )
}