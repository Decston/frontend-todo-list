import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTodos } from '@/hooks/useTodos'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import type { Todo } from '@/types/todo'

const editSchema = z.object({
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres'),
})

type EditFormData = z.infer<typeof editSchema>

interface TodoEditModalProps {
  todo: Todo | null        // o todo que está sendo editado
  onClose: () => void      // função para fechar o modal
}

export function TodoEditModal({ todo, onClose }: TodoEditModalProps) {
  const { editTodo } = useTodos()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditFormData>({
    resolver: zodResolver(editSchema),
    values: { title: todo?.title ?? '' }, // preenche o input com o título atual
  })

  function onSubmit(data: EditFormData) {
    if (!todo) return
    editTodo.mutate(
      { id: todo.id, title: data.title },
      { onSuccess: onClose }, // fecha o modal após salvar
    )
  }

  return (
    <Dialog open={!!todo} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar tarefa</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Input {...register('title')} />
            {errors.title && (
              <span className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </span>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={editTodo.isPending}>
              {editTodo.isPending ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}