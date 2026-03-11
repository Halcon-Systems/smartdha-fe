// Fetch user profile detail
export async function fetchUserProfileDetail() {
  let headers: Record<string, string> = { "Content-Type": "application/json" };
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken") || localStorage.getItem("accessToken") || "";
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }
  const response = await fetch(
    "https://dfpwebp.dhakarachi.org/api/smartdha/user/GetProfileDetail",
    {
      method: "GET",
      headers,
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user profile detail");
  }
  return response.json();
}
// Fetch non-member verification list for Visitor tab with pagination (no total count from backend)
export async function fetchNonMemberVerificationList({
  memberType = "Visitor",
  pageNumber = 1,
  pageSize = 10,
}: {
  memberType?: string;
  pageNumber?: number;
  pageSize?: number;
}) {
  let headers: Record<string, string> = { "Content-Type": "application/json" };
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken") || localStorage.getItem("accessToken") || "";
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }
  const response = await fetch(
    "https://dfpwebp.dhakarachi.org/api/smartdha/nonmemberregistration/get-nonmember-verification-list",
    {
      method: "POST",
      headers,
      body: JSON.stringify({ memberType, pageNumber, pageSize }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch non-member verification list");
  }
  const data = await response.json();
  // Always return the .data array from the API response
  return Array.isArray(data?.data) ? data.data : [];
}
// Utility to POST form-data (with files) to register-nonmember API (external endpoint)
export async function registerNonMember(formData: FormData) {
  const response = await fetch("https://dfpwebp.dhakarachi.org/api/smartdha/nonmemberregistration/register-nonmember", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to register non-member");
  }
  return response.json();
}
// Fetch dashboard counts from external API
// Fetch property list from external API
export async function fetchPropertyList({ isActive, pageNumber, pageSize }: { isActive: boolean; pageNumber: number; pageSize: number }) {
  // Default pageSize to 10 if not provided or zero
  const effectivePageSize = pageSize && pageSize > 0 ? pageSize : 10;
  // Add token if available
  let headers: Record<string, string> = { "Content-Type": "application/json" };
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken") || localStorage.getItem("accessToken") || "";
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }
  const body = JSON.stringify({ isActive, pageNumber, pageSize: effectivePageSize });
  const response = await fetch("https://dfpwebp.dhakarachi.org/api/smartdha/residenceproperty/get-all-properties", {
    method: "POST",
    headers,
    body,
  });
  if (!response.ok) {
    let errorText = await response.text();
    let errorJson: any = null;
    let errorMessage = `Failed to fetch property list: ${response.status} ${response.statusText}`;
    try {
      errorJson = JSON.parse(errorText);
      if (errorJson && typeof errorJson === 'object' && errorJson.message) {
        errorMessage = errorJson.message;
      }
    } catch {
      if (errorText) {
        errorMessage = errorText;
      }
    }
    // Log details for debugging
    console.error("Property list API error:", {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      sentBody: body,
      headers,
      error: errorJson || errorText,
    });
    throw new Error(errorMessage);
  }
  return response.json();
}
export async function fetchDashboardCount() {
  const response = await fetch("https://dfpwebp.dhakarachi.org/api/smartdha/dashboard/dashboard-count", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch dashboard count");
  }
  return response.json();
}
import { API_CONFIG } from './api-config';

// Generic API Client for Backend
class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_CONFIG.baseURL;
    this.timeout = API_CONFIG.timeout;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        // Don't set Content-Type for FormData - let browser set it with boundary
        ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        ...options.headers,
      },
    };

    // Add auth token if available
    const token = this.getAuthToken();
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      // Handle empty responses
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return {} as T;
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  private setAuthToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  private removeAuthToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  // HTTP Methods
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    let url = endpoint;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      url += `?${searchParams.toString()}`;
    }
    
    return this.request<T>(url, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data instanceof FormData ? data : (data ? JSON.stringify(data) : undefined),
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data instanceof FormData ? data : (data ? JSON.stringify(data) : undefined),
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Authentication helpers
  setAuth(token: string): void {
    this.setAuthToken(token);
  }

  clearAuth(): void {
    this.removeAuthToken();
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export types
export type ApiResponse<T = any> = {
  data: T;
  message?: string;
  success: boolean;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};