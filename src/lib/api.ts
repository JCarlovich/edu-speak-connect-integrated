// API Configuration for EduSaaS Backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://64.226.116.132';
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 10000;

// API client configuration
export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: parseInt(API_TIMEOUT.toString()),
  headers: {
    'Content-Type': 'application/json',
  },
};

// Helper function for making API requests
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      ...apiConfig.headers,
      ...options.headers,
    },
  };

  // Add auth token if available
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${token}`,
    };
  }

  try {
    console.log(`🌐 API Request: ${options.method || 'GET'} ${url}`);
    
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error(`❌ API Error: ${response.status} - ${errorData}`);
      throw new Error(`HTTP ${response.status}: ${errorData}`);
    }

    const data = await response.json();
    console.log(`✅ API Success: ${options.method || 'GET'} ${url}`, data);
    return data;
  } catch (error) {
    console.error(`🚨 API Request failed: ${url}`, error);
    throw error;
  }
}

// Specific API methods
export const api = {
  // Health check
  health: () => apiRequest<{status: string, timestamp: string}>('/health'),
  
  // Auth endpoints
  auth: {
    register: (userData: { email: string; password: string; name: string; role: string }) =>
      apiRequest<{ user: any; token: string }>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),
    
    login: (credentials: { email: string; password: string }) =>
      apiRequest<{ session: any; user: any }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    
    me: () => apiRequest<{ user: any }>('/api/auth/me'),
    
    updateProfile: (userData: any) =>
      apiRequest<{ user: any }>('/api/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(userData),
      }),
  },
  
  // Classes endpoints
  classes: {
    getAll: () => apiRequest<{ classes: any[] }>('/api/classes'),
    
    create: (classData: any) =>
      apiRequest<{ class: any }>('/api/classes', {
        method: 'POST',
        body: JSON.stringify(classData),
      }),
    
    getById: (id: string) => apiRequest<{ class: any }>(`/api/classes/${id}`),
    
    update: (id: string, classData: any) =>
      apiRequest<{ class: any }>(`/api/classes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(classData),
      }),
    
    delete: (id: string) =>
      apiRequest<void>(`/api/classes/${id}`, {
        method: 'DELETE',
      }),
      
    getAvailableStudents: () =>
      apiRequest<{ students: any[] }>('/api/classes/students/available'),
  },
};

export default api;