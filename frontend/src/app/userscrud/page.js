"use client"
import React, { useEffect, useState } from 'react';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../../services/userService';
import UserTable from '../../components/UserTable';
import UserForm from '../../components/UserForm';

export default function ListUsers ()  {
  const [users, setUsers] = useState([]);
  const [formView, setFormView] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users`);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json(); 
      //console.log('Fetched users:', data); 
  
      if (Array.isArray(data)) {
        setUsers(data); 
      } else {
        console.error('Expected an array but got:', data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = () => {
    setSelectedUser(null);
    setFormView('create');
  };

  const handleRead = (user) => {
    setSelectedUser(user);
    setFormView('read');
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setFormView('update');
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleSave = async (userData) => {
    try {
      if (formView === 'create') {
        await createUser(userData);
      } else if (formView === 'update' && selectedUser) {
        await updateUser(selectedUser.id, userData);
      }
      setFormView(null);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleCancel = () => {
    setFormView(null);
    setSelectedUser(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Users Crud</h1>
      {!formView && (
        <>
          <button 
            onClick={handleCreate} 
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Create User
          </button>
          <UserTable 
            users={users} 
            onRead={handleRead} 
            onUpdate={handleUpdate} 
            onDelete={handleDelete} 
          />
        </>
      )}
      {formView && (
        <UserForm 
          initialData={selectedUser} 
          onSave={handleSave} 
          onCancel={handleCancel} 
          readOnly={formView === 'read'}
        />
      )}
    </div>
  );
};


