import { authService } from '@/app/services/auth-service';
import React from 'react';

// Authentication middleware for protecting routes
export function withAuth<T extends Record<string, any>>(
  WrappedComponent: React.ComponentType<T>
) {
  return function AuthenticatedComponent(props: T) {
    // Check if user is authenticated on client side
    if (typeof window !== 'undefined') {
      const isAuthenticated = authService.isAuthenticated();
      const user = authService.getCurrentUser();
      
      if (!isAuthenticated || !user) {
        // Redirect to login if not authenticated
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return null;
      }
    }

    return React.createElement(WrappedComponent, props);
  };
}

// Server-side authentication check for page components
export function requireAuth() {
  // This will be used in page components to check authentication
  if (typeof window !== 'undefined') {
    const isAuthenticated = authService.isAuthenticated();
    const user = authService.getCurrentUser();
    
    if (!isAuthenticated || !user) {
      window.location.href = '/login';
      return false;
    }
    return true;
  }
  return false;
}

// Role-based access control
export function hasRole(requiredRole: string): boolean {
  if (typeof window !== 'undefined') {
    const user = authService.getCurrentUser();
    return user?.role === requiredRole;
  }
  return false;
}

// Check if user is Super Administrator
export function isSuperAdmin(): boolean {
  return hasRole('SuperAdministrator');
}

// Check if user is any type of administrator
export function isAdmin(): boolean {
  if (typeof window !== 'undefined') {
    const user = authService.getCurrentUser();
    return user?.role?.includes('Administrator') || user?.role?.includes('Admin');
  }
  return false;
}
