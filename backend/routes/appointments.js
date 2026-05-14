const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// GET /api/appointments — all appointments (optionally filter by patient or doctor)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.patient) filter.patient = req.query.patient;
    if (req.query.doctor) filter.doctor = req.query.doctor;
    if (req.query.status) filter.status = req.query.status;

    const appointments = await Appointment.find(filter)
      .populate('doctor', 'name department fee color initials')
      .populate('patient', 'name phone age gender')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: appointments.length, data: appointments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/appointments/:id
router.get('/:id', async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id)
      .populate('doctor')
      .populate('patient');
    if (!appt) return res.status(404).json({ success: false, message: 'Appointment not found' });
    res.json({ success: true, data: appt });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/appointments — create new appointment
router.post('/', async (req, res) => {
  try {
    const { patient, doctor, date, slot, reason, fee } = req.body;

    // Check for slot conflict
    const conflict = await Appointment.findOne({
      doctor,
      date,
      slot,
      status: { $in: ['Confirmed', 'Pending'] },
    });
    if (conflict) {
      return res.status(409).json({ success: false, message: 'This slot is already booked' });
    }

    const appointment = await Appointment.create({ patient, doctor, date, slot, reason, fee });
    const populated = await appointment.populate(['doctor', 'patient']);
    res.status(201).json({ success: true, data: populated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PATCH /api/appointments/:id/status — update status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const appt = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate(['doctor', 'patient']);
    if (!appt) return res.status(404).json({ success: false, message: 'Appointment not found' });
    res.json({ success: true, data: appt });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/appointments/:id
router.delete('/:id', async (req, res) => {
  try {
    const appt = await Appointment.findByIdAndDelete(req.params.id);
    if (!appt) return res.status(404).json({ success: false, message: 'Appointment not found' });
    res.json({ success: true, message: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
