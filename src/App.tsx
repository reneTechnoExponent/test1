import * as React from 'react'
import './App.css'
import { Header } from './components/Header'
import { Counter } from './components/Counter'
import { useLocalStorage } from './hooks/useLocalStorage'

export function App() {
  const [count, setCount] = useLocalStorage('count', 0)

  return (
    <div className="App">
      <Header title="Vite + React + TypeScript" />
      <main>
        <Counter count={count} setCount={setCount} />
      </main>
    </div>
  )
}