import { useState } from 'react'

import './App.css'
import TeacherList from './Pages/Teacher'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <TeacherList />
   </div>
  )
}

export default App
