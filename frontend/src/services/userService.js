import { getSession } from 'next-auth/react';

const API_URL="http://localhost:5000/api";

const getAuthToken = async () => {
  const session = await getSession();
  return session?.accessToken;
};

export const getUsers = async () => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/users`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};


export async function getUser (id) {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/users/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}

export async function createUser (user) {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create user');
  }
  return response.json();
}

export async function updateUser (id, user) {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update user');
  }
  return response.json();
}


export async function deleteUser (id) { 
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete user');
  }
  if (response.status === 204) {
    return;
  }
  return response.json();
}