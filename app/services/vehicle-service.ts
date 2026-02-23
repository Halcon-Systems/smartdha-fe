import { apiClient } from '../lib/api-client';
import { 
  CreateVehicleCommand, 
  UpdateVehicleCommand, 
  DeleteVehicleCommand,
  Vehicle
} from '../types/api';

// API Response type matching your backend
interface ApiResponse<T = any> {
  data: T;
  message: string;
  succeeded: boolean;
  errors: string[];
}

// Vehicle API Service
export class VehicleService {
  private readonly baseUrl = '/api/smartdha/vehicle';

  // Create new vehicle (with FormData for file upload and query params)
  async createVehicle(formData: FormData, queryParams?: string): Promise<ApiResponse<Vehicle>> {
    const url = queryParams ? `${this.baseUrl}/add-vehicle?${queryParams}` : `${this.baseUrl}/add-vehicle`;
    return apiClient.post(url, formData);
  }

  // Update existing vehicle
  async updateVehicle(data: UpdateVehicleCommand): Promise<ApiResponse<Vehicle>> {
    return apiClient.post(`${this.baseUrl}/update`, data);
  }

  // Delete vehicle
  async deleteVehicle(data: DeleteVehicleCommand): Promise<ApiResponse<void>> {
    return apiClient.post(`${this.baseUrl}/delete`, data);
  }

  // Get vehicle list
  async getVehicleList(): Promise<ApiResponse<Vehicle[]>> {
    return apiClient.get(`${this.baseUrl}/list`);
  }
}

// Export singleton instance
export const vehicleService = new VehicleService();
