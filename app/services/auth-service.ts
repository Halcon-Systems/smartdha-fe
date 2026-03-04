import { apiClient } from '@/app/lib/api-client';
import { API_CONFIG, API_ENDPOINTS } from '@/app/lib/api-config';
import { LoginRequest, LoginResponse, ApiResponse } from '@/app/types/api';

class AuthService {
  async login(cnic: string, password: string): Promise<any> {
    try {
      // Generate device ID and FCM token (simplified for now)
      const deviceId = this.generateDeviceId();
      const fcmToken = 'web-device-token'; // In production, get from FCM service

      const loginData = {
        cnic: cnic.replace(/-/g, ''), // Remove hyphens from CNIC
        password
      };

      const response = await fetch(`${API_CONFIG.baseURL}${API_ENDPOINTS.AUTH.LOGIN}`, {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (response.ok && data.accessToken) {
        // Store authentication token
        apiClient.setAuth(data.accessToken);
        
        // Store user data in localStorage for easy access
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify({
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role
          }));
          localStorage.setItem('accessToken', data.accessToken);
        }
        
        return data;
      } else {
        throw new Error(data.responseMessage || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    // No logout API in this project currently.
    // Client-side logout is sufficient: clear tokens + user data.
    this.clearAuthData();
  }

  isAuthenticated(): boolean {
    return apiClient.isAuthenticated();
  }

  getCurrentUser(): any {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }

  clearAuthData(): void {
    apiClient.clearAuth();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
    }
  }

  private generateDeviceId(): string {
    // Generate a simple device ID based on browser fingerprint
    if (typeof window !== 'undefined') {
      const nav = window.navigator;
      const screen = window.screen;
      const fingerprint = [
        nav.userAgent,
        nav.language,
        screen.colorDepth,
        screen.width + 'x' + screen.height,
        new Date().getTimezoneOffset()
      ].join('|');
      
      return btoa(fingerprint).replace(/[^a-zA-Z0-9]/g, '').substring(0, 32);
    }
    return 'web-device-' + Math.random().toString(36).substr(2, 9);
  }

  // CNIC validation helper
  validateCNIC(cnic: string): boolean {
    // Remove hyphens and check if it's 13 digits
    const cleanCNIC = cnic.replace(/-/g, '');
    return /^\d{13}$/.test(cleanCNIC);
  }

  // Format CNIC with hyphens
  formatCNIC(cnic: string): string {
    const clean = cnic.replace(/\D/g, '');
    if (clean.length <= 5) return clean;
    if (clean.length <= 12) return `${clean.slice(0, 5)}-${clean.slice(5)}`;
    return `${clean.slice(0, 5)}-${clean.slice(5, 12)}-${clean.slice(12, 13)}`;
  }
}

export const authService = new AuthService();
