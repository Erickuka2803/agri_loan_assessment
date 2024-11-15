import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface Props {
  onAuth: (isAuthenticated: boolean) => void;
}

export const ManagerAuth: React.FC<Props> = ({ onAuth }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this should be a secure authentication process
    // For demo purposes, using a simple password
    if (password === 'manager123') {
      onAuth(true);
      setError('');
    } else {
      setError('Invalid credentials');
      onAuth(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-center mb-6">
        <Lock className="w-12 h-12 text-blue-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Manager Authentication
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Manager Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Authenticate
        </button>
      </form>
    </div>
  );
};