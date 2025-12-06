// Seed script for loading store data

import { supabase } from '@/lib/db';

const stores = [
  {
    name: 'Apollo Pharmacy',
    latitude: 17.430,
    longitude: 78.412,
    address: '123 Main Street, Hyderabad',
    phone: '+91-9999999999',
  },
  {
    name: 'MedPlus',
    latitude: 17.432,
    longitude: 78.415,
    address: '456 Park Lane, Hyderabad',
    phone: '+91-8888888888',
  },
  {
    name: 'NetMeds',
    latitude: 17.428,
    longitude: 78.410,
    address: '789 Oak Road, Hyderabad',
    phone: '+91-7777777777',
  },
];

export async function seedStores() {
  try {
    const { error } = await supabase.from('stores').insert(stores);
    if (error) throw error;
    console.log('Stores seeded successfully');
  } catch (error) {
    console.error('Error seeding stores:', error);
  }
}
