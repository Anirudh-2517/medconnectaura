# Setup Guide - MedConnect AI

Follow these steps to get MedConnect AI running on your machine.

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Git
- Supabase account (free tier available at supabase.com)
- OpenAI API key (from openai.com)

## Step 1: Install Dependencies

```bash
cd medconnect-ai
npm install
```

Wait for all packages to install (~2-3 minutes).

## Step 2: Setup Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. In Project Settings → Database, copy your credentials:
   - Project URL
   - Anon Key (public)
4. Create a storage bucket:
   - Go to Storage → Create Bucket
   - Name: `prescriptions`
   - Make it Public
5. Run the database schema:
   - Go to SQL Editor
   - Create a new query
   - Copy-paste content from `src/scripts/database-schema.sql`
   - Click Run

## Step 3: Setup OpenAI API

1. Go to [platform.openai.com](https://platform.openai.com)
2. Create an API key
3. Keep it safe - don't share it!

## Step 4: Configure Environment Variables

Create `.env.local` file in project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_project_url_from_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_from_supabase

# OpenAI
OPENAI_API_KEY=your_api_key_from_openai

# Optional: Google Maps (for nearby stores)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Optional: NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_random_secret_here
```

**To generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

## Step 5: Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Step 6: Test the Application

1. **Register a new account**
   - Go to `/auth/register`
   - Fill in name, email, password
   - Click Create Account

2. **Login**
   - Go to `/auth/login`
   - Enter your credentials

3. **Upload a Prescription**
   - Click "Upload Prescription" in dashboard
   - Drag & drop or click to select an image
   - The app will extract medicines automatically

4. **View Medicines**
   - Click "My Medicines" to see extracted medicines
   - Check reminders for today
   - Set reminder statuses

5. **Compare Prices**
   - Click "Compare Prices"
   - Select a medicine
   - See prices across different stores

## Troubleshooting

### "Connection refused" error
- Make sure Supabase project is created and active
- Check SUPABASE_URL and keys are correct
- Verify you're online

### "API key not found" error
- Check OPENAI_API_KEY is set in `.env.local`
- Restart dev server after adding env vars: `Ctrl+C` then `npm run dev`

### Database schema errors
- Verify you ran the SQL schema from `database-schema.sql`
- Check Supabase SQL editor for any error messages
- Ensure bucket `prescriptions` is created

### OCR not working
- Check browser console for errors
- Tesseract.js needs to download models on first use
- It works best with clear prescription images

### OpenAI API errors
- Verify API key is active at openai.com
- Check you have credits/billing enabled
- GPT-4 model requires paid account

## File Uploads

When you upload a prescription:
1. File is saved to Supabase storage bucket `prescriptions`
2. OCR extracts text using Tesseract.js
3. Text is sent to OpenAI GPT-4 for parsing
4. Medicines are saved to database
5. You can view them in "My Medicines"

**Supported formats:** JPG, PNG, PDF

**Max file size:** 5MB recommended

## Database Operations

The app automatically:
- Creates user profile on signup
- Stores prescriptions when uploaded
- Saves medicines and reminders
- Tracks medicine status (taken/pending/skipped)

To manually check database:
1. Go to Supabase dashboard
2. Click "Table Editor"
3. Browse tables: users, prescriptions, medications, reminders

## Building for Production

```bash
npm run build
npm run start
```

The app will be optimized and ready to deploy.

## Deploying to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repo
5. Add environment variables in Vercel settings:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - OPENAI_API_KEY
6. Click Deploy

Your app will be live in ~1 minute!

## Common Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Run linting
npm run lint

# Type check
npm run type-check
```

## Need Help?

- Check README.md for feature descriptions
- Review BUILD_SUMMARY.md for complete feature list
- Check API documentation in README
- Look at component examples in `src/components/ui/`
- Review agent implementations in `src/agents/`

## Next Features to Add

After setup works, you can add:
- Push notifications
- Email reminders
- SMS alerts
- Payment integration
- More medicine datasets
- User profile page
- Medicine history
- Doctor integration
- Family member sharing
- Advanced analytics

Happy coding! 🚀
