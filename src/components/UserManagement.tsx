import React, { useEffect, useState } from 'react';
import { Edit2, Trash2, Save, X, Home } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

interface User {
  id: number;
  username: string;
  fullName: string;
  role: 'user' | 'manager' | 'admin';
}

export const UserManagement: React.FC<{ onHome?: () => void }> = ({ onHome }) => {
  const { getUsers, deleteUser, updateUser } = useAuthStore();
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<User>>({});

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const userList = await getUsers();
    setUsers(userList);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user.id);
    setEditForm(user);
  };

  const handleSave = async () => {
    if (editingUser && editForm) {
      await updateUser(editingUser, editForm);
      setEditingUser(null);
      loadUsers();
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
      loadUsers();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <button
          onClick={onHome}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          Home
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingUser === user.id ? (
                      <input
                        type="text"
                        value={editForm.fullName || ''}
                        onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md"
                      />
                    ) : (
                      <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.username}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingUser === user.id ? (
                      <select
                        value={editForm.role || user.role}
                        onChange={(e) => setEditForm({ ...editForm, role: e.target.value as 'user' | 'manager' | 'admin' })}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md"
                      >
                        <option value="user">User</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                          user.role === 'manager' ? 'bg-green-100 text-green-800' :
                            'bg-blue-100 text-blue-800'}`}>
                        {user.role}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      {editingUser === user.id ? (
                        <>
                          <button
                            onClick={handleSave}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingUser(null)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(user)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};