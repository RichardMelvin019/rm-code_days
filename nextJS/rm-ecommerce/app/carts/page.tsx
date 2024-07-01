"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface Carts {
  id: number;
  created_at: string;
  updated_at: string;
  start_date: string;
  ordered_date: string | null;
  ordered: boolean;
  user: number;
  items: number[];
}

interface CartItems {
  id: number;
  created_at: string;
  updated_at: string;
  quantity: number;
  product: number;
  user: number;
}

interface User {
  id: number;
  last_login: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  date_joined: string;
}


const Carts = () => {
  // baseUrl
  const baseUrl = "https://ecommerce-api.netrobase.dev/api/";
  const [carts, setCarts] = useState<Carts[] | []>([]);
  const getCarts = async () => {
    try {
      const response = await axios.get(`${baseUrl}carts/`);
      setCarts(response?.data?.results);
    } catch (error: any) {
      console.error("Error fetching carts:", error?.message);
    }
  };

  const [cartItems, setCartItems] = useState<CartItems[] | []>([]);
  const getCartItems = async () => {
    try {
      const response = await axios.get(`${baseUrl}cartitems/`);
      setCartItems(response?.data?.results);
    } catch (error: any) {
      console.error("Error fetching cart items:", error?.message);
    }
  };

  const [users, setUsers] = useState<User[] | []>([]);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        "https://ecommerce-api.netrobase.dev/api/users/"
      );
      setUsers(response?.data?.results);
    } catch (error: any) {
      console.error("Error fetching users:", error?.message);
    }
  };

  useEffect(() => {
    getCarts();
    getCartItems();
    getUsers();
  }, []);

  return (
    <div>
      {carts.length > 0 ? (
        <div>
          {carts.map((cart) => {
            return (
              <div>
                <table
                  key={cart.id}
                  className="m- table table-auto bg-slate-600 border-separate border-spacing-2 border rounded-sm m-5 text-white"
                >
                  <thead>
                    <tr>
                      <th className="border border-slate-500 p-1">Cart ID</th>
                      <th className="border border-slate-500 p-1">User</th>
                      <th className="border border-slate-500 p-1">
                        Start Date
                      </th>
                      <th className="border border-slate-500 p-1">
                        Ordered Date
                      </th>
                      <th className="border border-slate-500 p-1">Ordered</th>
                      <th className="border border-slate-500 p-1">
                        Updated Date
                      </th>
                      <th className="border border-slate-500 p-1">
                        Cart Items
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-500 p-1">
                        {cart.user}
                      </td>
                      <td className="border border-slate-500 p-1">
                        {users ? (
                          users.map((user) => {
                            if (user.id === cart.user) {
                              return <p>{user.username}</p>;
                            }
                          })
                        ) : (
                          <p>No User</p>
                        )}
                      </td>
                      <td className="border border-slate-500 p-1">
                        {new Date(cart.start_date).toLocaleString("en-US", {
                          month: "long",
                          day: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </td>
                      <td className="border border-slate-500 p-1">
                        {cart.ordered_date
                          ? new Date(cart.ordered_date).toLocaleString(
                              "en-US",
                              {
                                month: "long",
                                day: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )
                          : "Not Ordered yet"}
                      </td>
                      <td className="border border-slate-500 p-1">
                        {cart.ordered ? "Yes" : "No"}
                      </td>
                      <td className="border border-slate-500 p-1">
                        {new Date(cart.updated_at).toLocaleString("en-US", {
                          month: "long",
                          day: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* <p className="">{cart.items}</p>
                {cartItems ? (
                  cartItems.map((cartItem) => {
                    if (cartItem.id === cart.i) {
                      return (
                        <div>

                        </div>
                  }
                )} */}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center m-10 text-teal-100 font-serif font-bold">
          No Cart Yet. Try Adding...
        </p>
      )}
    </div>
  );
};

export default Carts;
