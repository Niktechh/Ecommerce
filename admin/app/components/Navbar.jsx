"use client"
import { useRouter } from 'next/navigation'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  const router = useRouter();

  const logOut = ()=>{
    localStorage.removeItem("token")
    router.push("/")
  }
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <img className='w-[max(5%,80px)]' src={assets.logo.src} alt="" />
        <button onClick={logOut} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar