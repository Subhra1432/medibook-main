const mongoose = require('mongoose');
require('dotenv').config();
const Doctor = require('./models/Doctor');

const doctors = [
  { name: 'Dr. Priya Sharma',  department: 'Cardiology',     experience: 12, fee: 800, rating: 4.9, initials: 'PS', color: '#7c3aed', qualifications: 'MBBS, MD (Cardiology)', about: 'Senior cardiologist with 12 years of expertise in interventional cardiology.', slots: ['09:00 AM','10:00 AM','11:00 AM','02:00 PM','04:00 PM'] },
  { name: 'Dr. Rajan Mehta',   department: 'Neurology',      experience: 9,  fee: 900, rating: 4.8, initials: 'RM', color: '#0891b2', qualifications: 'MBBS, DM (Neurology)',   about: 'Specialist in headache disorders, epilepsy, and stroke management.', slots: ['10:00 AM','11:30 AM','01:00 PM','03:00 PM'] },
  { name: 'Dr. Ananya Iyer',   department: 'Orthopedics',    experience: 15, fee: 750, rating: 4.9, initials: 'AI', color: '#059669', qualifications: 'MBBS, MS (Ortho)',         about: 'Expert in joint replacement and sports injury rehabilitation.', slots: ['09:30 AM','11:00 AM','02:30 PM','05:00 PM'] },
  { name: 'Dr. Suresh Nair',   department: 'Dermatology',    experience: 7,  fee: 600, rating: 4.7, initials: 'SN', color: '#dc2626', qualifications: 'MBBS, MD (Dermatology)', about: 'Specialist in skin disorders, cosmetic dermatology and hair loss.', slots: ['08:30 AM','10:30 AM','12:00 PM','03:30 PM'] },
  { name: 'Dr. Kavitha Reddy', department: 'Gynecology',     experience: 11, fee: 700, rating: 4.8, initials: 'KR', color: '#db2777', qualifications: 'MBBS, MS (OBG)',          about: 'Expert in women\'s health, high-risk pregnancies and laparoscopy.', slots: ['09:00 AM','10:30 AM','01:30 PM','04:00 PM'] },
  { name: 'Dr. Arjun Patel',   department: 'Pediatrics',     experience: 8,  fee: 650, rating: 4.8, initials: 'AP', color: '#d97706', qualifications: 'MBBS, MD (Pediatrics)',   about: 'Dedicated pediatrician specializing in child development and nutrition.', slots: ['08:00 AM','10:00 AM','02:00 PM','04:30 PM'] },
];

async function seed() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/medibook';
  await mongoose.connect(uri);
  await Doctor.deleteMany({});
  await Doctor.insertMany(doctors);
  console.log(`✅ Seeded ${doctors.length} doctors`);
  await mongoose.disconnect();
}

seed().catch(err => { console.error(err); process.exit(1); });
