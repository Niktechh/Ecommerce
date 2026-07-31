"use client"
import axios from "axios";
import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";



export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('');
  const [token, setToken] = useState('')
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems , setcartItems] = useState({});

const addToCart = async(itemId, size) => {
  if (!size) {
    toast.error("Please select a size");
    return;
  }

  let cartData = structuredClone(cartItems);

  if (cartData[itemId]) {
    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId][size] = 1;
    }
  } else {
    cartData[itemId] = {};
    cartData[itemId][size] = 1;
  }

  setcartItems(cartData);
  if(token){
    try {
      await axios.post(backendUrl + "/api/cart/add" , {itemId,size} ,{headers:{token}});
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  toast.success("Product added to cart!");
};

const getCartCount = ()=>{
  let totalCount  = 0;

  for(const items in cartItems){
    for(const item in cartItems[items]){
      try {
        if(cartItems[items][item]>0){
          totalCount += cartItems[items][item]
        }
      } catch (error) {
        
      }
    }
  }
  return totalCount
}


const updateQuantity = async(itemId, size ,quantity) =>{
  let cartData = structuredClone(cartItems);

  cartData[itemId][size] = quantity

  setcartItems(cartData)

  if(token){
    try {
      await axios.post(backendUrl + "/api/cart/update" , {itemId,size,quantity} , {headers:{token}})
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

}

const getCartAmount = ()=>{
  let totalAmt = 0;
  for(const items in cartItems){
    let productInfo = products.find((product)=> product._id === items);
    for(const item in cartItems[items]){
      try {
        if(cartItems[items][item]>0){
          totalAmt+= productInfo.price*cartItems[items][item]
        }
      } catch (error) {
        
      }
    } 
  }
  return totalAmt;
}
const getProductData = async()=>{
    try {
      const response = await axios.get(backendUrl + "/api/product/list" )
      if(response.data.success){
        setProducts(response.data.products)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
}

const getUsercart = async(token)=>{
  if(token){
    try {
    let result = await axios.post(backendUrl + "/api/cart/get",{} ,{headers:{token}} )
    if(result.data.success){
      setcartItems(result.data.cartData);
    }else{
      toast.error(result.data.message)
    }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
}

  useEffect(() => {
    getProductData();
  }, [])
  
  useEffect(() => {
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
    }
    getUsercart(localStorage.getItem('token'))
  }, [])
  


  const value = {
    products,
    currency,
    backendUrl,
    token,
    setToken,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setcartItems,
    addToCart,getCartCount,updateQuantity,getCartAmount
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;