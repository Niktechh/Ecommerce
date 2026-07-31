"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Title from "../components/Title";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function Orders(){
  const { currency, products, backendUrl, token } = useContext(ShopContext);

  const [orders, setorders] = useState([]);

  const loadOrders = async () => {
    try {
      if (!token) return null;
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } },
      );
      // console.log(response);
      if (response.data.success) {
        setorders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    loadOrders();
  }, [token]);

  return (
    <>
      <Navbar />
      <div>
        <div className="border-t pt-16">
          <div className="text-2xl">
            <Title text1={"MY"} text2={"ORDERS"} />
          </div>

          <div>
            {orders.map((item, index) => (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="flex items-start gap-6 text-sm">
                  {item.items.map((p, index) => (
                    <img
                      key={index}
                      className="w-16 sm:w-20"
                      src={p.image[0]}
                      alt=""
                    />
                  ))}

                  <div>
                    {item.items.map((p, index) => (
                      <p key={index} className="sm:text-base font-medium">
                        {p.name}
                      </p>
                    ))}

                    <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                      <p>
                        Toatal Amount: {currency}
                        {item.amount}
                      </p>
                      <p>
                        Total Quantity:{" "}
                        {item.items.reduce(
                          (total, product) => total + product.quantity,
                          0,
                        )}
                      </p>

                      <p>Sizes: {item.items.map((p) => p.size).join(", ")}</p>
                    </div>
                    <p className="mt-1">
                      Date:{" "}
                      <span className=" text-gray-400">
                        {new Date(item.date).toDateString()}
                      </span>
                    </p>
                    <p className="mt-1">
                      Payment:{" "}
                      <span className=" text-gray-400">
                        {item.paymentMethod}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-between">
                  <div className="flex items-center gap-2">
                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                    <p className="text-sm md:text-base">{item.status}</p>
                  </div>
                  <button
                    onClick={loadOrders}
                    className="border px-4 py-2 text-sm font-medium rounded-sm"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};


