export default function Dashboard() {
  return (
    <main style={{ fontFamily: 'sans-serif', background: '#060606', minHeight: '100vh', color: '#ffffff', display: 'flex' }}>
      
      {/* SIDEBAR */}
      <div style={{ width: '220px', background: '#0a0a0a', borderRight: '0.5px solid #222', padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ fontSize: '20px', fontWeight: 500, marginBottom: '1.5rem', padding: '0 8px' }}>Red<span style={{ color: '#2563eb' }}>Prop</span></div>
        {[
          { icon: '📊', label: 'Inicio', active: true },
          { icon: '🔍', label: 'Búsquedas', active: false },
          { icon: '👥', label: 'Clientes', active: false },
          { icon: '🏠', label: 'Propiedades', active: false },
          { icon: '📲', label: 'Fichas WhatsApp', active: false },
          { icon: '⚙️', label: 'Configuración', active: false },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 10px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', background: item.active ? '#2563eb18' : 'transparent', color: item.active ? '#2563eb' : '#b7b7b7' }}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: '2rem' }}>
        
        {/* TOPBAR */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 500 }}>Buen día 👋</h1>
            <p style={{ fontSize: '14px', color: '#b7b7b7', marginTop: '2px' }}>Estos son tus movimientos de hoy</p>
          </div>
          <button style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', padding: '9px 18px', fontSize: '14px', cursor: 'pointer' }}>+ Nueva búsqueda</button>
        </div>

        {/* MÉTRICAS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '2rem' }}>
          {[
            { label: 'Clientes activos', value: '12', sub: '+2 esta semana' },
            { label: 'Búsquedas en curso', value: '8', sub: '3 con novedad' },
            { label: 'Fichas enviadas', value: '34', sub: 'este mes' },
            { label: 'Operaciones cerradas', value: '3', sub: 'este año' },
          ].map((m, i) => (
            <div key={i} style={{ background: '#111', border: '0.5px solid #222', borderRadius: '12px', padding: '1rem 1.25rem' }}>
              <div style={{ fontSize: '12px', color: '#b7b7b7', marginBottom: '6px' }}>{m.label}</div>
              <div style={{ fontSize: '24px', fontWeight: 500 }}>{m.value}</div>
              <div style={{ fontSize: '12px', color: '#2563eb', marginTop: '4px' }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* BÚSQUEDAS ACTIVAS */}
        <div style={{ background: '#111', border: '0.5px solid #222', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 500 }}>Búsquedas activas</h2>
            <span style={{ fontSize: '13px', color: '#2563eb', cursor: 'pointer' }}>Ver todas</span>
          </div>
          {[
            { cliente: 'Sofía Ramírez', busqueda: '3 amb · Palermo · hasta USD 200k', estado: 'Activa', fichas: 3 },
            { cliente: 'Juan Gómez', busqueda: '2 amb · Caballito · hasta USD 110k', estado: 'En espera', fichas: 1 },
            { cliente: 'Laura Peralta', busqueda: 'PH · Belgrano · hasta USD 350k', estado: 'Activa', fichas: 5 },
            { cliente: 'Diego Morales', busqueda: 'Local · Flores · hasta USD 80k', estado: 'Sin novedad', fichas: 0 },
          ].map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: i < 3 ? '0.5px solid #222' : 'none' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#2563eb18', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 500, flexShrink: 0 }}>
                {b.cliente.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 500 }}>{b.cliente}</div>
                <div style={{ fontSize: '12px', color: '#b7b7b7' }}>{b.busqueda}</div>
              </div>
              <div style={{ fontSize: '11px', color: '#b7b7b7' }}>{b.fichas} fichas enviadas</div>
              <span style={{ fontSize: '11px', fontWeight: 500, padding: '3px 10px', borderRadius: '99px', background: b.estado === 'Activa' ? '#eaf3de' : b.estado === 'En espera' ? '#faeeda' : '#222', color: b.estado === 'Activa' ? '#27500A' : b.estado === 'En espera' ? '#854F0B' : '#b7b7b7' }}>
                {b.estado}
              </span>
              <button style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer' }}>
                📲 Enviar ficha
              </button>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}