const NAV = [
  { id: 'home',         icon: 'ti-home',            label: 'Home' },
  { id: 'doctors',      icon: 'ti-stethoscope',      label: 'Doctors' },
  { id: 'book',         icon: 'ti-calendar-plus',    label: 'Book' },
  { id: 'appointments', icon: 'ti-clipboard-list',   label: 'My Appointments' },
  { id: 'profile',      icon: 'ti-user',             label: 'Profile' },
];

export default function Sidebar({ page, setPage, apptCount }) {
  return (
    <div style={{
      width: 210, background: '#fff', borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column', minHeight: '100vh',
      padding: '0 0 20px', position: 'fixed', left: 0, top: 0, zIndex: 10,
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 8, background: 'var(--teal)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <i className="ti ti-heart-rate-monitor" style={{ color: '#fff', fontSize: 19 }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#1a202c' }}>MediBook</div>
            <div style={{ fontSize: 10, color: 'var(--gray)' }}>Health Portal</div>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV.map(n => (
          <button
            key={n.id}
            onClick={() => setPage(n.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 8,
              background: page === n.id ? 'var(--teal-light)' : 'transparent',
              color: page === n.id ? 'var(--teal-dark)' : '#6b7280',
              fontWeight: page === n.id ? 600 : 400,
              width: '100%', textAlign: 'left', border: 'none',
            }}
          >
            <i className={`ti ${n.icon}`} style={{ fontSize: 18 }} />
            {n.label}
            {n.id === 'appointments' && apptCount > 0 && (
              <span style={{
                marginLeft: 'auto', background: 'var(--teal)', color: '#fff',
                borderRadius: 20, fontSize: 10, fontWeight: 700, padding: '1px 6px',
              }}>{apptCount}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Emergency */}
      <div style={{ padding: '0 10px' }}>
        <div style={{ background: 'var(--teal-light)', borderRadius: 10, padding: 12, fontSize: 12 }}>
          <i className="ti ti-phone" style={{ color: 'var(--teal)', fontSize: 16 }} />
          <div style={{ fontWeight: 600, color: 'var(--teal-dark)', marginTop: 4 }}>Emergency</div>
          <div style={{ color: 'var(--teal-dark)', fontWeight: 700, fontSize: 18 }}>108</div>
        </div>
      </div>
    </div>
  );
}
