"use client";

import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from 'axios'
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export default function Profile() {
    const {backendUrl, token} = useContext(ShopContext)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const router = useRouter();

    const getProfile = async()=>{
        try {
            if(!token)return null;

            const response = await axios.post(backendUrl + "/api/user/profile" , {} , {headers:{token}})
            // console.log(response);
            if(response.data.success){
                setName(response.data.user.name);
                setEmail(response.data.user.email);
            }else{
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    useEffect(() => {
        getProfile()
    }, [token])
    
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="bg-white shadow-md rounded-xl p-8 border border-gray-200">
        {/* Profile Header */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-600">
            N
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {name}
            </h1>
            <p className="text-gray-500 mt-1">
              {email}
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8" />

        {/* About */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Check your orders
          </h2>

          <button onClick={()=>router.push("/orders")} className="bg-black text-white px-4 py-2 rounded-3xl">
            Orders
          </button>
        </div>
      </div>
    </div>
  );
}