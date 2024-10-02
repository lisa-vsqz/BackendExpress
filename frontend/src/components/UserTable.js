import React from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const UserTable = ({ users = [], onRead, onUpdate, onDelete }) => {
  return (
    <table className="min-w-full bg-white border">
      <thead>
        <tr>
          <th className="py-2 px-4 border">First Name</th>
          <th className="py-2 px-4 border">Last Name</th>
          <th className="py-2 px-4 border">Email</th>
          <th className="py-2 px-4 border">Phone</th>
          <th className="py-2 px-4 border">Role</th>
          <th className="py-2 px-4 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id} className="text-center">
            <td className="py-2 px-4 border">{user.firstName}</td>
            <td className="py-2 px-4 border">{user.lastName}</td>
            <td className="py-2 px-4 border">{user.email}</td>
            <td className="py-2 px-4 border">{user.phoneNumber}</td>
            <td className="py-2 px-4 border">{user.role}</td>
            <td className="py-2 px-4 border flex justify-center space-x-2">
              <button onClick={() => onRead(user)} className="text-blue-500 hover:text-blue-700">
                <FaEye />
              </button>
              <button onClick={() => onUpdate(user)} className="text-green-500 hover:text-green-700">
                <FaEdit />
              </button>
              <button onClick={() => onDelete(user.id)} className="text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
