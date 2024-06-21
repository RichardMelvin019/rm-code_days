"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  password: string;
  last_login: string;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  groups: [];
  user_permissions: [];
}

const Users = () => {
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
    getUsers();
  }, []);

  return (
    <div>
      {users ? (
        users.map((user) => {
          return (
            <div
              className="text-center font-serif m-3 p-3 text-teal-500"
              key={user.id}
            >
              <div className="text-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 bg-slate-700 rounded-lg m-2 animate-slideInOut ">
                  <h1>
                    <span className="text-teal-100">Username:</span>{" "}
                    {user.username}
                  </h1>
                  <p>
                    <span className="text-teal-100">First Name:</span>{" "}
                    {user.first_name}
                  </p>
                  <p>
                    <span className="text-teal-100">Last Name:</span>{" "}
                    {user.last_name}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 bg-slate-800 rounded-lg m-2 animate-slideOutIn">
                  <p>
                    <span className="text-teal-100">Email:</span> {user.email}
                  </p>
                  <p>
                    <span className="text-teal-100">Last Login:</span>{" "}
                    {user.last_login}
                  </p>
                  <p>
                    <span className="text-teal-100">Date Joined:</span>{" "}
                    {user.date_joined}
                  </p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No User yet. Fetching ...</p>
      )}
    </div>
  );
};

export default Users;
