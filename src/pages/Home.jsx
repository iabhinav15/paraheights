/* This is the home page of the app. It is the first page that the user sees when they visit the app. It contains a link to the login page.*/

import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <div className='min-h-[calc(100vh-300px)] flex justify-center items-center px-4'>
      <Link 
        to="/login"
        className='text-Primary underline text-xl'>Go to loing page</Link>
    </div>
  )
}

export default Home