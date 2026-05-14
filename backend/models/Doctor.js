const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    department: {
      type: String,
      required: true,
      enum: ['Cardiology', 'Neurology', 'Orthopedics', 'Dermatology', 'Gynecology', 'Pediatrics', 'General Medicine'],
    },
    experience: { type: Number, required: true }, // years
    fee: { type: Number, required: true },
    rating: { type: Number, default: 4.5, min: 1, max: 5 },
    slots: {
      type: [String],
      default: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'],
    },
    available: { type: Boolean, default: true },
    qualifications: { type: String },
    about: { type: String },
    color: { type: String, default: '#0d9488' },
    initials: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Doctor', DoctorSchema);
