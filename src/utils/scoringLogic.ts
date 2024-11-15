import { FormData, CriteriaScore } from '../types';

export const calculateFinancialScore = (financial: FormData['financial']): CriteriaScore => {
  let score = 0;
  const details: string[] = [];
  const maxScore = 10;

  // Credit score evaluation
  const creditScore = parseInt(financial.creditScore);
  if (creditScore >= 750) { score += 3; details.push('Excellent credit score'); }
  else if (creditScore >= 650) { score += 2; details.push('Good credit score'); }
  else { score += 1; details.push('Fair credit score'); }

  // Debt-to-Income ratio
  const annualRevenue = parseInt(financial.annualRevenue);
  const monthlyExpenses = parseInt(financial.monthlyExpenses) * 12;
  const dti = monthlyExpenses / annualRevenue;
  if (dti <= 0.3) { score += 4; details.push('Healthy debt-to-income ratio'); }
  else if (dti <= 0.4) { score += 2; details.push('Moderate debt-to-income ratio'); }
  else { score += 1; details.push('High debt-to-income ratio'); }

  // Collateral assessment
  const collateralRatio = parseInt(financial.collateralValue) / parseInt(financial.existingLoans || '1');
  if (collateralRatio >= 2) { score += 3; details.push('Strong collateral coverage'); }
  else if (collateralRatio >= 1.5) { score += 2; details.push('Adequate collateral coverage'); }
  else { score += 1; details.push('Limited collateral coverage'); }

  return {
    category: 'Financial Health',
    score,
    maxScore,
    details
  };
};

export const calculateFarmScore = (farm: FormData['farm']): CriteriaScore => {
  let score = 0;
  const details: string[] = [];
  const maxScore = 10;

  // Farm size evaluation
  const farmSize = parseInt(farm.farmSize);
  if (farmSize >= 100) { score += 2; details.push('Large farm size'); }
  else if (farmSize >= 50) { score += 1.5; details.push('Medium farm size'); }
  else { score += 1; details.push('Small farm size'); }

  // Experience
  const experience = parseInt(farm.farmingExperience);
  if (experience >= 10) { score += 3; details.push('Extensive farming experience'); }
  else if (experience >= 5) { score += 2; details.push('Moderate farming experience'); }
  else { score += 1; details.push('Limited farming experience'); }

  // Infrastructure
  if (farm.irrigationSystem === 'modern') { score += 2; details.push('Modern irrigation system'); }
  if (farm.equipmentOwned.length >= 5) { score += 2; details.push('Well-equipped farm'); }
  if (farm.certifications.length >= 2) { score += 1; details.push('Certified farming practices'); }

  return {
    category: 'Farm Assessment',
    score,
    maxScore,
    details
  };
};

export const calculateSustainabilityScore = (
  practices: string[],
  certifications: string[]
): CriteriaScore => {
  let score = 0;
  const details: string[] = [];
  const maxScore = 10;

  // Sustainable practices
  const practiceScore = (practices.length / 6) * 5;
  score += practiceScore;
  if (practiceScore >= 4) details.push('Excellent sustainable practices');
  else if (practiceScore >= 2) details.push('Good sustainable practices');
  else details.push('Limited sustainable practices');

  // Certifications
  const certScore = (certifications.length / 3) * 5;
  score += certScore;
  if (certScore >= 4) details.push('Multiple environmental certifications');
  else if (certScore >= 2) details.push('Some environmental certifications');
  else details.push('Few environmental certifications');

  return {
    category: 'Environmental Sustainability',
    score: Math.min(score, maxScore),
    maxScore,
    details
  };
};

export const calculateLoanFeasibilityScore = (
  loan: FormData['loan'],
  financial: FormData['financial']
): CriteriaScore => {
  let score = 0;
  const details: string[] = [];
  const maxScore = 10;

  // Loan amount to revenue ratio
  const loanAmount = parseInt(loan.loanAmount);
  const annualRevenue = parseInt(financial.annualRevenue);
  const ratio = loanAmount / annualRevenue;

  if (ratio <= 1) { score += 4; details.push('Conservative loan amount'); }
  else if (ratio <= 2) { score += 2; details.push('Moderate loan amount'); }
  else { score += 1; details.push('High loan amount'); }

  // Loan purpose assessment
  if (['equipment', 'infrastructure', 'expansion'].includes(loan.loanPurpose)) {
    score += 3;
    details.push('Growth-oriented loan purpose');
  }

  // Loan term evaluation
  const term = parseInt(loan.loanTerm);
  if (term <= 36) { score += 3; details.push('Short-term loan'); }
  else if (term <= 60) { score += 2; details.push('Medium-term loan'); }
  else { score += 1; details.push('Long-term loan'); }

  return {
    category: 'Loan Feasibility',
    score,
    maxScore,
    details
  };
};