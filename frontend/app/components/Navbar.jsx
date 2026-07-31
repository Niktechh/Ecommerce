"use client"
import {assets} from "../assets/assets"
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from "react"
import { useRouter } from "next/navigation";

const Navbar = () => {
    const [visible , setvisisble] = useState(false);
    const pathname = usePathname();
    const { setShowSearch ,getCartCount , token, setToken ,setCartItems } = useContext(ShopContext);
    const cartCount = getCartCount();
    const router = useRouter();

    const logout = ()=>{
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
        router.push("/")
    }

  return (
    <div className='flex items-center justify-between py-5 font-medium px-3'>    
        <img src={assets.logo.src} alt="logo" className='w-16'  />
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
           <Link href="/" className="flex flex-col items-center gap-1">
           <p>Home</p>
           <hr className={pathname === "/"?"w-2/4 border-none h-[1.5px] bg-gray-700":""} />
           </Link>
           <Link href="/collection" className="flex flex-col items-center gap-1">
           <p>Collection</p>
           <hr className={pathname === "/collection"?"w-2/4 border-none h-[1.5px] bg-gray-700":""} />
           </Link>
           <Link href="/about" className="flex flex-col items-center gap-1">
           <p>About</p>
           <hr className={pathname === "/about"?"w-2/4 border-none h-[1.5px] bg-gray-700":""} />
           </Link>
           <Link href="/contact" className="flex flex-col items-center gap-1">
           <p>Contact</p>
           <hr className={pathname === "/contact"?"w-2/4 border-none h-[1.5px] bg-gray-700":""} />
           </Link>
        </ul>
        <div className="flex items-center gap-6">
            <img src={assets.search_icon.src} alt="search icon" className="w-5 cursor-pointer" onClick={() => setShowSearch(true)} />
            <div className="group relative">
                <Link href="/login"><img src={assets.profile_icon.src} className="w-5 cursor-pointer" alt="profile-icon" /></Link>
                <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 ">
                    <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                        <Link className="cursor-pointer hover:text-black" href="/profile">My profile</Link>
                        <Link className="cursor-pointer hover:text-black" href="/orders">Orders</Link>
                        <Link onClick={logout} className="cursor-pointer hover:text-black" href="/login">Logout</Link>
                    </div>
                </div>
            </div>
            <Link href='/cart' className="relative" >
                <img src={assets.cart_icon.src} alt="cart_icon" className="w-5 min-w-5" />
                <p className="absolute -right-1.25 -bottom-1.25 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">{cartCount}</p>
            </Link>
            <img onClick={()=>setvisisble(true)} src={assets.menu_icon.src} alt="menu_icon" className="sm:hidden w-5 cursor-pointer" />
        </div>
        {/* sidebar menu */}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible? 'w-full' : 'w-0'}`}>
            <div className="flex flex-col text-gray-600">
                <div onClick={()=>setvisisble(false)} className="cursor-pointer flex items-center gap-4 p-3">
                    <img src={assets.dropdown_icon.src} alt="back_button" className="h-4 rotate-180"/>
                    <p>Back</p>
                </div>
                <Link href="/" className="flex flex-col items-center gap-1">
           <p>Home</p>
           <hr className={pathname === "/"?"w-2/4 border-none h-[1.5px] bg-gray-700":""} />
           </Link>
           <Link href="/collection" className="flex flex-col items-center gap-1">
           <p>Collection</p>
           <hr className={pathname === "/collection"?"w-2/4 border-none h-[1.5px] bg-gray-700":""} />
           </Link>
           <Link href="/about" className="flex flex-col items-center gap-1">
           <p>About</p>
           <hr className={pathname === "/about"?"w-2/4 border-none h-[1.5px] bg-gray-700":""} />
           </Link>
           <Link href="/contact" className="flex flex-col items-center gap-1">
           <p>Contact</p>
           <hr className={pathname === "/contact"?"w-2/4 border-none h-[1.5px] bg-gray-700":""} />
           </Link>

            </div>
        </div>
        
    </div>
  )
}

export default Navbar