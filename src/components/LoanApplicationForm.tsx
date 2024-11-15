import React, { useState } from 'react';
import { ApplicantForm } from './ApplicantForm';
import { CompanyForm } from './CompanyForm';
import { FarmDetailsForm } from './FarmDetailsForm';
import { FinancialForm } from './FinancialForm';
import { LoanDetailsForm } from './LoanDetailsForm';
import { FormData } from '../types';
import { ChevronLeft, ChevronRight, Save, X } from 'lucide-react';
import { saveApplication } from '../db/database';
import { calculateFinancialScore, calculateFarmScore, calculateSustainabilityScore, calculateLoanFeasibilityScore } from '../utils/scoringLogic';

interface Props {
  onSubmit: () => void;
  onCancel: () => void;
}

const initialFormData: FormData = {
  applicant: {
    applicationId: '',
    accountNumber: '',
    fullName: '',
    email: '',
    phone: '',
    address: '',
    age: '',
    nationalId: '',
    dateCreated: '',
    dateRequested: '',
    gender: 'male'
  },
  company: {
    companyName: '',
    rccm: '',
    idNat: '',
    nImpot: '',
    companyCreationDate: '',
    companyAccountNumber: ''
  },
  financial: {
    annualRevenue: '',
    existingLoans: '',
    monthlyExpenses: '',
    collateralValue: '',
    bankStatements: [],
    creditScore: ''
  },
  farm: {
    farmSize: '',
    cropTypes: [],
    landOwnership: '',
    irrigationSystem: '',
    farmingExperience: '',
    seasonalWorkers: '',
    equipmentOwned: [],
    certifications: [],
    latitude: '',
    longitude: '',
    farmAddress: ''
  },
  loan: {
    loanAmount: '',
    loanPurpose: '',
    loanTerm: '',
    repaymentSource: '',
    sustainabilityPractices: []
  }
};

export const LoanApplicationForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const steps = [
    { title: 'Personal Information', component: ApplicantForm, key: 'applicant' },
    { title: 'Company Information', component: CompanyForm, key: 'company' },
    { title: 'Farm Details', component: FarmDetailsForm, key: 'farm' },
    { title: 'Financial Information', component: FinancialForm, key: 'financial' },
    { title: 'Loan Details', component: LoanDetailsForm, key: 'loan' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate scores
    const financialScore = calculateFinancialScore(formData.financial);
    const farmScore = calculateFarmScore(formData.farm);
    const sustainabilityScore = calculateSustainabilityScore(
      formData.loan.sustainabilityPractices,
      formData.farm.certifications
    );
    const loanScore = calculateLoanFeasibilityScore(formData.loan, formData.financial);

    const scores = [financialScore, farmScore, sustainabilityScore, loanScore];
    const totalScore = scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length * 10;

    try {
      await saveApplication(formData, scores, totalScore);
      onSubmit();
    } catch (error) {
      console.error('Error saving application:', error);
      alert('An error occurred while saving the application. Please try again.');
    }
  };

  const CurrentStepComponent = steps[currentStep].component;
  const currentKey = steps[currentStep].key as keyof FormData;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">{steps[currentStep].title}</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <CurrentStepComponent
          data={formData[currentKey]}
          onChange={(newData) => {
            setFormData({
              ...formData,
              [currentKey]: newData
            });
          }}
        />
      </div>

      <div className="flex justify-between items-center pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-red-600 hover:text-red-700 flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
        
        <div className="flex gap-4">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
          )}
          
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Submit Application
            </button>
          )}
        </div>
      </div>
    </form>
  );
};