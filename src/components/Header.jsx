import { Link } from "react-router-dom"


const Header = () => {
  return (
    <div className='h-24 border-b border-b-[#E5E7EB] flex items-center pl-10'>
      <Link to="/" className='text-4xl font-semibold text-[#DC2626]'>Header</Link>
    </div>
  )
}

export default Header