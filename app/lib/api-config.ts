// API Configuration for Backend Integration
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://gwp.dhakarachi.org',
  swaggerUrl: process.env.NEXT_PUBLIC_SWAGGER_URL || 'https://gwp.dhakarachi.org/swagger',
  timeout: 10000,
};

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
  },
  // Residents
  RESIDENTS: {
    LIST: '/api/residents',
    CREATE: '/api/residents',
    UPDATE: (id: string) => `/api/residents/${id}`,
    DELETE: (id: string) => `/api/residents/${id}`,
  },
  // Properties
  PROPERTIES: {
    LIST: '/api/properties',
    CREATE: '/api/properties',
    UPDATE: (id: string) => `/api/properties/${id}`,
    DELETE: (id: string) => `/api/properties/${id}`,
  },
  // Vehicles
  VEHICLES: {
    LIST: '/api/vehicles',
    CREATE: '/api/vehicles',
    UPDATE: (id: string) => `/api/vehicles/${id}`,
    DELETE: (id: string) => `/api/vehicles/${id}`,
  },
  // Visitors
  VISITORS: {
    LIST: '/api/visitors',
    CREATE: '/api/visitors',
    QUICK_ADD: '/api/visitors/quick',
    UPDATE: (id: string) => `/api/visitors/${id}`,
    DELETE: (id: string) => `/api/visitors/${id}`,
  },
  // Workers
  WORKERS: {
    LIST: '/api/workers',
    CREATE: '/api/workers',
    UPDATE: (id: string) => `/api/workers/${id}`,
    DELETE: (id: string) => `/api/workers/${id}`,
  },
  // Luggage
  LUGGAGE: {
    LIST: '/api/luggage',
    CREATE: '/api/luggage',
    UPDATE: (id: string) => `/api/luggage/${id}`,
    DELETE: (id: string) => `/api/luggage/${id}`,
  },
  // Notifications
  NOTIFICATIONS: {
    LIST: '/api/notifications',
    MARK_READ: (id: string) => `/api/notifications/${id}/read`,
    MARK_ALL_READ: '/api/notifications/read-all',
  },
  // Dashboard
  DASHBOARD: {
    STATS: '/api/dashboard/stats',
    MEMBER_STATS: '/api/dashboard/member-stats',
  },
};