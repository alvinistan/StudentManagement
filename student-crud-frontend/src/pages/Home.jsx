import React from 'react'
import StudentForm from '../components/StudentForm'

const Home = () => {
  return (
    <div>
        <div>
            <header>
                <h1 className='text-3xl font-bold text-gray-900'>Student Management System</h1>
                <p className='mt-1 text-gray-600'>React + Taildwind frontend connected to Express + MongoDB API</p>
            </header>
            <StudentForm/>
        </div>
    </div>
  )
}

export default Home