// /src/services/api.js
import axios from 'axios';

const API_URL = 'https://vrvsecurity-backend-e0tg4h845.vercel.app/api';

export const getUsers = () => axios.get(`${API_URL}/users`);
export const createUser = (userData) => axios.post(`${API_URL}/users`, userData);
export const updateUser = (id, userData) => axios.put(`${API_URL}/users/${id}`, userData);
export const deleteUser = (id) => axios.delete(`${API_URL}/users/${id}`);
export const getUserById = (id) => axios.get(`${API_URL}/users/${id}`);

export const searchUsers = (details) => {
    console.log("details: ", details);
    const queryParams = new URLSearchParams();
    if (details.name) queryParams.append('name', details.name);
    if (details.status) queryParams.append('status', details.status);
    if (details.role) queryParams.append('role', details.role);
  
    return axios.get(`${API_URL}/users/search-users?${queryParams.toString()}`);
  };

export const getRoles = () => axios.get(`${API_URL}/roles`);
export const createRole = (roleData) => axios.post(`${API_URL}/roles`, roleData);
export const updateRole = (id, roleData) => axios.put(`${API_URL}/roles/${id}`, roleData);
export const deleteRole = (id) => axios.delete(`${API_URL}/roles/${id}`);
export const getRoleById = (id) => axios.get(`${API_URL}/roles/${id}`);
