import { apiClient } from '../lib/api-client';
import { 
  CreateLuggagePassCommand, 
  UpdateLuggagePassCommand, 
  LuggagePass
} from '../types/api';

// API Response type matching your backend
interface ApiResponse<T = any> {
  data: T;
  message: string;
  upcomingLuggage: any []; // Adjust type as needed
  previousLuggage: any []; // Adjust type as needed
  success: boolean;
  errors: string[];
}

// Create response type for luggage pass creation
interface CreateLuggageResponse {
  succeeded: boolean;
  data?: any;
  errors?: any;
}

// Luggage Pass API Service
export class LuggageService {
  private readonly baseUrl = '/api/smartdha/luggagepass';

  // Create new luggage pass
  async createLuggagePass(data: CreateLuggagePassCommand): Promise<CreateLuggageResponse> {
    return apiClient.post(`${this.baseUrl}/create-luggagepass`, data);
  }

  // Update existing luggage pass
  async updateLuggagePass(data: UpdateLuggagePassCommand): Promise<ApiResponse<LuggagePass>> {
    return apiClient.post(`${this.baseUrl}/update-luggagepass`, data);
  }

  // Delete luggage pass
  async deleteLuggagePass(id: string): Promise<ApiResponse<void>> {
    return apiClient.post(`${this.baseUrl}/delete-luggagepass`, { id });
  }

  // Get all luggage passes (upcoming and previous)
  async getAllLuggagePasses(): Promise<ApiResponse<{
    upcomingLuggage: LuggagePass[];
    previousLuggage: LuggagePass[];
  }>> {
    return apiClient.get(`${this.baseUrl}/getall`);
  }
}

// Export singleton instance
export const luggageService = new LuggageService();
