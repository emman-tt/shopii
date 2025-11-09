import { useState, useEffect, useRef } from 'react'
import './App.css'
import Homepage from './pages/HomePage'


function App() {
  const [count, setCount] = useState(0)
  
  

  return (
    <div id="smooth-wrapper" className="w-full h-full overflow-hidden">
      <div id="smooth-content" className="overflow-visible w-full">
        <section className="flex min-h-screen bg-white dark:bg-gray-900 dark:text-slate-50">
          <Homepage />
        </section>
      </div>
    </div>
  )
}

export default App