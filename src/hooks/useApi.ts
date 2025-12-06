import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

const getAuthHeader = () => {
  try {
    if (typeof window === 'undefined') return {};
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
};

// Medications Hooks
export function useMedications() {
  return useQuery({
    queryKey: ['medications'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE}/medicines`, {
        headers: getAuthHeader(),
      });
      return response.data.medicines || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Alerts Hooks
export function useAlerts() {
  return useQuery({
    queryKey: ['alerts'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE}/medicines/alerts`, {
        headers: getAuthHeader(),
      });
      return response.data.alerts || [];
    },
    staleTime: 30 * 1000, // 30 seconds - alerts should refresh frequently
    refetchInterval: 30000,
  });
}

// Stores Hooks
export function useStores() {
  return useQuery({
    queryKey: ['stores'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE}/stores`, {
        headers: getAuthHeader(),
      });
      return response.data.stores || [];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 20 * 60 * 1000, // 20 minutes
  });
}

// Price Comparison Hook
export function usePriceComparison(medicine: string) {
  return useQuery({
    queryKey: ['prices', medicine],
    queryFn: async () => {
      if (!medicine) return null;
      const response = await axios.post(`${API_BASE}/stores/compare`, { medicine }, {
        headers: getAuthHeader(),
      });
      return response.data.prices || [];
    },
    enabled: !!medicine,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Upload Prescription Hook
export function useUploadPrescription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post(`${API_BASE}/upload/prescription`, formData, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications'] });
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });
}

// Parse Prescription Hook
export function useParsePrescription() {
  return useMutation({
    mutationFn: async (fileUrl: string) => {
      const response = await axios.post(
        `${API_BASE}/ai/extract`,
        { fileUrl },
        { headers: getAuthHeader() }
      );
      return response.data;
    },
  });
}

// Mark Alert as Read Hook
export function useMarkAlertAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (alertId: string) => {
      const response = await axios.put(
        `${API_BASE}/medicines/alerts/${alertId}`,
        { isRead: true },
        { headers: getAuthHeader() }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });
}

// Schedule Reminder Hook
export function useScheduleReminder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (reminder: { medicineId: string; times: string[]; duration: number }) => {
      const response = await axios.post(
        `${API_BASE}/medicines/reminders`,
        reminder,
        { headers: getAuthHeader() }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });
}

// Drug Interaction Check Hook
export function useDrugInteractionCheck() {
  return useMutation({
    mutationFn: async (medicines: string[]) => {
      const response = await axios.post(
        `${API_BASE}/ai/interactions`,
        { medicines },
        { headers: getAuthHeader() }
      );
      return response.data.interactions || [];
    },
  });
}
