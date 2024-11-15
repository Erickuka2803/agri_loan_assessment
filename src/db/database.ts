import { openDB } from 'idb';
import { FormData, CriteriaScore } from '../types';

const dbName = 'agriloan-db';
const storeName = 'applications';

const initDB = async () => {
  const db = await openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        const store = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        store.createIndex('status', 'status');
        store.createIndex('application_date', 'application_date');
      }
    },
  });
  return db;
};

export const saveApplication = async (
  formData: FormData,
  scores: CriteriaScore[],
  totalScore: number
) => {
  const db = await initDB();
  const status = totalScore >= 80 ? 'APPROVED' : totalScore >= 60 ? 'CONDITIONAL' : 'PENDING';

  await db.add(storeName, {
    full_name: formData.applicant.fullName,
    email: formData.applicant.email,
    phone: formData.applicant.phone,
    application_date: new Date().toISOString(),
    total_score: totalScore,
    loan_amount: formData.loan.loanAmount,
    status: status,
    application_data: JSON.stringify({ formData, scores }),
  });
};

export const getApplicationHistory = async () => {
  const db = await initDB();
  return await db.getAll(storeName);
};

export const getApplicationDetails = async (id: number) => {
  const db = await initDB();
  return await db.get(storeName, id);
};

export const updateApplicationDecision = async (id: number, decision: any) => {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  
  const application = await store.get(id);
  if (!application) {
    throw new Error('Application not found');
  }

  application.institution_decision = decision;
  application.status = decision.decision;
  await store.put(application);
};

export const deleteApplication = async (id: number) => {
  const db = await initDB();
  await db.delete(storeName, id);
};