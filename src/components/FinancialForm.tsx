import React from 'react';
import { DollarSign, CreditCard, Calculator, Building2 } from 'lucide-react';
import { FinancialDetails } from '../types';

interface Props {
  data: FinancialDetails;
  onChange: (data: FinancialDetails) => void;
}

export const FinancialForm: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Financial Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Annual Revenue ($)
            </div>
          </label>
          <input
            type="number"
            name="annualRevenue"
            value={data.annualRevenue}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Existing Loans ($)
            </div>
          </label>
          <input
            type="number"
            name="existingLoans"
            value={data.existingLoans}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Monthly Expenses ($)
            </div>
          </label>
          <input
            type="number"
            name="monthlyExpenses"
            value={data.monthlyExpenses}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Collateral Value ($)
            </div>
          </label>
          <input
            type="number"
            name="collateralValue"
            value={data.collateralValue}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Credit Score
            </div>
          </label>
          <input
            type="number"
            name="creditScore"
            value={data.creditScore}
            onChange={handleChange}
            min="300"
            max="850"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>
    </div>
  );
};