// Seed script for loading initial medicine data
// This would typically be run once to populate the database

import { supabase } from '@/lib/db';

const medicines = [
  { name: 'Paracetamol 500mg', dosage: '500mg', brand: 'Crocin', in_stock: true },
  { name: 'Ibuprofen 400mg', dosage: '400mg', brand: 'Brufen', in_stock: true },
  { name: 'Aspirin 100mg', dosage: '100mg', brand: 'Ecosprin', in_stock: true },
  { name: 'Vitamin D3 1000IU', dosage: '1000IU', brand: 'Nature\'s Bounty', in_stock: true },
  { name: 'Metformin 500mg', dosage: '500mg', brand: 'Glucophage', in_stock: true },
];

export async function seedMedicines() {
  try {
    const { error } = await supabase.from('medicines').insert(medicines);
    if (error) throw error;
    console.log('Medicines seeded successfully');
  } catch (error) {
    console.error('Error seeding medicines:', error);
  }
}
