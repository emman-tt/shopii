import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Collapse from './reuse/collapseComp'
import Homepage from './pages/HomePage'

function App () {
  const [count, setCount] = useState(0)

  return (
    <section
      className={'flex h-screen bg-white  dark:bg-gray-900 dark:text-slate-50'}
    >
      <Homepage />
    </section>
  )
}

export default App
