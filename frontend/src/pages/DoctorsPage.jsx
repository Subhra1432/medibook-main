import { useState } from 'react';
import { Avatar, Badge } from '../components/Avatar';

const DEPTS = ['All','Cardiology','Neurology','Orthopedics','Dermatology','Gynecology','Pediatrics'];

export default function DoctorsPage({ setPage, setSelectedDoctor, doctors }) {
  const [dept, setDept] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = doctors.filter(d =>
    (dept === 'All' || d.department === dept) &&
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 16, color: '#1a202c' }}>Our Specialists</h2>

      {/* Search + filter */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <i className="ti ti-search" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)', fontSize: 16 }} />
          <input placeholder="Search doctor name..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36 }} />
        </div>
        <select value={dept} onChange={e => setDept(e.target.value)} style={{ width: 170 }}>
          {DEPTS.map(d => <option key={d}>{d}</option>)}
        </select>
      </div>

      {/* Dept pills */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {DEPTS.map(d => (
          <button key={d} onClick={() => setDept(d)} style={{
            padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
            background: dept === d ? 'var(--teal)' : '#fff',
            color: dept === d ? '#fff' : 'var(--gray)',
            border: `1px solid ${dept === d ? 'var(--teal)' : 'var(--border)'}`,
          }}>{d}</button>
        ))}
      </div>

      {/* Doctor cards */}
      <div style={{ display: 'grid', gap: 12 }}>
        {filtered.map(d => (
          <div key={d._id} style={{ background: '#fff', borderRadius: 12, padding: 18, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', display: 'flex', gap: 16, alignItems: 'center' }}>
            <Avatar initials={d.initials || d.name.split(' ').map(w=>w[0]).join('').slice(0,2)} color={d.color || '#0d9488'} size={56} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#1a202c' }}>{d.name}</div>
              <div style={{ fontSize: 13, color: 'var(--gray)', marginBottom: 8 }}>{d.department} · {d.experience} yrs experience</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Badge label={`₹${d.fee} fee`} color="#374151" bg="#f3f4f6" />
                <Badge label={`${d.slots?.length || 0} slots`} color="var(--teal-dark)" bg="var(--teal-light)" />
                <Badge label={`⭐ ${d.rating}`} color="#92400e" bg="#fef3c7" />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button
                onClick={() => { setSelectedDoctor(d); setPage('book'); }}
                style={{ background: 'var(--teal)', color: '#fff', padding: '10px 18px', borderRadius: 8, fontWeight: 600 }}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--gray)', padding: 40, background: '#fff', borderRadius: 12 }}>
            <i className="ti ti-mood-empty" style={{ fontSize: 32, display: 'block', marginBottom: 8 }} />No doctors found
          </div>
        )}
      </div>
    </div>
  );
}
