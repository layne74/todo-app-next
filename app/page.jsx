import Image from 'next/image'
import styles from './page.module.css'
import prisma from '@/lib/prisma'
import Todo from './components/Todo'
import TodoInput from './components/TodoInput'

async function getTodos() {
  const res = await prisma.todo.findMany({
    orderBy: {
      id: 'desc',
    },
  })
  return res
}

export default async function Home() {
  const todos = await getTodos()
  return (
    <main className={styles.main}>
      <h1>Todos</h1>
      <TodoInput />
      {todos.map((todo) => (
        <Todo key={todo.id} id={todo.id} content={todo.content} completed={todo.completed} />
      ))}
    </main>
  )
}

