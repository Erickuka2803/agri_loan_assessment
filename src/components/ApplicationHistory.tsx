import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Home, Trash2, Eye, Printer } from 'lucide-react';
import { getApplicationHistory, getApplicationDetails, deleteApplication, updateApplicationDecision } from '../db/database';
import { LoanAssessmentPDF } from './PDFReport';
import { InstitutionDecision } from './InstitutionDecision';
import { useAuthStore } from '../stores/authStore';

export const ApplicationHistory: React.FC<{ onHome?: () => void }> = ({ onHome }) => {
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [showPDF, setShowPDF] = useState(false);
  const [showDecision, setShowDecision] = useState(false);
  const { user } = useAuthStore();
  const isManager = user?.role === 'manager';
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const history = await getApplicationHistory();
      setApplications(history);
    } catch (error) {
      console.error('Error getting application history:', error);
    }
  };

  const handleViewDetails = async (id: number) => {
    const details = await getApplicationDetails(id);
    if (details) {
      const applicationData = JSON.parse(details.application_data);
      setSelectedApp({
        ...applicationData,
        id: details.id,
        totalScore: details.total_score,
        institutionDecision: details.institution_decision
      });
      setShowPDF(true);
      setShowDecision(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      await deleteApplication(id);
      loadApplications();
      if (selectedApp?.id === id) {
        setSelectedApp(null);
        setShowPDF(false);
        setShowDecision(false);
      }
    }
  };

  const handleDecisionSubmit = async (decision: any) => {
    if (selectedApp) {
      await updateApplicationDecision(selectedApp.id, decision);
      await loadApplications();
      const updatedDetails = await getApplicationDetails(selectedApp.id);
      if (updatedDetails) {
        const applicationData = JSON.parse(updatedDetails.application_data);
        setSelectedApp({
          ...applicationData,
          id: updatedDetails.id,
          totalScore: updatedDetails.total_score,
          institutionDecision: updatedDetails.institution_decision
        });
      }
      setShowDecision(false);
      setShowPDF(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {isManager ? 'Review Applications' : 'Application History'}
        </h2>
        <button
          onClick={onHome}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          Home
        </button>
      </div>

      {showDecision && selectedApp ? (
        <InstitutionDecision
          formData={selectedApp.formData}
          scores={selectedApp.scores}
          totalScore={selectedApp.totalScore}
          onComplete={handleDecisionSubmit}
          onCancel={() => setShowDecision(false)}
        />
      ) : showPDF && selectedApp ? (
        <div className="space-y-4">
          <div className="flex justify-end gap-4">
            {isManager && !selectedApp.institutionDecision && (
              <button
                onClick={() => setShowDecision(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Make Decision
              </button>
            )}
            <button
              onClick={() => setShowPDF(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Back to List
            </button>
          </div>
          <LoanAssessmentPDF
            formData={selectedApp.formData}
            scores={selectedApp.scores}
            totalScore={selectedApp.totalScore}
            institutionDecision={selectedApp.institutionDecision}
          />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loan Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(app.application_date), 'PP')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {app.full_name}
                      </div>
                      <div className="text-sm text-gray-500">{app.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${parseInt(app.loan_amount).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {app.total_score.toFixed(1)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${app.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                          app.status === 'CONDITIONAL' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDetails(app.id)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {(isManager || isAdmin) && (
                          <button
                            onClick={() => handleDelete(app.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete Application"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};