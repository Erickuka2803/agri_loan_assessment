import React, { useState } from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { LanguageSwitch } from './LanguageSwitch';
import { useTranslation } from '../hooks/useTranslation';

export const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const { login, register } = useAuthStore();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(formData.username, formData.password);
      } else {
        await register(formData.username, formData.password, formData.fullName, formData.role as 'user' | 'manager' | 'admin');
        setIsLogin(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-6">
      <div className="max-w-5xl w-full mx-auto px-4">
        <div className="text-center mb-6">
          <div className="relative w-full h-[300px] rounded-2xl overflow-hidden shadow-2xl mb-4">
            <img
              src="https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=1920&q=80"
              alt="Hands nurturing young plant"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-6">
              <h1 className="text-4xl font-bold text-white px-4 max-w-3xl leading-tight">
                {t('welcome')}
              </h1>
            </div>
          </div>
          <p className="text-xl text-gray-600 mb-4">
            {t('empowering')}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 text-center rounded-md transition-colors ${
                  isLogin
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t('login')}
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 text-center rounded-md transition-colors ${
                  !isLogin
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t('register')}
              </button>
            </div>
            <LanguageSwitch />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('fullName')}
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('username')}
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('password')}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('role')}
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="user">{t('user')}</option>
                  <option value="manager">{t('manager')}</option>
                </select>
              </div>
            )}

            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              {isLogin ? (
                <>
                  <LogIn className="w-4 h-4" />
                  {t('login')}
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  {t('register')}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};