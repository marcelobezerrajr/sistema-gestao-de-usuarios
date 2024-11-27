import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../services/userService';
import { LoginContext } from './LoginContext';

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
        console.error('Erro ao carregar Usuários:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  const getUser = async (id_user) => {
    try {
      const user = await getUserById(id_user);
      if (!user) throw new Error(`Usuário com ID ${id_user} não encontrado.`);
      return user;
    } catch (error) {
      console.error(`Erro ao carregar usuário com ID ${id_user}:`, error);
      throw error;
    }
  };

  const addUser = async (newUser) => {
    try {
      const addedUser = await createUser(newUser);
      setUsers([...users, addedUser]);
      return { success: true, message: 'Usuário adicionado com sucesso!' };
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error)
      return { success: false, message: 'Erro ao adicionar o usuário. Verifique os dados e tente novamente.' };
    }
  };

  const updateUserData = async (id_user, updatedUser) => {
    try {
      const updated = await updateUser(id_user, updatedUser);
      setUsers(users.map(user => user.id_user === id_user ? updated : user));
      return { success: true, message: 'Usuário atualizado com sucesso!' };
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error)
      return { success: false, message: 'Erro ao atualizar o usuário. Verifique os dados e tente novamente.' };
    }
  };

  const removeUser = async (id_user) => {
    try {
      await deleteUser(id_user);
      setUsers(users.filter(user => user.id_user !== id_user));
    } catch (error) {
      console.error("Erro ao deletar usuário:", error)
    }
  };

  return (
    <UserContext.Provider value={{ users, loading, getUser, addUser, updateUserData, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};
