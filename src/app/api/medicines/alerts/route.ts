import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const medicationId = searchParams.get('medicationId');
    const userId = searchParams.get('userId');

    if (medicationId) {
      // Get reminders for specific medication
      const { data, error } = await supabase
        .from('reminders')
        .select('*')
        .eq('medication_id', medicationId);

      if (error) throw error;
      return NextResponse.json({ reminders: data });
    }

    if (userId) {
      // Get today's reminders for user
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('reminders')
        .select('*')
        .eq('user_id', userId)
        .eq('date', today);

      if (error) throw error;
      return NextResponse.json({ reminders: data });
    }

    return NextResponse.json({ error: 'medicationId or userId required' }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch alerts' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { reminderId, status } = await req.json();

    if (!reminderId || !status) {
      return NextResponse.json(
        { error: 'reminderId and status are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('reminders')
      .update({ status })
      .eq('id', reminderId)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, reminder: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Update failed' },
      { status: 500 }
    );
  }
}
