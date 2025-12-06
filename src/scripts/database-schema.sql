// Supabase Database Schema SQL
// Run these SQL commands in your Supabase dashboard

/*
-- Create users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text NOT NULL UNIQUE,
  name text,
  created_at timestamp with time zone DEFAULT now()
);

-- Create prescriptions table
CREATE TABLE public.prescriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  file_url text NOT NULL,
  ocr_text text,
  created_at timestamp with time zone DEFAULT now()
);

-- Create medications table
CREATE TABLE public.medications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prescription_id uuid NOT NULL REFERENCES public.prescriptions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  dosage text,
  frequency text,
  timings text[] DEFAULT ARRAY['09:00'],
  duration integer DEFAULT 7,
  start_date timestamp with time zone DEFAULT now(),
  instructions text,
  created_at timestamp with time zone DEFAULT now()
);

-- Create reminders table
CREATE TABLE public.reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  medication_id uuid NOT NULL REFERENCES public.medications(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  alert_time text NOT NULL,
  status text DEFAULT 'pending',
  date date DEFAULT CURRENT_DATE,
  created_at timestamp with time zone DEFAULT now()
);

-- Create stores table
CREATE TABLE public.stores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  latitude numeric,
  longitude numeric,
  address text,
  phone text,
  created_at timestamp with time zone DEFAULT now()
);

-- Create medicine prices table
CREATE TABLE public.medicine_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  medicine_name text NOT NULL,
  store_id uuid NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  price numeric,
  in_stock boolean DEFAULT true,
  updated_at timestamp with time zone DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_prescriptions_user_id ON public.prescriptions(user_id);
CREATE INDEX idx_medications_prescription_id ON public.medications(prescription_id);
CREATE INDEX idx_medications_user_id ON public.medications(user_id);
CREATE INDEX idx_reminders_medication_id ON public.reminders(medication_id);
CREATE INDEX idx_reminders_user_id ON public.reminders(user_id);
CREATE INDEX idx_medicine_prices_store_id ON public.medicine_prices(store_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
CREATE POLICY "Users can read their own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can read their own prescriptions" ON public.prescriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can read their own medications" ON public.medications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can read their own reminders" ON public.reminders
  FOR SELECT USING (auth.uid() = user_id);
*/
