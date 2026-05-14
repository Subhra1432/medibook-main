import { Avatar, Badge } from '../components/Avatar';

const STATS = [
  { icon: 'ti-stethoscope',    label: 'Specialists',  value: '25+',  color: '#7c3aed', bg: '#f3e8ff' },
  { icon: 'ti-calendar-check', label: 'Appointments', value: '1.2K', color: '#0891b2', bg: '#e0f2fe' },
  { icon: 'ti-star',           label: 'Avg Rating',   value: '4.8',  color: '#d97706', bg: '#fef3c7' },
  { icon: 'ti-clock',          label: '24/7 Support', value: 'Yes',  color: '#16a34a', bg: '#dcfce7' },
];

export default function HomePage({ setPage, setSelectedDoctor, doctors }) {
  return (
    <div>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0d9488, #0f766e)',
        borderRadius: 16, padding: '28px 28px', marginBottom: 24,
        color: '#fff', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -20, top: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,.08)' }} />
        <div style={{ position: 'absolute', right: 60, bottom: -30, width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,.06)' }} />
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, opacity: .8, marginBottom: 6, textTransform: 'uppercase' }}>Welcome Back 👋</div>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Your Health, Our Priority</h2>
        <p style={{ fontSize: 13, opacity: .85, marginBottom: 20 }}>Book appointments with top specialists in seconds.</p>
        <button
          onClick={() => setPage('book')}
          style={{ background: '#fff', color: 'var(--teal-dark)', padding: '10px 22px', borderRadius: 8, fontWeight: 700, fontSize: 13 }}
        >
          <i className="ti ti-calendar-plus" style={{ marginRight: 6 }} />Book Appointment
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 24 }}>
        {STATS.map(s => (
          <div key={s.label} style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
              <i className={`ti ${s.icon}`} style={{ color: s.color, fontSize: 18 }} />
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#1a202c' }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--gray)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Featured doctors */}
      <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 14, color: '#1a202c' }}>Featured Doctors</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {doctors.slice(0, 4).map(d => (
          <div key={d._id} style={{ background: '#fff', borderRadius: 12, padding: 16, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', display: 'flex', gap: 12, alignItems: 'center' }}>
            <Avatar initials={d.initials || d.name.split(' ').map(w=>w[0]).join('').slice(0,2)} color={d.color || '#0d9488'} size={48} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#1a202c', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</div>
              <div style={{ fontSize: 12, color: 'var(--gray)', marginBottom: 6 }}>{d.department} · {d.experience} yrs</div>
              <button
                onClick={() => { setSelectedDoctor(d); setPage('book'); }}
                style={{ background: 'var(--teal-light)', color: 'var(--teal-dark)', padding: '5px 12px', borderRadius: 6, fontWeight: 600, fontSize: 12 }}
              >
                Book
              </button>
            </div>
          </div>
        ))}
        {doctors.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--gray)', padding: 40 }}>
            <i className="ti ti-loader" style={{ fontSize: 24, display: 'block', marginBottom: 8 }} />Loading doctors...
          </div>
        )}
      </div>
    </div>
  );
}
