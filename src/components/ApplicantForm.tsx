import React from 'react';
import { UserCircle, Mail, Phone, MapPin, Calendar, CreditCard, Hash, Building2, Users } from 'lucide-react';
import { ApplicantDetails } from '../types';
import { format } from 'date-fns';

interface Props {
  data: ApplicantDetails;
  onChange: (data: ApplicantDetails) => void;
}

export const ApplicantForm: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  // Generate application ID if not exists
  React.useEffect(() => {
    if (!data.applicationId) {
      const timestamp = Date.now();
      const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      const newApplicationId = `APP${timestamp}${randomNum}`;
      const today = new Date();
      
      onChange({
        ...data,
        applicationId: newApplicationId,
        dateCreated: format(today, 'yyyy-MM-dd'),
        dateRequested: format(today, 'yyyy-MM-dd')
      });
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Application ID</label>
            <p className="mt-1 text-lg font-mono">{data.applicationId || 'Generating...'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date Requested</label>
            <p className="mt-1">{data.dateRequested || format(new Date(), 'PP')}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <UserCircle className="w-4 h-4" />
              Full Name *
            </div>
          </label>
          <input
            type="text"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Gender *
            </div>
          </label>
          <select
            name="gender"
            value={data.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Account Number *
            </div>
          </label>
          <input
            type="text"
            name="accountNumber"
            value={data.accountNumber}
            onChange={handleChange}
            placeholder="e.g., AC1234567890"
            pattern="^AC\d{10}$"
            title="Account number should start with AC followed by 10 digits"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4" />
              National ID *
            </div>
          </label>
          <input
            type="text"
            name="nationalId"
            value={data.nationalId}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address *
            </div>
          </label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone Number *
            </div>
          </label>
          <input
            type="tel"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Address *
            </div>
          </label>
          <input
            type="text"
            name="address"
            value={data.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Age *
            </div>
          </label>
          <input
            type="number"
            name="age"
            value={data.age}
            onChange={handleChange}
            min="18"
            max="100"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>
    </div>
  );
};