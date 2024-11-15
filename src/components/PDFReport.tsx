import React from 'react';
import { format } from 'date-fns';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { FormData, CriteriaScore } from '../types';

interface Props {
  formData: FormData;
  scores: CriteriaScore[];
  totalScore: number;
  institutionDecision?: {
    decision: string;
    suggestedRange: {
      min: number;
      max: number;
    };
    allocatedAmount?: number;
    conditions: string;
    notes?: string;
  };
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    borderBottom: 1,
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#1a365d',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
    color: '#2d3748',
  },
  section: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f7fafc',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2d3748',
    borderBottom: 1,
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: '40%',
    fontSize: 10,
    color: '#4a5568',
  },
  value: {
    flex: 1,
    fontSize: 10,
    color: '#1a202c',
  },
  scoreSection: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ebf8ff',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  scoreLabel: {
    fontSize: 10,
    color: '#2c5282',
  },
  scoreValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2b6cb0',
  },
  decisionSection: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0fff4',
  },
  decisionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#276749',
  },
  decisionStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  signatureSection: {
    marginTop: 40,
    borderTop: 1,
    paddingTop: 20,
  },
  signatureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  signatureBox: {
    width: '45%',
  },
  signatureLine: {
    borderBottom: 1,
    marginTop: 70,
    marginBottom: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    color: '#718096',
  },
});

export const LoanAssessmentPDF: React.FC<Props> = ({
  formData,
  scores,
  totalScore,
  institutionDecision,
}) => {
  const company = formData.company || {
    companyName: '',
    rccm: '',
    idNat: '',
    nImpot: '',
    companyCreationDate: '',
    companyAccountNumber: ''
  };

  return (
    <PDFViewer style={{ width: '100%', height: '600px' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>Agricultural Loan Assessment Report</Text>
            <Text style={styles.subtitle}>Application ID: {formData.applicant.applicationId}</Text>
            <Text style={styles.subtitle}>Date: {format(new Date(), 'PP')}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Applicant Information</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Full Name:</Text>
              <Text style={styles.value}>{formData.applicant.fullName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Account Number:</Text>
              <Text style={styles.value}>{formData.applicant.accountNumber}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>National ID:</Text>
              <Text style={styles.value}>{formData.applicant.nationalId}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Contact:</Text>
              <Text style={styles.value}>{formData.applicant.email} | {formData.applicant.phone}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>{formData.applicant.address}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Company Information</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Company Name:</Text>
              <Text style={styles.value}>{company.companyName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>RCCM Number:</Text>
              <Text style={styles.value}>{company.rccm}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>ID NAT:</Text>
              <Text style={styles.value}>{company.idNat}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>N° Impôt:</Text>
              <Text style={styles.value}>{company.nImpot}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Creation Date:</Text>
              <Text style={styles.value}>{company.companyCreationDate}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Company Account:</Text>
              <Text style={styles.value}>{company.companyAccountNumber}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Assessment Results</Text>
            {scores.map((score, index) => (
              <View key={index} style={styles.scoreRow}>
                <Text style={styles.scoreLabel}>{score.category}:</Text>
                <Text style={styles.scoreValue}>
                  {score.score}/{score.maxScore} ({((score.score / score.maxScore) * 100).toFixed(1)}%)
                </Text>
              </View>
            ))}
            <View style={[styles.scoreRow, { marginTop: 10, borderTop: 1, paddingTop: 5 }]}>
              <Text style={[styles.scoreLabel, { fontWeight: 'bold' }]}>Total Score:</Text>
              <Text style={[styles.scoreValue, { fontSize: 12 }]}>
                {totalScore.toFixed(1)}%
              </Text>
            </View>
          </View>

          {institutionDecision ? (
            <View style={styles.decisionSection}>
              <Text style={styles.decisionTitle}>Institution Decision</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Final Decision:</Text>
                <Text style={[styles.value, { fontWeight: 'bold' }]}>{institutionDecision.decision}</Text>
              </View>
              {institutionDecision.decision !== 'REJECTED' && (
                <>
                  <View style={styles.row}>
                    <Text style={styles.label}>Suggested Range:</Text>
                    <Text style={styles.value}>
                      ${institutionDecision.suggestedRange.min.toLocaleString()} - 
                      ${institutionDecision.suggestedRange.max.toLocaleString()}
                    </Text>
                  </View>
                  {institutionDecision.allocatedAmount && (
                    <View style={styles.row}>
                      <Text style={styles.label}>Allocated Amount:</Text>
                      <Text style={[styles.value, { fontWeight: 'bold' }]}>
                        ${institutionDecision.allocatedAmount.toLocaleString()}
                      </Text>
                    </View>
                  )}
                </>
              )}
              <View style={[styles.row, { marginTop: 10 }]}>
                <Text style={styles.label}>Conditions:</Text>
                <Text style={styles.value}>{institutionDecision.conditions}</Text>
              </View>
              {institutionDecision.notes && (
                <View style={[styles.row, { marginTop: 10 }]}>
                  <Text style={styles.label}>Additional Notes:</Text>
                  <Text style={styles.value}>{institutionDecision.notes}</Text>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.decisionSection}>
              <Text style={styles.decisionTitle}>Pending Institution Decision</Text>
              <Text style={styles.value}>
                Waiting for management approval
              </Text>
            </View>
          )}

          <View style={styles.signatureSection}>
            <View style={styles.signatureRow}>
              <View style={styles.signatureBox}>
                <Text>Loan Officer</Text>
                <View style={styles.signatureLine} />
                <Text style={{ fontSize: 9 }}>Name and Signature</Text>
              </View>
              <View style={styles.signatureBox}>
                <Text>Branch Manager</Text>
                <View style={styles.signatureLine} />
                <Text style={{ fontSize: 9 }}>Name and Signature</Text>
              </View>
            </View>
          </View>

          <Text style={styles.footer}>
            Agricultural Loan Assessment System | Confidential
          </Text>
        </Page>
      </Document>
    </PDFViewer>
  );
};