import axios from 'axios';

const API_BASE_URL = 'YOUR_BACKEND_API_URL';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface MobileLoginCredentials {
  phoneNumber: string;
}

export interface OTPVerification {
  phoneNumber: string;
  otp: string;
}

class AuthService {
  async login(credentials: LoginCredentials) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async signup(credentials: SignupCredentials) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async sendMobileOTP(credentials: MobileLoginCredentials) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/send-otp`, credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async verifyMobileOTP(verification: OTPVerification) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, verification);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async resendOTP(phoneNumber: string) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/resend-otp`, { phoneNumber });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const authService = new AuthService(); 