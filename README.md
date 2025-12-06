# MedConnect AI - Agentic Medical Dashboard

An intelligent medical assistant web application that helps users manage prescriptions, track medications, receive smart reminders, and compare pharmacy prices.

## 🎯 Features

### 1. **Prescription Management**
- Upload prescription images (JPG, PNG) or PDFs
- Automatic OCR extraction using Tesseract.js
- AI-powered medicine detection and parsing
- Prescription history and file management

### 2. **Medication Management**
- Track active medications with dosage and frequency
- Automatic reminder scheduling
- Medicine expiry tracking
- Active medications timeline

### 3. **Smart Reminders & Alerts**
- Time-based medication reminders
- Drug interaction warnings
- Health tip alerts
- Browser push notifications

### 4. **Pharmacy Price Comparison**
- Real-time price comparison across multiple stores
- Locate nearby pharmacies (Apollo, Medplus, NetMeds)
- Stock availability checking
- Best price recommendations
- Store navigation

### 5. **AI Agents**
- **OCR Agent**: Extracts text from prescription images using Tesseract.js
- **Extraction Agent**: Parses medicines using OpenAI GPT-4
- **Schedule Agent**: Generates reminder schedules automatically
- **Price Agent**: Compares pharmacy prices
- **Interaction Agent**: Detects dangerous drug interactions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- OpenAI API key

### Installation

1. **Setup:**
```bash
cd medconnect-ai
npm install
```

2. **Configure `.env.local`:**
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
OPENAI_API_KEY=your_openai_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key
```

3. **Start development:**
```bash
npm run dev
```

Visit `http://localhost:3000` - Login or register to get started!

## 📁 Project Structure

- **`src/app/(auth)/`** - Login & Register pages
- **`src/app/dashboard/`** - Main dashboard, medicines, price comparison
- **`src/app/api/`** - API routes for all features
- **`src/agents/`** - AI agents (OCR, extraction, scheduling, prices, interactions)
- **`src/lib/`** - Database, auth, storage, AI, OCR utilities
- **`src/components/`** - Reusable UI components
- **`src/data/`** - Medicine data, drug interactions, store info

## 🔑 Technologies

- **Next.js 16** - React framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Styling
- **Supabase** - Database & Auth
- **OpenAI GPT-4** - AI parsing
- **Tesseract.js** - OCR
- **React Hook Form** - Form management
- **Zod** - Schema validation

## 📱 Key Pages

- `/auth/login` - User login
- `/auth/register` - User registration
- `/dashboard` - Main dashboard with overview
- `/dashboard/upload` - Upload prescriptions
- `/dashboard/medicines` - Manage active medications
- `/dashboard/price-compare` - Compare pharmacy prices

## 🔄 User Workflow

1. Sign up / Login
2. Upload prescription (image or PDF)
3. OCR extracts text automatically
4. AI parses medicines from text
5. Drug interaction check
6. Schedule reminders
7. Find best pharmacy prices
8. Get daily medication reminders

## 🧠 How Agents Work

**OCR Agent** → Tesseract.js processes image → Text extraction
**Extraction Agent** → GPT-4 parses text → Medicine data JSON
**Schedule Agent** → Generates reminder times from frequency
**Price Agent** → Searches medicine prices across stores
**Interaction Agent** → Checks drug interactions from database

## 🗄️ Database

Tables: users, prescriptions, medications, reminders, stores, medicine_prices

See `src/scripts/database-schema.sql` for full schema.

## 🚀 Deploy to Vercel

```bash
# Push to GitHub
# Connect repo to Vercel
# Add environment variables
# Deploy!
```

## 📝 API Endpoints

- `POST /api/upload/prescription` - Upload & process prescription
- `POST /api/ocr/process` - Extract medicines via OCR
- `GET /api/medicines/alerts` - Get today's reminders
- `POST /api/stores/compare` - Compare medicine prices
- `POST /api/ai/extract` - Extract medicine data

## 🙏 Built With

- OpenAI GPT-4
- Supabase PostgreSQL
- Tesseract.js
- Next.js & React
- Tailwind CSS

---

**MedConnect AI** - Smart Healthcare Management 💊✨
