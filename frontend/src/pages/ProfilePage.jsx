import { useState } from 'react';
import { Badge } from '../components/Avatar';

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: 'Ravi Kumar', email: 'ravi.kumar@email.com',
    phone: '9876543210', blood: 'B+', city: 'Bengaluru', dob: '1995-06-15',
  });
  const upd = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const initials = form.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div>
      <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 16, color: '#1a202c' }}>My Profile</h2>

      <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid var(--border)', marginBottom: 16 }}>
        {/* Avatar header */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 22, color: 'var(--teal-dark)' }}>
            {initials}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#1a202c', marginBottom: 2 }}>{form.name}</div>
            <div style={{ fontSize: 13, color: 'var(--gray)', marginBottom: 6 }}>{form.email}</div>
            <Badge label="Active Patient" color="var(--teal-dark)" bg="var(--teal-light)" />
          </div>
        </div>

        {/* Form fields */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div><label>Full Name</label><input value={form.name} onChange={upd('name')} /></div>
          <div><label>Email</label><input type="email" value={form.email} onChange={upd('email')} /></div>
          <div><label>Phone</label><input value={form.phone} onChange={upd('phone')} /></div>
          <div><label>Date of Birth</label><input type="date" value={form.dob} onChange={upd('dob')} /></div>
          <div>
            <label>Blood Group</label>
            <select value={form.blood} onChange={upd('blood')}>
              {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div><label>City</label><input value={form.city} onChange={upd('city')} /></div>
        </div>

        <button onClick={save} style={{ marginTop: 16, background: 'var(--teal)', color: '#fff', padding: '11px 24px', borderRadius: 8, fontWeight: 600, width: '100%' }}>
          {saved
            ? <><i className="ti ti-check" style={{ marginRight: 6 }} />Profile Saved!</>
            : 'Save Profile'}
        </button>
      </div>

      {/* Info cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {[
          { icon: 'ti-shield-check',    label: 'Health Insurance', val: 'Active',  c: '#16a34a', bg: '#dcfce7' },
          { icon: 'ti-file-certificate', label: 'Medical Records',  val: '3 files', c: '#1d4ed8', bg: '#dbeafe' },
          { icon: 'ti-vaccine',         label: 'Vaccinations',     val: 'Up to date', c: '#7c3aed', bg: '#f3e8ff' },
          { icon: 'ti-heart',           label: 'Health Score',     val: '82 / 100', c: '#dc2626', bg: '#fee2e2' },
        ].map(c => (
          <div key={c.label} style={{ background: '#fff', borderRadius: 12, padding: 16, border: '1px solid var(--border)', display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className={`ti ${c.icon}`} style={{ color: c.c, fontSize: 20 }} />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, color: '#1a202c' }}>{c.label}</div>
              <div style={{ fontSize: 12, color: 'var(--gray)' }}>{c.val}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
