'use client';

import { useState, useEffect } from 'react';
import { authServices } from '@/shared/lib/services/auth.services';
import { UserPublic } from '@/entities/user';
import { userServices } from '@/shared/lib/services/user.services';

interface UseAuthReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserPublic | null;
  checkAuth: () => void;
}

export function useAuth(): UseAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserPublic | null>(null);

  const checkAuth = () => {
    const authenticated = authServices.isAuthenticated();
    const userData = userServices.getUser();
    
    setIsAuthenticated(authenticated);
    setUser(userData);
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    isAuthenticated,
    isLoading,
    user,
    checkAuth,
  };
}
