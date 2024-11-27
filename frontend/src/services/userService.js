import api from './api';

export const getAllUsers = async () => {
  try {
    const response = await api.get('/user/list');
    return response.data.data;
  } catch (error) {
    throw new Error('Erro ao obter usuários.');
  }
};

export const getUserById = async (id_user) => {
  try {
    const response = await api.get(`/user/view/${id_user}`);
    return response.data.data[0];
  } catch (error) {
    throw new Error('Erro ao obter usuário.');
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post('/user/create', userData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar usuário.');
  }
};

export const updateUser = async (id_user, userData) => {
  try {
    const response = await api.put(`/user/update/${id_user}`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao atualizar usuário.');
  }
};

export const deleteUser = async (id_user) => {
  try {
    await api.delete(`/user/delete/${id_user}`);
  } catch (error) {
    throw new Error('Erro ao deletar usuário.');
  }
};
