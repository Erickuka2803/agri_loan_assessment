import { create } from 'zustand';
import { openDB } from 'idb';

interface User {
  id: number;
  username: string;
  fullName: string;
  role: 'user' | 'manager' | 'admin';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, fullName: string, role: 'user' | 'manager' | 'admin') => Promise<void>;
  logout: () => void;
  getUsers: () => Promise<User[]>;
  deleteUser: (id: number) => Promise<void>;
  updateUser: (id: number, data: Partial<User>) => Promise<void>;
}

const dbName = 'agriloan-auth-db';
const userStore = 'users';

const initDB = async () => {
  const db = await openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(userStore)) {
        const store = db.createObjectStore(userStore, { keyPath: 'id', autoIncrement: true });
        store.createIndex('username', 'username', { unique: true });
        
        // Create default admin user
        store.add({
          username: 'admin',
          password: 'admin123', // In production, use proper password hashing
          fullName: 'System Administrator',
          role: 'admin'
        });
      }
    },
  });
  return db;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,

  login: async (username: string, password: string) => {
    const db = await initDB();
    const tx = db.transaction(userStore, 'readonly');
    const store = tx.objectStore(userStore);
    const users = await store.getAll();
    
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    set({ user: userWithoutPassword, isAuthenticated: true });
  },

  register: async (username: string, password: string, fullName: string, role: 'user' | 'manager' | 'admin') => {
    const db = await initDB();
    const tx = db.transaction(userStore, 'readwrite');
    const store = tx.objectStore(userStore);

    // Check if username already exists
    const existingUser = await store.index('username').get(username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    await store.add({
      username,
      password, // In production, hash the password
      fullName,
      role
    });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  getUsers: async () => {
    const db = await initDB();
    const users = await db.getAll(userStore);
    return users.map(({ password: _, ...user }) => user);
  },

  deleteUser: async (id: number) => {
    const db = await initDB();
    await db.delete(userStore, id);
  },

  updateUser: async (id: number, data: Partial<User>) => {
    const db = await initDB();
    const tx = db.transaction(userStore, 'readwrite');
    const store = tx.objectStore(userStore);
    
    const user = await store.get(id);
    if (!user) {
      throw new Error('User not found');
    }

    await store.put({ ...user, ...data });
  },
}));