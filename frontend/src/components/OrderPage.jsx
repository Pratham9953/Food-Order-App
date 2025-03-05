import React, { useEffect, useState } from "react";
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📦 Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Order #{order.id}</h3>
              <p className="text-gray-500">Placed on: {new Date(order.date).toLocaleDateString()}</p>
              <ul className="mt-2">
                {order.items.map((item, i) => (
                  <li key={i} className="text-gray-700">{item.name} - ₹{item.price}</li>
                ))}
              </ul>
              <p className="font-semibold mt-2">Total: ₹{order.totalPrice}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
