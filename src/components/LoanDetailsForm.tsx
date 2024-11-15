import React from 'react';
import { DollarSign, Target, Clock, Sprout } from 'lucide-react';
import { LoanDetails } from '../types';

interface Props {
  data: LoanDetails;
  onChange: (data: LoanDetails) => void;
}

export const LoanDetailsForm: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleSustainabilityChange = (practice: string) => {
    const practices = data.sustainabilityPractices.includes(practice)
      ? data.sustainabilityPractices.filter(p => p !== practice)
      : [...data.sustainabilityPractices, practice];
    onChange({ ...data, sustainabilityPractices: practices });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Loan Requirements</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Loan Amount ($)
            </div>
          </label>
          <input
            type="number"
            name="loanAmount"
            value={data.loanAmount}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Loan Purpose
            </div>
          </label>
          <select
            name="loanPurpose"
            value={data.loanPurpose}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select purpose</option>
            <option value="equipment">Equipment Purchase</option>
            <option value="infrastructure">Infrastructure Development</option>
            <option value="expansion">Farm Expansion</option>
            <option value="working_capital">Working Capital</option>
            <option value="refinancing">Refinancing</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Loan Term (months)
            </div>
          </label>
          <select
            name="loanTerm"
            value={data.loanTerm}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select term</option>
            <option value="12">12 months</option>
            <option value="24">24 months</option>
            <option value="36">36 months</option>
            <option value="48">48 months</option>
            <option value="60">60 months</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Repayment Source
            </div>
          </label>
          <select
            name="repaymentSource"
            value={data.repaymentSource}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select source</option>
            <option value="crop_sales">Crop Sales</option>
            <option value="livestock">Livestock Sales</option>
            <option value="mixed_income">Mixed Farm Income</option>
            <option value="other">Other Sources</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Sprout className="w-4 h-4" />
            Sustainable Practices
          </div>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Crop Rotation',
            'Organic Farming',
            'Water Conservation',
            'Soil Management',
            'Integrated Pest Management',
            'Renewable Energy Use',
          ].map((practice) => (
            <label key={practice} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={data.sustainabilityPractices.includes(practice)}
                onChange={() => handleSustainabilityChange(practice)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{practice}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};