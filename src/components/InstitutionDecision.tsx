import React, { useState, useEffect } from 'react';
import { updateApplicationDecision } from '../db/database';
import { FormData, CriteriaScore } from '../types';
import { X } from 'lucide-react';

interface Props {
  formData: FormData;
  scores: CriteriaScore[];
  totalScore: number;
  onComplete: (decision: any) => void;
  onCancel?: () => void;
}

export const InstitutionDecision: React.FC<Props> = ({
  formData,
  scores,
  totalScore,
  onComplete,
  onCancel,
}) => {
  const [decision, setDecision] = useState('');
  const [allocatedAmount, setAllocatedAmount] = useState('');
  const [conditions, setConditions] = useState('');
  const [notes, setNotes] = useState('');

  const loanAmount = parseInt(formData.loan.loanAmount);
  const annualRevenue = parseInt(formData.financial.annualRevenue);
  
  // Calculate suggested range based on score and financials
  const suggestedMin = Math.round(loanAmount * Math.max(0.4, totalScore / 100 - 0.2));
  const suggestedMax = Math.round(Math.min(
    loanAmount,
    annualRevenue * 0.8,
    loanAmount * Math.min(1.2, totalScore / 100 + 0.2)
  ));

  // Set default conditions based on scores
  useEffect(() => {
    const defaultConditions = scores.reduce((acc, score) => {
      if (score.score < score.maxScore * 0.7) {
        acc.push(`Improve ${score.category}: ${score.details.join(', ')}`);
      }
      return acc;
    }, [] as string[]);

    setConditions(defaultConditions.join('\n'));
  }, [scores]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const decisionData = {
      decision,
      suggestedRange: {
        min: suggestedMin,
        max: suggestedMax,
      },
      allocatedAmount: parseInt(allocatedAmount),
      conditions,
      notes,
      date: new Date().toISOString(),
    };

    onComplete(decisionData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Institution Decision</h2>
        {onCancel && (
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Decision *
          </label>
          <select
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select decision</option>
            <option value="APPROVED">Approved</option>
            <option value="CONDITIONAL">Conditional Approval</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        {decision && (decision === 'APPROVED' || decision === 'CONDITIONAL') && (
          <>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Suggested Amount Range</h4>
              <p className="text-lg font-semibold text-gray-900">
                ${suggestedMin.toLocaleString()} - ${suggestedMax.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Based on assessment score and financial analysis
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Allocated Amount ($) *
              </label>
              <input
                type="number"
                value={allocatedAmount}
                onChange={(e) => setAllocatedAmount(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                min={suggestedMin}
                max={suggestedMax}
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter the final amount to be allocated within the suggested range
              </p>
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Conditions
          </label>
          <textarea
            value={conditions}
            onChange={(e) => setConditions(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end gap-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit Decision
          </button>
        </div>
      </form>
    </div>
  );
};