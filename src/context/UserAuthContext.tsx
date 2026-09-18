import React, { createContext, useContext, useEffect, useState } from 'react';
import { Order } from '../types.ts';

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user';
}

interface UserAuthContextValue {
  user: CustomerProfile | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, phone: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  getOrders: () => Promise<Order[]>;
}

const UserAuthContext = createContext<UserAuthContextValue | undefined>(undefined);
const TOKEN_KEY = 'arabian_saaj_user_token';
const USER_KEY = 'arabian_saaj_user';

export const UserAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<CustomerProfile | null>(() => {
    const saved = localStorage.getItem(USER_KEY);
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await fetch('/api/auth/user-me', { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) throw new Error('Session expired');
        const data = await res.json();
        setUser(data.user);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    verify();
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/user-login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok || !data.success) return { success: false, error: data.error || 'Login failed' };
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      return { success: true };
    } catch {
      return { success: false, error: 'Network error or server unreachable' };
    }
  };

  const signup = async (name: string, phone: string, email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, phone, email, password })
      });
      const data = await res.json();
      if (!res.ok || !data.success) return { success: false, error: data.error || 'Signup failed' };
      return { success: true };
    } catch {
      return { success: false, error: 'Network error or server unreachable' };
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  };

  const getOrders = async () => {
    if (!token) return [];
    const res = await fetch('/api/my-orders', { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error('Failed to load your orders');
    const data = await res.json();
    return data.orders || [];
  };

  return <UserAuthContext.Provider value={{ user, token, isLoading, login, signup, logout, getOrders }}>{children}</UserAuthContext.Provider>;
};

export function useUserAuth() {
  const context = useContext(UserAuthContext);
  if (!context) throw new Error('useUserAuth must be used within UserAuthProvider');
  return context;
}
