# 🛠️ Kaam Karao — On-Demand Verified Labor Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.0.0-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.1-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20v6-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![Lucide Icons](https://img.shields.io/badge/Lucide-React-F59E0B?style=flat)](https://lucide.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Kaam Karao** is a digital labor dispatch and home services marketplace tailored for Indian cities (Rewa, Indore, Bhopal, etc.). It connects homeowners and businesses with police-verified tradesmen (plumbers, electricians, carpenters, painters, masons) and daily wage helpers with upfront flat rates and a guaranteed 30-minute doorstep dispatch.

---

## 📑 Table of Contents
1. [Working Flow Structure](#-working-flow-structure)
2. [What Was Implemented & Upgraded](#-what-was-implemented--upgraded)
3. [System Architecture](#-system-architecture)
4. [Tech Stack](#-tech-stack)
5. [Project Directory Structure](#-project-directory-structure)
6. [Database Schema](#-database-schema)
7. [API Endpoints Reference](#-api-endpoints-reference)
8. [Installation & Setup](#-installation--setup)
9. [Key Engineering Fixes](#-key-engineering-fixes)

---

## 🔄 Working Flow Structure

The platform operates across three interconnected lifecycles: **Customer Flow**, **Dispatch & Admin Flow**, and **Worker Execution Flow**.

```
                           ┌──────────────────────────┐
                           │   Customer visits Site   │
                           │     (Home / Services)    │
                           └─────────────┬────────────┘
                                         │
                         Selects Trade or Calculates Cost
                                         │
                           ┌─────────────▼────────────┐
                           │    Fills Booking Form    │
                           │ (/bookings?service=...)  │
                           └─────────────┬────────────┘
                                         │
                       Submits Address, Phone & Urgency
                                         │
                           ┌─────────────▼────────────┐
                           │   POST /api/bookings     │
                           │ (Stores doc in MongoDB)  │
                           └─────────────┬────────────┘
                                         │
             ┌───────────────────────────┴───────────────────────────┐
             │                                                       │
             ▼                                                       ▼
┌──────────────────────────┐                           ┌──────────────────────────┐
│  Live Tracking Page      │                           │  Admin Command Center    │
│  /bookings/[id]          │                           │  /admin                  │
├──────────────────────────┤                           ├──────────────────────────┤
│ • Status: Requested      │                           │ • Real-time Order Alert  │
│ • Progress Bar (0%->100%)│                           │ • View Full Details      │
│ • Direct Helpline CTA    │                           │ • Status Dropdown Toggle │
└────────────┬─────────────┘                           └─────────────┬────────────┘
             │                                                       │
             │       Admin updates status (PUT /api/bookings/:id)    │
             └───────────────────────◄───────────────────────────────┘
                                     │
           ┌─────────────────────────┴─────────────────────────┐
           │                                                   │
           ▼                                                   ▼
┌──────────────────────────┐                       ┌──────────────────────────┐
│   Status: In Progress    │                       │    Status: Completed     │
├──────────────────────────┤                       ├──────────────────────────┤
│ Worker arrived at site   │                       │ Customer inspects & pays │
│ Active repair/lifting    │                       │ 7-Day Warranty initiated │
└──────────────────────────┘                       └──────────────────────────┘
```

### Detailed Flow Explanation:
1. **Discovery & Estimation**: Customer browses `/` or `/services`, filters by category, or uses the interactive labor cost slider to calculate price estimates upfront.
2. **Booking Submission**: Customer selects trade (Plumbing, Electrical, Carpentry, Painting, Masonry, Helper), enters contact details, address, preferred date, and time slot.
3. **Database Insertion**: Order is validated and inserted into MongoDB Atlas `bookings` collection with `Pending` status.
4. **Instant Tracking**: Customer is automatically redirected to `/bookings/:id` with real-time visual progress markers.
5. **Admin Dispatching**: Dispatcher on `/admin` reviews order, contacts customer, matches the nearest worker within 5 km, and updates status to `In Progress` or `Completed`.
6. **Completion & Warranty**: Customer inspects the work, pays the worker directly via Cash/UPI, and receives a 7-day workmanship warranty.

---

## 🚀 What Was Implemented & Upgraded

### 1. Architectural & Routing Fixes
- **App Router Restructuring**: Fixed misplaced auth route handlers (`login.js` and `signup.js`) into correct Next.js App Router conventions:
  - `src/app/api/auth/login/route.js`
  - `src/app/api/auth/signup/route.js`
- **Case-Insensitive Admin Route**: Normalized `src/app/Admin` to lowercase `src/app/admin` with Next.js dynamic routing support.
- **RESTful DELETE Endpoint**: Implemented `DELETE /api/bookings/[id]` so dispatchers can remove test/canceled entries.
- **Next.js 14 Dynamic Params**: Migrated all route handlers and pages from raw `params.id` to `await context.params` to ensure compatibility across Next.js 14 and 15.

### 2. Windows Node.js & MongoDB Atlas DNS Fix
- **Root Cause**: Node.js v20+ / v26 on Windows c-ares resolver fails on `mongodb+srv://...` SRV records (`querySrv ECONNREFUSED`).
- **Solution**:
  1. Resolved exact cluster replica-set hosts (`cluster0-shard-00-00.a04kx.mongodb.net`, etc.).
  2. Configured direct standard MongoDB connection string in `.env` and `src/lib/mongodb.js`.
  3. Added Google DNS fallback (`8.8.8.8`) in Node's resolver.
  4. Switched from opening/closing client per request to standard singleton connection pooling (`clientPromise`).

### 3. Complete UI & Content Transformation
- **Glassmorphic Navbar**: Emergency helpline bar (`+91 87702 23682`), verified badges, and mobile drawer.
- **High-Converting Landing Page (`/`)**:
  - Hero banner with glow effects and live metrics (5,000+ jobs, 4.9★ rating).
  - Interactive cost estimator slider for instant labor rate calculations.
  - 6 popular trade cards with standard starting rates.
  - 3-step visual guide & traditional chowk vs Kaam Karao comparison table.
  - Real customer testimonials with star ratings.
- **Rich Services Catalog (`/services`)**:
  - Live search bar and category filters (Repairs, Finishing, Daily Labor).
  - High-res photography, turnaround badges, included checklists, and direct pre-filled booking buttons.
- **Dynamic 4-Step Booking System (`/bookings`)**:
  - Contact inputs, trade selector, labor headcount, date picker, and urgency flags.
  - Live real-time price estimation calculator.
  - Deep-link support: `/bookings?type=skilled&skill=Plumbing` pre-selects the form automatically.
- **Order Tracking Screen (`/bookings/[id]`)**:
  - Order confirmation card with 4-stage visual progress timeline.
  - Complete work and customer details with direct dispatch telephone hotline.
- **Admin Command Center (`/admin`)**:
  - 5 KPI metric tiles: Total Bookings, Pending Action, In Progress, Completed, Headcount.
  - Real-time search across names, phone numbers, locations, and skills.
  - Filter pills by status and worker type.
  - Full details modal with one-click "Call Customer" trigger.
  - In-place status dropdowns with live database synchronization.
  - Delete booking capability with confirmation safeguard.
- **Supporting Pages**:
  - **About Us (`/about`)**: Company story, mission of dignity of labor, 4 core pillars, and impact numbers.
  - **Interactive FAQs (`/faq`)**: Category-filtered accordion with search filter.
  - **Contact Us (`/contact`)**: Split layout with office locations and interactive message submission.
  - **Auth (`/login` & `/signup`)**: Modern dark aesthetic with role selection and password eye toggles.

---

## 💻 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 14.2.5](https://nextjs.org/) (App Router, Server Components & Route Handlers) |
| **Frontend** | [React 18](https://react.dev/), [Tailwind CSS 3.4](https://tailwindcss.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/atlas) with MongoDB Node Driver v6 |
| **Security & Auth** | JSON Web Tokens (`jsonwebtoken`), Password Hashing (`bcryptjs`) |
| **Deployment** | Vercel / Node.js Standalone / Docker |

---

## 📂 Project Directory Structure

```text
C:\Users\bramh\Kaam-Karao\
├── public/                       # Static public assets (SVGs, icons)
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.js           # About Us story, values & impact metrics
│   │   ├── admin/
│   │   │   └── page.js           # Admin Dispatch Command Center & KPIs
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   └── route.js  # POST: Login & JWT token generation
│   │   │   │   └── signup/
│   │   │   │       └── route.js  # POST: User / Admin registration
│   │   │   └── bookings/
│   │   │       ├── route.js      # GET: All bookings, POST: Create booking
│   │   │       └── [id]/
│   │   │           └── route.js  # PUT/PATCH: Update status, DELETE: Remove
│   │   ├── bookings/
│   │   │   ├── page.js           # Booking page shell (Suspense wrapped)
│   │   │   ├── form.js           # 4-Step Booking form with live calculator
│   │   │   └── [id]/
│   │   │       └── page.js       # Live Order Status Tracking screen
│   │   ├── contact/
│   │   │   └── page.js           # Office channels & interactive inquiry form
│   │   ├── faq/
│   │   │   └── page.js           # Searchable accordion FAQ catalog
│   │   ├── home/
│   │   │   └── page.js           # Redirects cleanly to root (/)
│   │   ├── login/
│   │   │   └── page.js           # Sign in interface
│   │   ├── services/
│   │   │   └── page.js           # Searchable services catalog with rates
│   │   ├── signup/
│   │   │   └── page.js           # Account creation interface
│   │   ├── globals.css           # Custom scrollbar, animations & dark theme
│   │   ├── layout.js             # Root layout with metadata, Navbar & Footer
│   │   └── page.js               # Landing page with hero, calculator & reviews
│   ├── components/
│   │   ├── Navbar.js             # Responsive header with mobile drawer
│   │   ├── Footer.js             # 5-Column footer with warranty guarantee
│   │   ├── HeroSection.js        # Reusable hero banner component
│   │   ├── ServiceCard.js        # Reusable service preview card
│   │   └── TestimonialCard.js    # Reusable customer review card
│   └── lib/
│       └── mongodb.js            # MongoDB Atlas connection pool & DNS fix
├── .env                          # Environment variables (MongoDB URI, secrets)
├── package.json                  # Dependencies & scripts
├── start.bat                     # 1-Click Windows launch script
└── README.md                     # Documentation
```

---

## 🗄️ Database Schema

### 1. `bookings` Collection
```json
{
  "_id": "ObjectId('6afd3c19d005be53cad5bba4')",
  "customerName": "Ramesh Kumar",
  "phone": "9876543210",
  "location": "Plot 14, Civil Lines, Rewa, MP",
  "workerType": "skilled",
  "selectedSkill": "Plumbing",
  "quantity": 1,
  "workDescription": "Kitchen sink pipe leakage repair",
  "urgency": "Standard",
  "bookingDate": "2026-11-18",
  "timeSlot": "Morning (8 AM - 12 PM)",
  "estimatedPrice": 298,
  "status": "Pending",
  "createdAt": "2026-11-18T05:48:07.000Z"
}
```

### 2. `users` Collection
```json
{
  "_id": "ObjectId('6afd39fad363d5e036d5f074')",
  "email": "admin@kaamkarao.com",
  "password": "$2a$10$hashed_bcrypt_password_string",
  "role": "admin",
  "createdAt": "2026-11-18T05:38:52.000Z"
}
```

---

## 🌐 API Endpoints Reference

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/bookings` | Fetch all bookings sorted by newest first | *None* |
| `POST` | `/api/bookings` | Create a new customer booking | `{ customerName, phone, location, workerType, selectedSkill, quantity, workDescription, bookingDate, timeSlot, urgency, estimatedPrice }` |
| `PUT` | `/api/bookings/:id` | Update status (`Pending`, `In Progress`, `Completed`, `Canceled`) | `{ status: "Completed" }` |
| `DELETE`| `/api/bookings/:id` | Permanently remove a booking | *None* |
| `POST` | `/api/auth/signup` | Create an admin, user, or worker account | `{ email, password, role }` |
| `POST` | `/api/auth/login` | Authenticate credentials & return JWT | `{ email, password }` |

---

## ⚙️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) v18.0.0 or higher
- [Git](https://git-scm.com/)
- Active internet connection for MongoDB Atlas

### 1. Clone & Enter Project
```bash
git clone https://github.com/neerajyadavrewa/Kaam-Karao.git
cd Kaam-Karao
```

### 2. Configure `.env` File
Create or verify `.env` in the root folder:
```env
MONGODB_URI=mongodb://neeraj:neeraj@cluster0-shard-00-00.a04kx.mongodb.net:27017,cluster0-shard-00-01.a04kx.mongodb.net:27017,cluster0-shard-00-02.a04kx.mongodb.net:27017/?ssl=true&replicaSet=atlas-9qtz3f-shard-0&authSource=admin
DB_NAME=booking-system
JWT_SECRET=kaam_karao_secret_jwt_key_2026
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 5. Windows 1-Click Startup
You can double-click **`start.bat`** in the project folder to start the server immediately.

---

## 🔧 Key Engineering Fixes

1. **SRV DNS Failure Solved**:
   Resolved `querySrv ECONNREFUSED` by bypassing Node c-ares SRV lookup with direct replica set shard nodes (`cluster0-shard-00-00..02`) and Google DNS (`8.8.8.8`).
2. **Next.js App Router Structure**:
   Organized auth handlers into proper nested folders with `route.js` and normalized `admin` route casing.
3. **Database Topology Connection Pooling**:
   Eliminated `client.close()` inside route handlers, ensuring shared client connection caching via `global._mongoClientPromise`.
4. **Missing Packages**:
   Installed `bcryptjs`, `jsonwebtoken`, and `lucide-react` for security and modern UI presentation.

---

## 👥 Authors & Contribution
- **Original Repository**: [neerajyadavrewa/Kaam-Karao](https://github.com/neerajyadavrewa/Kaam-Karao.git)
- **Enhanced by**: AI Support Team for Kaam Karao Platform
- **License**: MIT
