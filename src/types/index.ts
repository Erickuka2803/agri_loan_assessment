export interface ApplicantDetails {
  applicationId: string;
  accountNumber: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  age: string;
  nationalId: string;
  dateCreated: string;
  dateRequested: string;
  gender: 'male' | 'female';
}

// Rest of the types remain the same
export interface FormData {
  applicant: ApplicantDetails;
  company: CompanyDetails;
  financial: FinancialDetails;
  farm: FarmDetails;
  loan: LoanDetails;
}