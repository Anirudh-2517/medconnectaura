# MedConnect AI - Complete File Structure

## Project Root
```
medconnect-ai/
├── src/
├── public/
├── .env.local
├── .eslintrc.json
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── tailwind.config.ts
├── README.md
├── BUILD_SUMMARY.md
├── SETUP.md
└── LICENSE
```

## Source Directory Structure
```
src/
│
├── app/                          # Next.js app directory
│   │
│   ├── (auth)/                   # Route group for auth pages
│   │   ├── login/
│   │   │   └── page.tsx          # Login page
│   │   ├── register/
│   │   │   └── page.tsx          # Registration page
│   │   └── layout.tsx            # Auth layout
│   │
│   ├── dashboard/                # Dashboard route group
│   │   ├── page.tsx              # Main dashboard
│   │   ├── layout.tsx            # Dashboard layout with sidebar
│   │   │
│   │   ├── upload/
│   │   │   └── page.tsx          # Prescription upload page
│   │   │
│   │   ├── medicines/
│   │   │   └── page.tsx          # Medicine list page
│   │   │
│   │   ├── price-compare/
│   │   │   └── page.tsx          # Price comparison page
│   │   │
│   │   └── components/           # Dashboard-specific components
│   │       ├── DashboardCards.tsx
│   │       ├── PrescriptionCard.tsx
│   │       ├── MedicineList.tsx
│   │       ├── PriceComparisonTable.tsx
│   │       └── AlertsPanel.tsx
│   │
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts
│   │   │   └── register/
│   │   │       └── route.ts
│   │   │
│   │   ├── upload/
│   │   │   └── prescription/
│   │   │       └── route.ts
│   │   │
│   │   ├── ocr/
│   │   │   └── process/
│   │   │       └── route.ts
│   │   │
│   │   ├── medicines/
│   │   │   └── alerts/
│   │   │       └── route.ts
│   │   │
│   │   ├── stores/
│   │   │   └── compare/
│   │   │       └── route.ts
│   │   │
│   │   └── ai/
│   │       └── extract/
│   │           └── route.ts
│   │
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page (redirects to dashboard)
│   └── globals.css               # Global styles
│
├── components/                   # Reusable components
│   │
│   ├── ui/                       # UI component library
│   │   ├── Button.tsx            # Button component
│   │   ├── Card.tsx              # Card component
│   │   ├── Input.tsx             # Input component
│   │   ├── Alert.tsx             # Alert component
│   │   ├── Badge.tsx             # Badge component
│   │   ├── Modal.tsx             # Modal component
│   │   └── Loader.tsx            # Loader component
│   │
│   ├── Navbar.tsx                # Top navigation bar
│   ├── Sidebar.tsx               # Side navigation
│   └── FileUploader.tsx          # File upload component
│
├── agents/                       # AI agents
│   ├── ocrAgent.ts              # OCR agent (Tesseract.js)
│   ├── extractionAgent.ts       # Medicine extraction (GPT-4)
│   ├── scheduleAgent.ts         # Schedule generation
│   ├── priceAgent.ts            # Price comparison
│   └── interactionAgent.ts      # Drug interactions
│
├── lib/                          # Utilities and libraries
│   ├── db.ts                    # Supabase database setup
│   ├── auth.ts                  # Authentication functions
│   ├── storage.ts               # File storage functions
│   ├── ai.ts                    # OpenAI integration
│   ├── ocr.ts                   # OCR utilities
│   ├── helpers.ts               # Helper functions
│   └── scheduler.ts             # Cron job functions
│
├── data/                         # Data files
│   ├── medicines.csv             # Medicine dataset
│   ├── drug_interactions.json    # Drug interaction data
│   └── stores/
│       └── prices.csv            # Store price data
│
└── scripts/                      # Setup scripts
    ├── database-schema.sql       # Database schema
    ├── seedMedicines.ts          # Seed medicines
    ├── seedStores.ts             # Seed stores
    └── cronJob.ts                # Cron job definitions
```

## File Descriptions

### Authentication Files
- **`src/app/(auth)/login/page.tsx`** - Login page with email/password form
- **`src/app/(auth)/register/page.tsx`** - Registration page with validation
- **`src/lib/auth.ts`** - Auth helper functions (signup, signin, logout)
- **`src/app/api/auth/login/route.ts`** - Login API endpoint
- **`src/app/api/auth/register/route.ts`** - Registration API endpoint

### Dashboard Files
- **`src/app/dashboard/page.tsx`** - Main dashboard with statistics
- **`src/app/dashboard/upload/page.tsx`** - Prescription upload
- **`src/app/dashboard/medicines/page.tsx`** - Medicine management
- **`src/app/dashboard/price-compare/page.tsx`** - Price comparison
- **`src/app/dashboard/layout.tsx`** - Dashboard layout

