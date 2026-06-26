'use client'
import { useState } from 'react'

const AGENTE = {
  nombre: 'Martín López',
  telefono: '5491144556677',
  whatsapp: '5491144556677',
}

export default function Dashboard() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [clientes, setClientes] = useState([
    { cliente: 'Sofía Ramírez', busqueda: '3 amb · Palermo · hasta USD 200k', estado: 'Activa', fichas: 3, telefono: '5491155667788' },
    { cliente: 'Juan Gómez', busqueda: '2 amb · Caballito · hasta USD 110k', estado: 'En espera', fichas: 1, telefono: '5491166778899' },
    { cliente: 'Laura Peralta', busqueda: 'PH · Belgrano · hasta USD 350k', estado: 'Activa', fichas: 5, telefono: '5491177889900' },
    { cliente: 'Diego Morales', busqueda: 'Local · Flores · hasta USD 80k', estado: 'Sin novedad', fichas: 0, telefono: '5491188990011' },
  ])
  const [form, setForm] = useState({ cliente: '', telefono: '', tipo: '', zona: '', presupuesto: '', ambientes: '', notas: '' })
  const [mostrarFicha, setMostrarFicha] = useState(false)
  const [clienteSeleccionado, setClienteSeleccionado] = useState<any>(null)

  function guardarBusqueda() {
    if (!form.cliente) return
    setClientes([...clientes, {
      cliente: form.cliente,
      busqueda: `${form.ambientes} amb · ${form.zona} · hasta USD ${form.presupuesto}`,
      estado: 'Activa',
      fichas: 0,
      telefono: form.telefono,
    }])
    setForm({ cliente: '', telefono: '', tipo: '', zona: '', presupuesto: '', ambientes: '', notas: '' })
    setMostrarFormulario(false)
  }

  function abrirFicha(cliente: any) {
    setClienteSeleccionado(cliente)
    setMostrarFicha(true)
  }

  function enviarWhatsApp() {
    if (!clienteSeleccionado) return
    const mensaje = `🏠 *RedProp — Ficha de búsqueda*

Hola ${clienteSeleccionado.cliente}! Te comparto propiedades según tu búsqueda:

📋 *Tu búsqueda:* ${clienteSeleccionado.busqueda}

🏢 *Propiedad sugerida:*
- Tipo: Departamento 3 ambientes
- Zona: Palermo
- Precio: USD 185.000
- Superficie: 78 m²
- Cochera incluida

👤 *Tu agente:*
- ${AGENTE.nombre}
- 📞 +${AGENTE.telefono}

Cualquier consulta estoy a disposición 🙌`

    const url = `https://wa.me/${clienteSeleccionado.telefono}?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
    setMostrarFicha(false)
  }

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
          <button onClick={() => setMostrarFormulario(true)} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', padding: '9px 18px', fontSize: '14px', cursor: 'pointer' }}>+ Nueva búsqueda</button>
        </div>

        {/* MÉTRICAS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '2rem' }}>
          {[
            { label: 'Clientes activos', value: clientes.length.toString(), sub: 'en seguimiento' },
            { label: 'Búsquedas en curso', value: clientes.filter(c => c.estado === 'Activa').length.toString(), sub: 'activas ahora' },
            { label: 'Fichas enviadas', value: clientes.reduce((a, c) => a + c.fichas, 0).toString(), sub: 'en total' },
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
        <div style={{ background: '#111', border: '0.5px solid #222', borderRadius: '12px', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 500 }}>Búsquedas activas</h2>
            <span style={{ fontSize: '13px', color: '#2563eb', cursor: 'pointer' }}>Ver todas</span>
          </div>
          {clientes.map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: i < clientes.length - 1 ? '0.5px solid #222' : 'none' }}>
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
              <button onClick={() => abrirFicha(b)} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer' }}>
                📲 Enviar ficha
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL NUEVA BÚSQUEDA */}
      {mostrarFormulario && (
        <div style={{ position: 'fixed', inset: 0, background: '#000000aa', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#111', border: '0.5px solid #222', borderRadius: '16px', padding: '2rem', width: '480px', maxWidth: '90vw' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 500 }}>Nueva búsqueda</h2>
              <button onClick={() => setMostrarFormulario(false)} style={{ background: 'transparent', border: 'none', color: '#b7b7b7', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>
            {[
              { label: 'Nombre del cliente', key: 'cliente', placeholder: 'Ej: Sofía Ramírez' },
              { label: 'Teléfono WhatsApp (con código de país)', key: 'telefono', placeholder: 'Ej: 5491155667788' },
              { label: 'Tipo de propiedad', key: 'tipo', placeholder: 'Ej: Departamento, PH, Casa' },
              { label: 'Zona preferida', key: 'zona', placeholder: 'Ej: Palermo, Caballito' },
              { label: 'Presupuesto máximo (USD)', key: 'presupuesto', placeholder: 'Ej: 200000' },
              { label: 'Ambientes', key: 'ambientes', placeholder: 'Ej: 2, 3' },
              { label: 'Notas adicionales', key: 'notas', placeholder: 'Cochera, balcón, piso alto...' },
            ].map((field) => (
              <div key={field.key} style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '13px', color: '#b7b7b7', display: 'block', marginBottom: '6px' }}>{field.label}</label>
                <input
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                  style={{ width: '100%', padding: '10px 14px', background: '#060606', border: '0.5px solid #333', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            ))}
            <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
              <button onClick={() => setMostrarFormulario(false)} style={{ flex: 1, padding: '11px', background: 'transparent', border: '0.5px solid #333', borderRadius: '8px', color: '#b7b7b7', fontSize: '14px', cursor: 'pointer' }}>Cancelar</button>
              <button onClick={guardarBusqueda} style={{ flex: 1, padding: '11px', background: '#2563eb', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '14px', cursor: 'pointer', fontWeight: 500 }}>Guardar búsqueda</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL FICHA WHATSAPP */}
      {mostrarFicha && clienteSeleccionado && (
        <div style={{ position: 'fixed', inset: 0, background: '#000000aa', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#111', border: '0.5px solid #222', borderRadius: '16px', padding: '2rem', width: '480px', maxWidth: '90vw' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 500 }}>📲 Ficha para WhatsApp</h2>
              <button onClick={() => setMostrarFicha(false)} style={{ background: 'transparent', border: 'none', color: '#b7b7b7', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ background: '#060606', border: '0.5px solid #333', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem', fontSize: '13px', color: '#b7b7b7', lineHeight: 1.8 }}>
              <p>🏠 <strong style={{ color: '#fff' }}>RedProp — Ficha de búsqueda</strong></p>
              <br />
              <p>Hola <strong style={{ color: '#fff' }}>{clienteSeleccionado.cliente}</strong>! Te comparto propiedades según tu búsqueda:</p>
              <br />
              <p>📋 <strong style={{ color: '#fff' }}>Tu búsqueda:</strong> {clienteSeleccionado.busqueda}</p>
              <br />
              <p>🏢 <strong style={{ color: '#fff' }}>Propiedad sugerida:</strong></p>
              <p>• Tipo: Departamento 3 ambientes</p>
              <p>• Zona: Palermo</p>
              <p>• Precio: USD 185.000</p>
              <p>• Superficie: 78 m²</p>
              <p>• Cochera incluida</p>
              <br />
              <p>👤 <strong style={{ color: '#fff' }}>Tu agente:</strong></p>
              <p>• {AGENTE.nombre}</p>
              <p>• 📞 +{AGENTE.telefono}</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setMostrarFicha(false)} style={{ flex: 1, padding: '11px', background: 'transparent', border: '0.5px solid #333', borderRadius: '8px', color: '#b7b7b7', fontSize: '14px', cursor: 'pointer' }}>Cancelar</button>
              <button onClick={enviarWhatsApp} style={{ flex: 1, padding: '11px', background: '#25D366', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '14px', cursor: 'pointer', fontWeight: 500 }}>
                Abrir WhatsApp 📲
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  )
}