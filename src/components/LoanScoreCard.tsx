import React from 'react';
import { Calculator, ChevronDown, ChevronUp } from 'lucide-react';
import { CriteriaScore } from '../types';

interface Props {
  scores: CriteriaScore[];
}

export const LoanScoreCard: React.FC<Props> = ({ scores }) => {
  const [expandedCategories, setExpandedCategories] = React.useState<string[]>([]);

  const totalScore = scores.reduce((acc, curr) => acc + curr.score, 0);
  const maxPossibleScore = scores.reduce((acc, curr) => acc + curr.maxScore, 0);
  const finalScore = (totalScore / maxPossibleScore) * 100;

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRecommendation = (finalScore: number) => {
    if (finalScore >= 80) {
      return {
        status: 'Recommended for Approval',
        color: 'text-green-600',
        message: 'Strong application with high probability of success.'
      };
    } else if (finalScore >= 60) {
      return {
        status: 'Conditional Approval',
        color: 'text-yellow-600',
        message: 'Application shows promise but may need additional documentation or guarantees.'
      };
    }
    return {
      status: 'Needs Review',
      color: 'text-red-600',
      message: 'Application requires significant improvement or additional support.'
    };
  };

  const recommendation = getRecommendation(finalScore);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Loan Assessment Results</h2>
        <div className="flex items-center gap-2">
          <Calculator className="w-6 h-6 text-blue-600" />
          <span className="text-2xl font-bold text-blue-600">{finalScore.toFixed(1)}%</span>
        </div>
      </div>

      <div className="mb-6 p-4 rounded-lg bg-gray-50">
        <h3 className={`text-lg font-semibold ${recommendation.color} mb-2`}>
          {recommendation.status}
        </h3>
        <p className="text-gray-600">{recommendation.message}</p>
      </div>
      
      <div className="space-y-4">
        {scores.map((item, index) => (
          <div key={index} className="border border-gray-100 rounded-lg p-4">
            <button
              onClick={() => toggleCategory(item.category)}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-medium">{item.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`font-semibold ${getScoreColor(item.score, item.maxScore)}`}>
                  {item.score}/{item.maxScore}
                </div>
                {expandedCategories.includes(item.category) ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </button>
            
            {expandedCategories.includes(item.category) && (
              <div className="mt-4 pl-4 border-l-2 border-gray-200">
                {item.details.map((detail, idx) => (
                  <p key={idx} className="text-sm text-gray-600 mb-2">• {detail}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};