import { useState, useEffect } from 'react';
import { createPatient, createAppointment } from '../api/api';
import { Avatar } from '../components/Avatar';

export default function BookPage({ selectedDoctor, setSelectedDoctor, doctors, onBook }) {
  const [doc, setDoc] = useState(selectedDoctor || doctors[0] || null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', age: '', gender: 'Male', phone: '', email: '', date: '', slot: '', reason: '' });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { if (selectedDoctor) setDoc(selectedDoctor); }, [selectedDoctor]);
  useEffect(() => { if (doctors.length && !doc) setDoc(doctors[0]); }, [doctors]);

  const upd = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const today = new Date().toISOString().split('T')[0];
  const valid1 = doc && form.name && form.age && form.phone.length >= 10 && form.email.includes('@');
  const valid2 = form.date && form.slot;

  const submit = async () => {
    setLoading(true);
    setError('');
    try {
      // 1. Create or fetch patient
      const patRes = await createPatient({
        name: form.name, email: form.email, phone: form.phone,
        age: Number(form.age), gender: form.gender,
      });
      const patientId = patRes.data.data._id;

      // 2. Create appointment
      const apptRes = await createAppointment({
        patient: patientId, doctor: doc._id,
        date: form.date, slot: form.slot,
        reason: form.reason, fee: doc.fee,
      });
      onBook(apptRes.data.data);
      setDone(true);
      setSelectedDoctor(null);
    } catch (err) {
      const msg = err.response?.data?.message || 'Booking failed. Please try again.';
      // If patient already exists, use returned ID
      if (err.response?.status === 409 && err.response?.data?.data?._id) {
        try {
          const apptRes = await createAppointment({
            patient: err.response.data.data._id, doctor: doc._id,
            date: form.date, slot: form.slot, reason: form.reason, fee: doc.fee,
          });
          onBook(apptRes.data.data);
          setDone(true);
          setSelectedDoctor(null);
        } catch (e2) {
          setError(e2.response?.data?.message || 'Slot conflict or booking error.');
        }
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setDone(false); setStep(1); setForm({ name:'',age:'',gender:'Male',phone:'',email:'',date:'',slot:'',reason:'' }); setError(''); };

  if (done) return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--green-light)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <i className="ti ti-check" style={{ fontSize: 36, color: 'var(--green)' }} />
      </div>
      <h2 style={{ fontWeight: 700, fontSize: 22, color: '#1a202c', marginBottom: 8 }}>Appointment Confirmed!</h2>
      <p style={{ color: 'var(--gray)', marginBottom: 4 }}>{doc?.name} · {form.date} · {form.slot}</p>
      <p style={{ color: 'var(--gray)', fontSize: 13, marginBottom: 28 }}>Check "My Appointments" to manage your booking.</p>
      <button onClick={reset} style={{ background: 'var(--teal)', color: '#fff', padding: '11px 28px', borderRadius: 8, fontWeight: 600 }}>
        Book Another
      </button>
    </div>
  );

  return (
    <div>
      <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 6, color: '#1a202c' }}>Book Appointment</h2>

      {/* Step indicator */}
      <div style={{ display: 'flex', marginBottom: 24, background: '#fff', borderRadius: 10, border: '1px solid var(--border)', overflow: 'hidden' }}>
        {['Patient Info', 'Select Slot', 'Confirm'].map((s, i) => (
          <div key={s} style={{
            flex: 1, padding: 12, textAlign: 'center',
            background: step === i+1 ? 'var(--teal)' : step > i+1 ? 'var(--teal-light)' : 'transparent',
            borderRight: i < 2 ? '1px solid var(--border)' : undefined,
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: step === i+1 ? '#fff' : step > i+1 ? 'var(--teal-dark)' : 'var(--gray)' }}>
              {step > i+1 && <i className="ti ti-check" style={{ marginRight: 4 }} />}Step {i+1}: {s}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div style={{ background: 'var(--red-light)', color: 'var(--red)', padding: '10px 14px', borderRadius: 8, marginBottom: 14, fontSize: 13 }}>
          <i className="ti ti-alert-circle" style={{ marginRight: 6 }} />{error}
        </div>
      )}

      {/* Step 1 */}
      {step === 1 && (
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid var(--border)' }}>
          <div style={{ marginBottom: 14 }}>
            <label>Select Doctor</label>
            <select value={doc?._id || ''} onChange={e => setDoc(doctors.find(d => d._id === e.target.value))}>
              {doctors.map(d => <option key={d._id} value={d._id}>{d.name} — {d.department}</option>)}
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div><label>Full Name *</label><input placeholder="Your full name" value={form.name} onChange={upd('name')} /></div>
            <div><label>Age *</label><input type="number" placeholder="Age" value={form.age} onChange={upd('age')} /></div>
            <div><label>Gender</label>
              <select value={form.gender} onChange={upd('gender')}>
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
            </div>
            <div><label>Phone *</label><input placeholder="10-digit mobile" value={form.phone} onChange={upd('phone')} /></div>
            <div style={{ gridColumn: '1/-1' }}><label>Email *</label><input type="email" placeholder="your@email.com" value={form.email} onChange={upd('email')} /></div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Reason for visit</label>
            <textarea rows={2} placeholder="Describe symptoms briefly..." value={form.reason} onChange={upd('reason')} style={{ resize: 'none' }} />
          </div>
          <button disabled={!valid1} onClick={() => setStep(2)} style={{ background: valid1 ? 'var(--teal)' : 'var(--border)', color: valid1 ? '#fff' : 'var(--gray)', padding: '11px 24px', borderRadius: 8, fontWeight: 600, width: '100%' }}>
            Continue →
          </button>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && doc && (
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 14, background: '#f8fafc', borderRadius: 10, marginBottom: 20 }}>
            <Avatar initials={doc.initials || doc.name.split(' ').map(w=>w[0]).join('').slice(0,2)} color={doc.color || '#0d9488'} size={48} />
            <div>
              <div style={{ fontWeight: 700, color: '#1a202c' }}>{doc.name}</div>
              <div style={{ fontSize: 13, color: 'var(--gray)' }}>{doc.department} · ₹{doc.fee} consultation fee</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div><label>Appointment Date *</label><input type="date" min={today} value={form.date} onChange={upd('date')} /></div>
            <div><label>Preferred Time *</label>
              <select value={form.slot} onChange={upd('slot')}>
                <option value="">-- Select slot --</option>
                {(doc.slots || []).map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          {form.date && form.slot && (
            <div style={{ background: 'var(--teal-light)', borderRadius: 8, padding: '10px 14px', marginBottom: 14, fontSize: 13, color: 'var(--teal-dark)' }}>
              <i className="ti ti-info-circle" style={{ marginRight: 6 }} />
              Slot <strong>{form.slot}</strong> on <strong>{form.date}</strong> is available
            </div>
          )}
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setStep(1)} style={{ flex: 1, padding: 11, borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--gray)', fontWeight: 600 }}>← Back</button>
            <button disabled={!valid2} onClick={() => setStep(3)} style={{ flex: 2, background: valid2 ? 'var(--teal)' : 'var(--border)', color: valid2 ? '#fff' : 'var(--gray)', padding: 11, borderRadius: 8, fontWeight: 600 }}>Review →</button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && doc && (
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid var(--border)' }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16, color: '#1a202c' }}>Review & Confirm</h3>
          <div style={{ background: '#f8fafc', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            {[
              { l: 'Doctor',          v: `${doc.name} (${doc.department})` },
              { l: 'Patient',         v: form.name },
              { l: 'Age / Gender',    v: `${form.age} yrs / ${form.gender}` },
              { l: 'Email',           v: form.email },
              { l: 'Phone',           v: form.phone },
              { l: 'Date',            v: form.date },
              { l: 'Time',            v: form.slot },
              { l: 'Reason',          v: form.reason || 'Not specified' },
              { l: 'Consultation Fee',v: `₹${doc.fee}` },
            ].map(r => (
              <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 13, color: 'var(--gray)' }}>{r.l}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#1a202c', textAlign: 'right', maxWidth: '60%' }}>{r.v}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setStep(2)} style={{ flex: 1, padding: 11, borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--gray)', fontWeight: 600 }}>← Back</button>
            <button onClick={submit} disabled={loading} style={{ flex: 2, background: 'var(--teal)', color: '#fff', padding: 11, borderRadius: 8, fontWeight: 700 }}>
              {loading ? <><i className="ti ti-loader-2" style={{ marginRight: 6 }} />Processing...</> : <><i className="ti ti-check" style={{ marginRight: 6 }} />Confirm Booking</>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
