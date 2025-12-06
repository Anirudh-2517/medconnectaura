/* eslint-disable @typescript-eslint/no-explicit-any */
import { parseFrequencyToTimes } from '@/lib/helpers';

interface MedicationSchedule {
  medicineName: string;
  dosage: string;
  timings: string[];
  frequency: string;
  duration: number;
  reminders: Reminder[];
}

interface Reminder {
  time: string;
  medicine: string;
  dosage: string;
  instructions?: string;
}

/**
 * Schedule Agent - Creates medication schedules and generates reminders
 * Responsible for alarm/notification timing and frequency calculation
 */
export class ScheduleAgent {
  static generateSchedule(medicines: any[]): MedicationSchedule[] {
    return medicines.map((medicine) => {
      const timings = Array.isArray(medicine.timings)
        ? medicine.timings
        : parseFrequencyToTimes(medicine.frequency);

      const reminders: Reminder[] = timings.map((time: string) => ({
        time,
        medicine: medicine.name,
        dosage: medicine.dosage,
        instructions: medicine.instructions,
      }));

      return {
        medicineName: medicine.name,
        dosage: medicine.dosage,
        timings,
        frequency: medicine.frequency,
        duration: medicine.duration,
        reminders,
      };
    });
  }

  static calculateNextReminder(timings: string[]): string {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    for (const time of timings.sort()) {
      if (time > currentTime) {
        return time;
      }
    }

    // If no remaining reminders today, return first reminder of next day
    return timings.sort()[0];
  }

  static calculateEndDate(startDate: Date, durationDays: number): Date {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + durationDays);
    return endDate;
  }

  static getDaysRemaining(endDate: Date): number {
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }
}

export default ScheduleAgent;
