# MediBook — Hospital Appointment Booking System
### Full Stack Mini Project | React + Node.js + MongoDB

---

## Project Structure
```
medibook/
├── backend/          ← Node.js + Express REST API
│   ├── server.js
│   ├── seed.js       ← Seed 6 doctors into DB
│   ├── models/
│   │   ├── Doctor.js
│   │   ├── Appointment.js
│   │   └── Patient.js
│   ├── routes/
│   │   ├── doctors.js
│   │   ├── appointments.js
│   │   └── patients.js
│   └── middleware/errorHandler.js
└── frontend/         ← React + Vite SPA
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── api/api.js
        ├── components/
        │   ├── Sidebar.jsx
        │   └── Avatar.jsx
        └── pages/
            ├── HomePage.jsx
            ├── DoctorsPage.jsx
            ├── BookPage.jsx
            ├── AppointmentsPage.jsx
            └── ProfilePage.jsx
```

---

## Prerequisites
- Node.js v18+
- MongoDB (local) OR MongoDB Atlas (free cloud)
- npm

---

## Setup & Run

### 1. Backend
```bash
cd backend
npm install

# Copy env file and edit
cp .env.example .env
# Edit .env → set MONGO_URI if using Atlas

# Seed the database with 6 doctors
npm run seed

# Start the server
npm run dev        # development (nodemon)
# or
npm start          # production
```
Server runs at: http://localhost:5000

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
App runs at: http://localhost:3000

---

## API Endpoints

| Method | Endpoint                        | Description              |
|--------|---------------------------------|--------------------------|
| GET    | /api/doctors                    | List all doctors         |
| GET    | /api/doctors?department=Cardio  | Filter by department     |
| GET    | /api/doctors/:id                | Get single doctor        |
| POST   | /api/doctors                    | Add a doctor             |
| PUT    | /api/doctors/:id                | Update doctor            |
| DELETE | /api/doctors/:id                | Delete doctor            |
| GET    | /api/appointments               | List all appointments    |
| POST   | /api/appointments               | Book appointment         |
| PATCH  | /api/appointments/:id/status    | Update status (cancel)   |
| DELETE | /api/appointments/:id           | Delete appointment       |
| GET    | /api/patients                   | List all patients        |
| POST   | /api/patients                   | Register patient         |
| PUT    | /api/patients/:id               | Update patient profile   |

---

## Features
- Browse & search doctors by department
- 3-step appointment booking form
- Slot conflict detection (backend)
- View & cancel appointments
- Patient profile management
- MongoDB data persistence
- RESTful API with proper status codes

---

## Course Outcomes Addressed
| CO | How |
|----|-----|
| CO1 | React SPA with responsive UI, component-based architecture |
| CO2 | RESTful Express API integrated with MongoDB via Mongoose |
| CO3 | Deployable via Vercel (frontend) + Railway/Render (backend) |
| CO4 | Progressive Web App ready (Vite PWA plugin can be added) |
| CO5 | Input validation, error handling, slot conflict prevention |

---

## Deployment (Optional)

### Frontend → Vercel
```bash
cd frontend
npm run build
# Upload dist/ to Vercel or use `vercel` CLI
```

### Backend → Render / Railway
- Set environment variables: `MONGO_URI`, `PORT`
- Start command: `node server.js`
- Update frontend `vite.config.js` proxy to point to deployed backend URL
