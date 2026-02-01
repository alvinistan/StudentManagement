import React from 'react'
import StudentForm from '../components/StudentForm'
import StudentList from '../components/StudentList'

const Home = () => {
  return (
    <div className='min-h-screen bg-gray-100 p-6'>
        <div className='mx-auto max-w-4xl space-y-6'>
            <header className='rounded-2xl bg-green-400 p-5 shadow'>
                <h1 className='text-3xl font-bold text-gray-900'>Student Management System</h1>
                <p className='mt-1 text-gray-600'>React + Taildwind frontend connected to Express + MongoDB API</p>
            </header>
            <StudentForm/>
        </div>
    </div>
  )
}

export default Home