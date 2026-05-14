import { Avatar, StatusBadge } from '../components/Avatar';
import { cancelAppointment } from '../api/api';

export default function AppointmentsPage({ appointments, setAppointments }) {
  const cancel = async (id) => {
    try {
      await cancelAppointment(id);
      setAppointments(prev => prev.map(a => a._id === id ? { ...a, status: 'Cancelled' } : a));
    } catch {
      setAppointments(prev => prev.map(a => a._id === id ? { ...a, status: 'Cancelled' } : a));
    }
  };

  if (appointments.length === 0) return (
    <div style={{ textAlign: 'center', padding: '70px 20px', color: 'var(--gray)' }}>
      <i className="ti ti-calendar-off" style={{ fontSize: 52, display: 'block', marginBottom: 12 }} />
      <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>No appointments yet</div>
      <div style={{ fontSize: 13 }}>Book your first appointment to see it here</div>
    </div>
  );

  return (
    <div>
      <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 16, color: '#1a202c' }}>My Appointments</h2>
      <div style={{ display: 'grid', gap: 12 }}>
        {[...appointments].reverse().map(a => {
          const doc = a.doctor || {};
          const pat = a.patient || {};
          const initials = doc.initials || (doc.name || '??').split(' ').map(w=>w[0]).join('').slice(0,2);
          return (
            <div key={a._id} style={{ background: '#fff', borderRadius: 12, padding: 18, border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <Avatar initials={initials} color={doc.color || '#0d9488'} size={44} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#1a202c' }}>{doc.name || 'Doctor'}</div>
                    <div style={{ fontSize: 12, color: 'var(--gray)' }}>{doc.department || ''}</div>
                  </div>
                </div>
                <StatusBadge status={a.status} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
                {[
                  { icon: 'ti-user',     v: pat.name || a.patient },
                  { icon: 'ti-calendar', v: a.date },
                  { icon: 'ti-clock',    v: a.slot },
                ].map(r => (
                  <div key={r.icon} style={{ background: '#f8fafc', borderRadius: 8, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <i className={`ti ${r.icon}`} style={{ color: 'var(--teal)', fontSize: 15 }} />
                    <span style={{ fontSize: 12, color: '#374151', fontWeight: 500 }}>{r.v}</span>
                  </div>
                ))}
              </div>

              {a.reason && (
                <div style={{ fontSize: 12, color: 'var(--gray)', marginBottom: 10, padding: '8px 12px', background: '#f8fafc', borderRadius: 6, borderLeft: '3px solid var(--teal)' }}>
                  <strong>Reason:</strong> {a.reason}
                </div>
              )}

              {a.status === 'Confirmed' && (
                <button
                  onClick={() => cancel(a._id)}
                  style={{ background: 'var(--red-light)', color: 'var(--red)', padding: '7px 16px', borderRadius: 7, fontWeight: 600, fontSize: 12, border: '1px solid #fecaca' }}
                >
                  Cancel Appointment
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
