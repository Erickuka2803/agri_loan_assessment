import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { Home } from 'lucide-react';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  field: {
    marginBottom: 15,
  },
  label: {
    fontSize: 10,
    marginBottom: 8,
  },
  line: {
    borderBottom: 1,
    marginTop: 20,
  },
  signatureSection: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureBox: {
    width: '45%',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    color: '#666',
  },
});

interface Props {
  onHome?: () => void;
}

export const PrintableForm: React.FC<Props> = ({ onHome }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Empty Application Form</h2>
        <button
          onClick={onHome}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          Home
        </button>
      </div>

      <PDFViewer style={{ width: '100%', height: '600px' }}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.header}>
              <Text style={styles.title}>Agricultural Loan Application Form</Text>
              <Text>Application ID: _______________</Text>
              <Text>Date: _______________</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.subtitle}>1. Personal Information</Text>
              <View style={styles.field}>
                <Text style={styles.label}>Full Name: _____________________________________________</Text>
                <Text style={styles.label}>Gender: ☐ Male  ☐ Female</Text>
                <Text style={styles.label}>National ID: _________________________________________</Text>
                <Text style={styles.label}>Account Number: ____________________________________</Text>
                <Text style={styles.label}>Email: ______________________________________________</Text>
                <Text style={styles.label}>Phone: ______________________________________________</Text>
                <Text style={styles.label}>Address: ____________________________________________</Text>
                <Text style={styles.label}>Age: ________________________________________________</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.subtitle}>2. Company Information</Text>
              <View style={styles.field}>
                <Text style={styles.label}>Company Name: _______________________________________</Text>
                <Text style={styles.label}>RCCM Number: _______________________________________</Text>
                <Text style={styles.label}>ID NAT: _____________________________________________</Text>
                <Text style={styles.label}>N° Impôt: ___________________________________________</Text>
                <Text style={styles.label}>Creation Date: _______________________________________</Text>
                <Text style={styles.label}>Company Account Number: ____________________________</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.subtitle}>3. Farm Details</Text>
              <View style={styles.field}>
                <Text style={styles.label}>Farm Size (ha): ______________________________________</Text>
                <Text style={styles.label}>Farm Address: _______________________________________</Text>
                <Text style={styles.label}>Irrigation System: ☐ Modern  ☐ Traditional  ☐ None</Text>
                <Text style={styles.label}>Years of Experience: _________________________________</Text>
                <Text style={styles.label}>Seasonal Workers: ___________________________________</Text>
                <Text style={styles.label}>Farm Coordinates (Optional):</Text>
                <Text style={styles.label}>  Latitude: _________________________________________</Text>
                <Text style={styles.label}>  Longitude: ________________________________________</Text>
                <Text style={styles.label}>Certifications (Optional): _____________________________</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.subtitle}>4. Financial Information</Text>
              <View style={styles.field}>
                <Text style={styles.label}>Annual Revenue ($): __________________________________</Text>
                <Text style={styles.label}>Existing Loans ($): __________________________________</Text>
                <Text style={styles.label}>Monthly Expenses ($): _______________________________</Text>
                <Text style={styles.label}>Collateral Value ($): _________________________________</Text>
                <Text style={styles.label}>Credit Score: _______________________________________</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.subtitle}>5. Loan Details</Text>
              <View style={styles.field}>
                <Text style={styles.label}>Loan Amount ($): ___________________________________</Text>
                <Text style={styles.label}>Loan Purpose: ______________________________________</Text>
                <Text style={styles.label}>Loan Term (months): _________________________________</Text>
                <Text style={styles.label}>Repayment Source: __________________________________</Text>
                <Text style={styles.label}>Sustainability Practices: ______________________________</Text>
              </View>
            </View>

            <View style={styles.signatureSection}>
              <View style={styles.signatureBox}>
                <Text>Applicant Signature:</Text>
                <View style={styles.line} />
                <Text style={{ fontSize: 9 }}>Date: ________________</Text>
              </View>
              <View style={styles.signatureBox}>
                <Text>For Official Use Only:</Text>
                <View style={styles.line} />
                <Text style={{ fontSize: 9 }}>Officer Name & Signature</Text>
              </View>
            </View>

            <Text style={styles.footer}>
              Agricultural Loan Assessment System | Confidential
            </Text>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};