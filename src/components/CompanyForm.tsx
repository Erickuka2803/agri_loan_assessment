import React from 'react';
import { Building2, FileText, Hash, Calendar, CreditCard } from 'lucide-react';
import { CompanyDetails } from '../types';
import { format } from 'date-fns';

interface Props {
  data: CompanyDetails;
  onChange: (data: CompanyDetails) => void;
}

export const CompanyForm: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Company Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Company Name *
            </div>
          </label>
          <input
            type="text"
            name="companyName"
            value={data.companyName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              RCCM Number *
            </div>
          </label>
          <input
            type="text"
            name="rccm"
            value={data.rccm}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4" />
              ID NAT *
            </div>
          </label>
          <input
            type="text"
            name="idNat"
            value={data.idNat}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4" />
              N° Impôt *
            </div>
          </label>
          <input
            type="text"
            name="nImpot"
            value={data.nImpot}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Creation Date *
            </div>
          </label>
          <input
            type="date"
            name="companyCreationDate"
            value={data.companyCreationDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Account Number *
            </div>
          </label>
          <input
            type="text"
            name="companyAccountNumber"
            value={data.companyAccountNumber}
            onChange={handleChange}
            placeholder="e.g., AC1234567890"
            pattern="^AC\d{10}$"
            title="Account number should start with AC followed by 10 digits"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>
    </div>
  );
};