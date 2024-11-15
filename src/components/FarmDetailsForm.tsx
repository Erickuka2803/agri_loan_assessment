import React from 'react';
import { Warehouse, Sprout, Clock, Droplets, Users, Award, MapPin } from 'lucide-react';
import { FarmDetails } from '../types';

interface Props {
  data: FarmDetails;
  onChange: (data: FarmDetails) => void;
}

export const FarmDetailsForm: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleMultiSelect = (name: keyof FarmDetails, value: string) => {
    const currentValues = data[name] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    onChange({ ...data, [name]: newValues });
  };

  const handleLocationChange = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onChange({
            ...data,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Farm Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Warehouse className="w-4 h-4" />
              Farm Size (ha) *
            </div>
          </label>
          <input
            type="number"
            name="farmSize"
            value={data.farmSize}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4" />
              Irrigation System *
            </div>
          </label>
          <select
            name="irrigationSystem"
            value={data.irrigationSystem}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select system</option>
            <option value="modern">Modern (Drip/Sprinkler)</option>
            <option value="traditional">Traditional</option>
            <option value="none">None</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Years of Experience *
            </div>
          </label>
          <input
            type="number"
            name="farmingExperience"
            value={data.farmingExperience}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Seasonal Workers *
            </div>
          </label>
          <input
            type="number"
            name="seasonalWorkers"
            value={data.seasonalWorkers}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Farm Address *
            </div>
          </label>
          <textarea
            name="farmAddress"
            value={data.farmAddress}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter detailed farm location/address"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Farm Coordinates (Optional)
            </div>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="latitude"
              value={data.latitude}
              placeholder="Latitude"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="longitude"
              value={data.longitude}
              placeholder="Longitude"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="button"
            onClick={handleLocationChange}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800"
          >
            Get Current Location
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4" />
            Certifications (Optional)
          </div>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            'Organic Certification',
            'GAP Certification',
            'Fair Trade',
            'Rainforest Alliance',
            'USDA Organic',
            'Other'
          ].map((cert) => (
            <label key={cert} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={data.certifications.includes(cert)}
                onChange={() => handleMultiSelect('certifications', cert)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{cert}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};