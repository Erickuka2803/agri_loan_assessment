import React from 'react';
import { FileText, Printer, History, Users, LogOut } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useTranslation } from '../hooks/useTranslation';

interface Props {
  onStartApplication: () => void;
  onPrintForm: () => void;
  onViewHistory: () => void;
  onManageUsers: () => void;
  isAdmin: boolean;
}

export const ChoiceScreen: React.FC<Props> = ({
  onStartApplication,
  onPrintForm,
  onViewHistory,
  onManageUsers,
  isAdmin,
}) => {
  const { user, logout } = useAuthStore();
  const { t } = useTranslation();
  const isManager = user?.role === 'manager';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col">
      <div className="w-full max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {t('welcomeUser').replace('{name}', user?.fullName || '')} ({t(user?.role || 'user')})
          </h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            {t('logout')}
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="relative w-full max-w-5xl mx-auto h-[280px] rounded-2xl overflow-hidden shadow-2xl mb-6">
            <img
              src="https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=1920&q=80"
              alt="Hands nurturing young plant"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-6">
              <h2 className="text-4xl font-bold text-white px-4 max-w-4xl leading-tight">
                {t('welcome')}
              </h2>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6 max-w-6xl mx-auto">
          {!isAdmin && !isManager && (
            <button
              onClick={onStartApplication}
              className="flex-1 max-w-sm bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 flex flex-col items-center gap-3"
            >
              <FileText className="w-12 h-12 text-blue-600" />
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {t('newApplication')}
                </h3>
                <p className="text-sm text-gray-600">
                  {t('startNew')}
                </p>
              </div>
            </button>
          )}

          <button
            onClick={onPrintForm}
            className="flex-1 max-w-sm bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 flex flex-col items-center gap-3"
          >
            <Printer className="w-12 h-12 text-green-600" />
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {t('printForm')}
              </h3>
              <p className="text-sm text-gray-600">
                {t('downloadBlank')}
              </p>
            </div>
          </button>

          {!isAdmin && (
            <button
              onClick={onViewHistory}
              className="flex-1 max-w-sm bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 flex flex-col items-center gap-3"
            >
              <History className="w-12 h-12 text-purple-600" />
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {isManager ? t('reviewApplications') : t('viewHistory')}
                </h3>
                <p className="text-sm text-gray-600">
                  {isManager ? t('reviewApplications') : t('accessPrevious')}
                </p>
              </div>
            </button>
          )}

          {isAdmin && (
            <button
              onClick={onManageUsers}
              className="flex-1 max-w-sm bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 flex flex-col items-center gap-3"
            >
              <Users className="w-12 h-12 text-indigo-600" />
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {t('manageUsers')}
                </h3>
                <p className="text-sm text-gray-600">
                  {t('adminSystem')}
                </p>
              </div>
            </button>
          )}
        </div>

        <p className="text-center text-gray-600 mt-8">
          © {new Date().getFullYear()} {t('welcome')}. {t('confidential')}
        </p>
      </div>
    </div>
  );
};