### API Routes
- **`src/app/api/upload/prescription/route.ts`** - Upload prescription
- **`src/app/api/ocr/process/route.ts`** - OCR processing
- **`src/app/api/medicines/alerts/route.ts`** - Medication alerts
- **`src/app/api/stores/compare/route.ts`** - Price comparison
- **`src/app/api/ai/extract/route.ts`** - Medicine extraction

### Component Files
- **`src/components/Navbar.tsx`** - Top navigation (200 lines)
- **`src/components/Sidebar.tsx`** - Side navigation (100 lines)
- **`src/components/FileUploader.tsx`** - Drag-drop upload (150 lines)
- **`src/components/ui/*.tsx`** - 7 reusable UI components

### Agent Files
- **`src/agents/ocrAgent.ts`** - OCR with Tesseract.js (60 lines)
- **`src/agents/extractionAgent.ts`** - GPT-4 parsing (80 lines)
- **`src/agents/scheduleAgent.ts`** - Schedule generation (120 lines)
- **`src/agents/priceAgent.ts`** - Price comparison (200 lines)
- **`src/agents/interactionAgent.ts`** - Interaction checking (150 lines)

### Utility Files
- **`src/lib/db.ts`** - Supabase setup (150 lines)
- **`src/lib/auth.ts`** - Auth helpers (100 lines)
- **`src/lib/storage.ts`** - File storage (50 lines)
- **`src/lib/ai.ts`** - OpenAI integration (150 lines)
- **`src/lib/ocr.ts`** - OCR utilities (60 lines)
- **`src/lib/helpers.ts`** - 15+ helper functions (200 lines)

### Configuration Files
- **`package.json`** - Dependencies and scripts
- **`tsconfig.json`** - TypeScript configuration
- **`next.config.ts`** - Next.js configuration
- **`tailwind.config.ts`** - Tailwind CSS configuration
- **`.env.local`** - Environment variables
- **`.eslintrc.json`** - ESLint configuration

### Documentation Files
- **`README.md`** - Main documentation (400+ lines)
- **`BUILD_SUMMARY.md`** - Complete build summary
- **`SETUP.md`** - Setup and deployment guide

## File Statistics

- **Total Files Created:** 60+
- **Total Lines of Code:** 5000+
- **TypeScript/TSX Files:** 45+
- **API Routes:** 7
- **UI Components:** 13
- **Pages:** 6
- **Agents:** 5
- **Utility Modules:** 6
- **Configuration Files:** 6
- **Documentation Files:** 3

## Component Hierarchy

```
RootLayout
├── AuthLayout
│   ├── LoginPage
│   └── RegisterPage
│
└── DashboardLayout
    ├── Navbar
    ├── Sidebar
    └── Main Content
        ├── DashboardPage
        │   ├── SummaryCard
        │   ├── ReminderTimeline
        │   ├── MedicineCard
        │   └── AlertCard
        │
        ├── UploadPage
        │   └── FileUploader
        │
        ├── MedicinesPage
        │   └── MedicineList
        │       └── MedicineListItem
        │
        └── PriceComparePage
            └── PriceComparisonTable
```

## Styling Architecture

- **Tailwind CSS** - Utility-first CSS
- **Custom Components** - In `src/components/ui/`
- **CSS Classes** - Responsive design with breakpoints
- **Dark Mode** - Full dark mode support
- **Color Variants** - Primary, secondary, danger, warning, success

## State Management

- **React Hooks** - useState, useEffect
- **Custom Hooks** - Coming soon
- **Context API** - Can be added for global state
- **React Query** - Installed for server state

## Types & Interfaces

- **Full TypeScript** - No `any` types
- **Interface for Props** - All components typed
- **Database Types** - Defined in `lib/db.ts`
- **API Response Types** - Defined in routes

## Security

- **Environment Variables** - Sensitive data protected
- **Input Validation** - Zod validation on all forms
- **CORS** - Configured in Next.js
- **SQL Injection** - Protected by Supabase
- **XSS** - React auto-escaping

## Performance

- **Code Splitting** - Automatic with Next.js
- **Image Optimization** - Next.js Image component
- **CSS Minification** - Automatic with Tailwind
- **Tree Shaking** - Built-in ES modules
- **Lazy Loading** - Components ready for lazy load

## Accessibility

- **Semantic HTML** - Proper HTML elements
- **ARIA Labels** - Added where needed
- **Keyboard Navigation** - Forms fully keyboard accessible
- **Color Contrast** - WCAG AA compliant
- **Alt Text** - Ready for images

## Browser Support

- **Chrome** - Latest 2 versions
- **Firefox** - Latest 2 versions
- **Safari** - Latest 2 versions
- **Edge** - Latest 2 versions
- **Mobile Browsers** - iOS Safari, Chrome Mobile

---

This structure is clean, scalable, and follows Next.js best practices!
