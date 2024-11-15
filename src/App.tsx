import React, { useState } from 'react';
import { Login } from './components/Login';
import { ChoiceScreen } from './components/ChoiceScreen';
import { PrintableForm } from './components/PrintableForm';
import { ApplicationHistory } from './components/ApplicationHistory';
import { UserManagement } from './components/UserManagement';
import { LoanApplicationForm } from './components/LoanApplicationForm';
import { useAuthStore } from './stores/authStore';

const App: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(-1);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        {currentStep === -1 && (
          <ChoiceScreen
            onStartApplication={() => setCurrentStep(0)}
            onPrintForm={() => setCurrentStep(-2)}
            onViewHistory={() => setCurrentStep(-3)}
            onManageUsers={() => setCurrentStep(-4)}
            isAdmin={user?.role === 'admin'}
          />
        )}

        {currentStep === -2 && (
          <PrintableForm onHome={() => setCurrentStep(-1)} />
        )}

        {currentStep === -3 && (
          <ApplicationHistory onHome={() => setCurrentStep(-1)} />
        )}

        {currentStep === -4 && user?.role === 'admin' && (
          <UserManagement onHome={() => setCurrentStep(-1)} />
        )}

        {currentStep === 0 && (
          <LoanApplicationForm 
            onSubmit={() => setCurrentStep(-1)}
            onCancel={() => setCurrentStep(-1)}
          />
        )}
      </main>
    </div>
  );
};

export default App;