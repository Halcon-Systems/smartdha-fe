import { useEffect, useState } from 'react';
import { authService } from '@/app/services/auth-service';
import { useRouter } from 'next/navigation';

export function useAuth(requireAuth: boolean = true) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = authService.isAuthenticated();
      const currentUser = authService.getCurrentUser();
      
      setIsAuthenticated(authStatus);
      setUser(currentUser);
      setLoading(false);

      // Redirect to login if authentication is required but user is not authenticated
      if (requireAuth && !authStatus) {
        router.push('/login');
      }
    };

    // Check authentication on mount
    checkAuth();

    // Optional: Set up periodic auth check
    const interval = setInterval(checkAuth, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [requireAuth, router]);

  const logout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
  };

  return {
    isAuthenticated,
    user,
    loading,
    logout,
    isSuperAdmin: user?.role === 'SuperAdministrator',
    isAdmin: user?.role?.includes('Administrator') || user?.role?.includes('Admin')
  };
}
