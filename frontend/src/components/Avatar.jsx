export const Avatar = ({ initials, color, size = 44 }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    background: color + '20', border: `2px solid ${color}40`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 700, fontSize: size * 0.3, color, flexShrink: 0,
  }}>
    {initials}
  </div>
);

export const Badge = ({ label, color, bg }) => (
  <span style={{
    fontSize: 11, fontWeight: 600, padding: '2px 8px',
    borderRadius: 20, background: bg, color, letterSpacing: 0.3,
  }}>
    {label}
  </span>
);

export const StatusBadge = ({ status }) => {
  const map = {
    Confirmed: { bg: '#dcfce7', c: '#166534' },
    Pending:   { bg: '#fef3c7', c: '#92400e' },
    Cancelled: { bg: '#fee2e2', c: '#991b1b' },
    Completed: { bg: '#dbeafe', c: '#1e40af' },
  };
  const s = map[status] || map.Pending;
  return <Badge label={status} color={s.c} bg={s.bg} />;
};
