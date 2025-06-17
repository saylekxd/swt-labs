import { useState, useEffect } from 'react';
import { checkAndStoreAdminKey, isAdmin, clearAdminKey, setAdminKey } from '@/services/blogApi';

export interface UseAdminReturn {
  isAdmin: boolean;
  loading: boolean;
  login: (key: string) => void;
  logout: () => void;
  checkAdminAccess: () => boolean;
}

export const useAdmin = (): UseAdminReturn => {
  const [adminState, setAdminState] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin key is in URL or localStorage
    const hasAccess = checkAndStoreAdminKey();
    setAdminState(hasAccess);
    setLoading(false);
  }, []);

  const login = (key: string) => {
    setAdminKey(key);
    setAdminState(true);
  };

  const logout = () => {
    clearAdminKey();
    setAdminState(false);
  };

  const checkAdminAccess = () => {
    const hasAccess = isAdmin();
    setAdminState(hasAccess);
    return hasAccess;
  };

  return {
    isAdmin: adminState,
    loading,
    login,
    logout,
    checkAdminAccess
  };
}; 