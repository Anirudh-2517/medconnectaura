// Cron job for handling medication reminders
// This would typically run every hour or at specified intervals

import { supabase } from '@/lib/db';

export async function generateDailyReminders() {
  try {
    const today = new Date().toISOString().split('T')[0];

    // Get all active medications
    const { data: medications, error: medicError } = await supabase
      .from('medications')
      .select('*')
      .lte('start_date', today);

    if (medicError) throw medicError;

    // Create reminders for each medication
    const reminders = medications?.flatMap((med: any) => {
      return (med.timings || ['09:00']).map((time: string) => ({
        medication_id: med.id,
        user_id: med.user_id,
        alert_time: time,
        status: 'pending',
        date: today,
      }));
    }) || [];

    if (reminders.length > 0) {
      const { error: insertError } = await supabase.from('reminders').insert(reminders);
      if (insertError) throw insertError;
    }

    console.log(`Generated ${reminders.length} reminders for ${today}`);
  } catch (error) {
    console.error('Error generating reminders:', error);
  }
}

export async function sendReminders() {
  try {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // Get pending reminders for current time
    const { data: reminders, error } = await supabase
      .from('reminders')
      .select('*, medications(*)')
      .eq('status', 'pending')
      .eq('alert_time', currentTime);

    if (error) throw error;

    // Send notifications (integrate with your notification service)
    reminders?.forEach((reminder: any) => {
      console.log(`Reminder: Take ${reminder.medications.name} at ${reminder.alert_time}`);
      // Send push notification, email, SMS, etc.
    });
  } catch (error) {
    console.error('Error sending reminders:', error);
  }
}
