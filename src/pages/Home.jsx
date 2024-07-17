import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <div className='min-h-[calc(100vh-300px)] flex justify-center items-center'>
      <Link 
        to="/login"
        className='text-blue-500 underline text-xl'>Go to loing page</Link>
    </div>
  )
}

export default Home