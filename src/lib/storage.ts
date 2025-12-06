import { supabase } from './db';

const BUCKET_NAME = 'prescriptions';

export async function uploadPrescriptionFile(file: File, userId: string): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  const publicRes = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);

  // `getPublicUrl` returns an object with `data.publicUrl` when successful
  const publicUrl = publicRes?.data?.publicUrl || '';

  return publicUrl;
}

export async function deletePrescriptionFile(filePath: string): Promise<void> {
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([filePath]);

  if (error) throw error;
}

export async function listUserPrescriptions(userId: string) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list(userId);

  if (error) throw error;
  return data;
}
