import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, removeFromCart, setCart }) => {
    const navigate = useNavigate();

    // Function to place order
    const placeOrder = async () => {
        if (cart.length === 0) {
          alert("Cart is empty! Please add items first.");
          return;
        }
      
        try {
          await axios.post("http://localhost:5000/api/orders", { items: cart });
          alert("🎉 Order placed successfully!");
      
          // Clear cart from local storage
          localStorage.removeItem("cart");
      
          // Update state to reflect changes
          setCart([]); 
      
          navigate("/"); // Redirect to menu
        } catch (error) {
          console.error("Error placing order:", error);
          alert("Failed to place order. Try again.");
        }
      };
      
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">🛒 Your Cart</h2>
            {cart.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
            ) : (
                <ul>
                    {cart.map((item, index) => (
                        <li key={`${item.id}-${index}`} className="border-b p-2 flex justify-between items-center">
                            <span>{item.name} - ₹{item.price}</span>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                            >
                                ❌ Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Place Order Button */}
            {cart.length > 0 && (
                <button
                    onClick={placeOrder}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                    ✅ Place Order
                </button>
            )}

            {/* Back to Menu Button */}
            <button
                onClick={() => navigate("/")}
                className="mt-4 ml-2 bg-gray-800 text-white px-4 py-2 rounded-md"
            >
                🔙 Back to Menu
            </button>
        </div>
    );
};

export default Cart;
