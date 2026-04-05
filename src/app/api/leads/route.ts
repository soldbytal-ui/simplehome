import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, source, projectId } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Try Supabase first, fallback to console log
    try {
      const { error } = await supabase.from('leads').insert({
        name,
        email,
        phone: phone || null,
        message: message || null,
        source: source || 'website',
        projectId: projectId || null,
        status: 'new',
      });
      if (error) throw error;
    } catch {
      // Log if Supabase isn't configured
      console.log('New lead:', { name, email, phone, message, source, projectId });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to submit lead' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const password = request.headers.get('x-admin-password');
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ leads: data || [] });
  } catch {
    return NextResponse.json({ leads: [] });
  }
}
