import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import { Link, Route, Routes } from 'react-router-dom'
import StudentList from './components/StudentList'
import StudentCard from './components/StudentCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <nav style={{padding: "10px", borderBottom: "1px solid #ccc", marginBottom: "20px"}}>
        <Link to="/" style={{marginRight: "10px"}}>Home</Link>
        <Link to="/students">Students List</Link>
         <Link to="/add-student" style={{marginLeft: "10px"}}>Add Student</Link>
      </nav>

      {/* Define routes for the application */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/students" element={<StudentList/>} />
        <Route path='/add-student' element={<StudentCard/>} />
      </Routes>

    </div>
  )
}

export default App
