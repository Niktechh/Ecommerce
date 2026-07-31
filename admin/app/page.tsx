"use client";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const Backendurl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const currency = "$"; 

export default function Page() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const storedToken = localStorage.getItem("token"); 
    if (storedToken) {
    setToken(storedToken);
  }
  }, [])
  

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token == "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
          </div>
        </>
      )}
    </div>
  );
}
