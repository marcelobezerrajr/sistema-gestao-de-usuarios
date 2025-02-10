import React, { createContext, useState, useEffect, useContext } from "react";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService";
import { LoginContext } from "./LoginContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(LoginContext);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user) return;

      setLoading(true);
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error loading Users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  const getUser = async (id_user) => {
    try {
      const user = await getUserById(id_user);
      if (!user) throw new Error(`User with ID ${id_user} not found.`);
      return user;
    } catch (error) {
      console.error(`Error loading user ID ${id_user}:`, error);
      throw error;
    }
  };

  const addUser = async (newUser) => {
    try {
      const addedUser = await createUser(newUser);
      setUsers([...users, addedUser]);
      return { success: true, message: "User added successfully!" };
    } catch (error) {
      console.error("Error adding user:", error);
      return {
        success: false,
        message: "Error adding user. Check the data and try again.",
      };
    }
  };

  const updateUserData = async (id_user, updatedUser) => {
    try {
      const updated = await updateUser(id_user, updatedUser);
      setUsers(
        users.map((user) => (user.id_user === id_user ? updated : user))
      );
      return { success: true, message: "User updated successfully!" };
    } catch (error) {
      console.error("Error updating user:", error);
      return {
        success: false,
        message: "Error updating user. Check the data and try again.",
      };
    }
  };

  const removeUser = async (id_user) => {
    try {
      await deleteUser(id_user);
      setUsers(users.filter((user) => user.id_user !== id_user));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ users, loading, getUser, addUser, updateUserData, removeUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
