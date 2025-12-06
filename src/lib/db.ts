import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database Types
export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

export interface Prescription {
  id: string;
  user_id: string;
  file_url: string;
  ocr_text: string;
  created_at: string;
}

export interface Medication {
  id: string;
  prescription_id: string;
  name: string;
  dosage: string;
  frequency: string;
  timings: string[];
  duration: number;
  start_date: string;
}

export interface Reminder {
  id: string;
  medication_id: string;
  alert_time: string;
  status: 'pending' | 'taken' | 'skipped';
  user_id: string;
}

export interface Store {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
}

export interface MedicinePrice {
  id: string;
  medicine_name: string;
  store_id: string;
  price: number;
  in_stock: boolean;
}

// Database Operations
export async function getUserById(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function getMedicationsByUserId(userId: string) {
  const { data, error } = await supabase
    .from('medications')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;
  return data;
}

export async function getRemindersByMedicationId(medicationId: string) {
  const { data, error } = await supabase
    .from('reminders')
    .select('*')
    .eq('medication_id', medicationId);

  if (error) throw error;
  return data;
}

export async function getStoresNearby(latitude: number, longitude: number, radiusKm: number = 5) {
  const { data, error } = await supabase.rpc('get_nearby_stores', {
    lat: latitude,
    lng: longitude,
    radius: radiusKm,
  });

  if (error) throw error;
  return data;
}
