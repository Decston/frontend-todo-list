import { TodoForm } from '@/components/TodoForm'
import { TodoList } from '@/components/TodoList'

function App() {
  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-xl mx-auto px-4 flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center">Lista ToDo's</h1>
        <TodoForm />
        <div className='min-h-80'>
          <TodoList />
        </div>
      </div>
    </main>
  )
}

export default App