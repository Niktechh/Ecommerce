"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Suspense, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from 'axios'
import { toast } from "react-toastify";


 function VerifyContent() {
  const {token , backendUrl , setcartItems} = useContext(ShopContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async()=>{
    try {
        if(!token)return ;
        const response = await axios.post(backendUrl + "/api/order/verifyStripe" , {success , orderId} , {headers:{token}})
        if(response.data.success){
            setcartItems({})
            router.push("/orders")
        }else{
            router.push("/cart")
            toast.error("Payement failed")
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  }
  useEffect(() => {
    verifyPayment()
  }, [token])
  


  return <>
      <Navbar />
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg">Verifying Payment...</p>
      </div>
      <Footer />
    </>
}

export default function Verify() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}