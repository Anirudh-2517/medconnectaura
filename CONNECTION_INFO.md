📋 MEDCONNECT.AI - CONNECTION INFORMATION & CREDENTIALS

=== DEVELOPMENT SERVER ===

✅ STATUS: RUNNING
   URL: http://localhost:3000
   Network: http://192.168.29.38:3000

ACCESSIBLE ROUTES:
   - Login: http://localhost:3000/login
   - Register: http://localhost:3000/register
   - Dashboard: http://localhost:3000/dashboard (requires login)

=== SUPABASE CONFIGURATION ===

PROJECT DETAILS:
   Project URL: https://arputcthxzjdtgcfzxps.supabase.co
   Project ID: arputcthxzjdtgcfzxps
   Region: (check in Supabase dashboard)

API KEYS (in .env.local):
   Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFycHV0Y3RoeHpqZHRnY2Z6eHBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MzU1MTAsImV4cCI6MjA4MDUxMTUxMH0.Z8jpVPWgZ2iBQFBUMFVejshmtX8u2hZZi0EasJISWI0

DATABASE TABLES NEEDED:
   ✅ auth.users (auto-created by Supabase)
   ❌ public.users (create manually)
   ❌ public.prescriptions (create manually)
   ❌ public.medications (create manually)
   ❌ public.reminders (create manually)

SQL TO CREATE USERS TABLE:
┌─────────────────────────────────────────────────────────────┐
│ CREATE TABLE IF NOT EXISTS public.users (                   │
│   id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY   │
│   email TEXT UNIQUE NOT NULL,                               │
│   name TEXT NOT NULL,                                       │
│   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),        │
│   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()         │
│ );                                                          │
│                                                             │
│ ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;        │
│                                                             │
│ CREATE POLICY "Users can view own data" ON public.users     │
│   FOR SELECT USING (auth.uid() = id);                      │
└─────────────────────────────────────────────────────────────┘

HOW TO ACCESS SUPABASE:
   1. Go to https://app.supabase.com
   2. Login with your Supabase account
   3. Select the "medconnect-ai" project
   4. Navigate to SQL Editor to run queries

=== OPENAI CONFIGURATION ===

API Key (in .env.local):
   AIzaSyCYza6GYOvi94fEXAmfHzcHH2Csf12qEF8

Note: Verify this is a valid OpenAI key (currently looks like it might be a Google key)
      Update if needed in .env.local

=== ENVIRONMENT VARIABLES ===

Location: d:\Full Stack Development\medconnect-ai\.env.local

Current Configuration:
┌──────────────────────────────────────────────────────────────┐
│ # Supabase Configuration                                    │
│ NEXT_PUBLIC_SUPABASE_URL=https://arputcthxzjdtgcfzxps...    │
│ NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...      │
│                                                              │
│ # OpenAI Configuration                                      │
│ OPENAI_API_KEY=AIzaSyCYza6GYOvi94fEXAmfHzcHH2Csf12qEF8     │
│                                                              │
│ # NextAuth Configuration                                    │
│ NEXTAUTH_URL=http://localhost:3000                          │
└──────────────────────────────────────────────────────────────┘

To Modify:
   1. Open .env.local
   2. Edit values
   3. Restart dev server (Ctrl+C, then npm run dev)

=== TEST CREDENTIALS ===

FOR TESTING LOGIN:

Credentials to create in Supabase:
   Email: test@example.com
   Password: TestPassword123
   Name: Test User

To create test user:
   1. Go to https://app.supabase.com
   2. Click Authentication → Users
   3. Click "Create new user"
   4. Fill in:
      • Email: test@example.com
      • Password: TestPassword123
      • Auto-confirm: YES
   5. Click "Create user"

Then test login at:
   URL: http://localhost:3000/login
   Email: test@example.com
   Password: TestPassword123

=== API ENDPOINTS ===

LOGIN FLOW ENDPOINTS:

POST /api/auth/login
   Body: { email, password }
   Response: { success, session: { user, session: { access_token } } }
   Returns: User data + access token

POST /api/auth/register
   Body: { email, password, name }
   Response: { success, user: { id, email } }
   Creates new user + profile

GET /api/auth/verify
   Headers: Authorization: Bearer {token}
   Response: { isValid: true }
   Verifies token is valid

=== FRONTEND FILES ===

AUTHENTICATION PAGES:
   src/app/login/page.tsx - Login page (form + validation)
   src/app/register/page.tsx - Register page (form + validation)
   src/app/page.tsx - Root page (auto-redirect)

AUTH LOGIC:
   src/lib/auth.ts - signIn(), signUp(), signOut() functions
   src/lib/db.ts - Supabase client initialization
   src/components/ProtectedRoute.tsx - Route protection wrapper

API ROUTES:
   src/app/api/auth/login/route.ts
   src/app/api/auth/register/route.ts
   src/app/api/auth/verify/route.ts

HOOKS:
   src/hooks/useApi.ts - Custom React Query hooks

=== TOKEN STORAGE ===

Token is stored in browser's localStorage:
   Key: "token"
   Value: JWT access token from Supabase

To check token in browser:
   1. Open DevTools (F12)
   2. Console tab
   3. Type: localStorage.getItem('token')
   4. Shows: eyJhbGciOi... (long JWT string)

Token is removed when:
   - User clicks logout
   - Token expires
   - User navigates to /login
   - Invalid token detected

=== HOW LOGIN WORKS ===

1. User visits http://localhost:3000/login
2. User enters email and password
3. Form validates with Zod schema
4. Clicks "Sign In"
5. Frontend calls signIn(email, password) function
6. signIn() makes request to Supabase auth
7. Supabase verifies credentials
8. If valid, returns user + access_token
9. Access token stored in localStorage
10. Frontend redirects to /dashboard
11. ProtectedRoute verifies token
12. Dashboard displays user data

=== TROUBLESHOOTING CHECKLIST ===

❌ Login page shows "404 Not Found"
   ✅ Solution: Dev server might not be running. Check terminal.
   ✅ Command: npm run dev

❌ "Email not found" error
   ✅ Solution: Create test user in Supabase first
   ✅ Go to: https://app.supabase.com → Authentication → Users

❌ "Invalid password" error
   ✅ Solution: Check password exactly matches (case-sensitive)

❌ Page redirects to /login after clicking Sign In
   ✅ Solution: Supabase credentials might be wrong
   ✅ Check: .env.local has correct NEXT_PUBLIC_SUPABASE_URL and KEY

❌ Token not storing in localStorage
   ✅ Solution: Check browser allows localStorage
   ✅ Open DevTools → Application → LocalStorage

❌ Can't access /dashboard after login
   ✅ Solution: ProtectedRoute might not be working
   ✅ Check: src/app/dashboard/layout.tsx has ProtectedRoute

❌ Getting CORS errors
   ✅ Solution: This shouldn't happen - Supabase handles CORS
   ✅ Try: Clear browser cache and reload

=== QUICK REFERENCE ===

Login URL: http://localhost:3000/login
Register URL: http://localhost:3000/register
Dashboard URL: http://localhost:3000/dashboard (requires login)

Supabase Dashboard: https://app.supabase.com
Supabase Project ID: arputcthxzjdtgcfzxps

.env.local location: d:\Full Stack Development\medconnect-ai\.env.local

Dev Server: npm run dev
Build: npm run build
Lint: npm run lint

=== NEXT STEPS ===

1. Create test user in Supabase (via web dashboard)
2. Test login at http://localhost:3000/login
3. Create prescriptions/medications tables in Supabase
4. Test the full workflow

All files are ready and connected! 🎉
