"use client"
import { assets } from '../assets/assets'
import Link from "next/link";
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();
  return (
    <div className='w-[18%] min-h-screen border-r-2 '>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>

            <Link className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${pathname == "/add" ? "bg-[#ffebf5] border-[#c586a5]":""}`} href="/add">
                <img className='w-5 h-5' src={assets.add_icon.src} alt="" />
                <p className='hidden md:block'>Add Items</p>
            </Link>

            <Link className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${pathname == "/list" ? "bg-[#ffebf5] border-[#c586a5]":""}`} href="/list">
                <img className='w-5 h-5' src={assets.order_icon.src} alt="" />
                <p className='hidden md:block'>List Items</p>
            </Link>

            <Link className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${pathname == "/orders" ? "bg-[#ffebf5] border-[#c586a5]":""}`} href="/orders">
                <img className='w-5 h-5' src={assets.order_icon.src} alt="" />
                <p className='hidden md:block'>Orders</p>
            </Link>

        </div>

    </div>
  )
}

export default Sidebar