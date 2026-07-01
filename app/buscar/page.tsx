'use client'
import { useState } from 'react'

export default function Buscar() {
  const [form, setForm] = useState({ zona: '', ambientes: '', tipo: 'departamento', presupuesto: '' })
  const [resultados, setResultados] = useState<any[]>([])
  const [buscando, setBuscando] = useState(false)
  const [seleccionadas, setSeleccionadas] = useState<any[]>([])

  async function buscar() {
    setBuscando(true)
    setResultados([])
    try {
      const params = new URLSearchParams(form)
      const res = await fetch(`/api/buscar?${params}`)
      const data = await res.json()
      setResultados(data.resultados || [])
    } catch (e) {
      console.log(e)
    }
    setBuscando(false)
  }

  function toggleSeleccionar(prop: any) {
    const existe = seleccionadas.find(p => p.link === prop.link)
    if (existe) {
      setSeleccionadas(seleccionadas.filter(p => p.link !== prop.link))
    } else {
      setSeleccionadas([...seleccionadas, prop])
    }
  }

 async function enviarWhatsApp() {
    const telefono = prompt('Teléfono del cliente (con código de país, ej: 5491155667788):')
    if (!telefono) return

    const agente = 'Jimile Macias'
    const telefonoAgente = '5491162397307'

    // Generar links cortos para cada propiedad
    const links = await Promise.all(seleccionadas.map(async (p) => {
      const res = await fetch('/api/ficha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...p, agente, telefono: telefonoAgente })
      })
      const data = await res.json()
      return `https://redprop-two.vercel.app/f/${data.id}`
    }))

    const mensajes = seleccionadas.map((p, i) => {
      const precioLimpio = p.precio.split('$')[0].trim()
      return `🏠 *${precioLimpio} · ${p.direccion?.split(',')[0]}*\n${links[i]}`
    }).join('\n\n')

    const mensaje = `Hola! Te comparto estas propiedades 🏠\n\n${mensajes}\n\n👤 *${agente}*\n📞 +${telefonoAgente}\n\nCualquier consulta estoy a disposición 🙌`

    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
  }
  return (
    <main style={{ fontFamily: 'sans-serif', background: '#060606', minHeight: '100vh', color: '#ffffff', display: 'flex' }}>

      {/* SIDEBAR */}
      <div style={{ width: '220px', background: '#0a0a0a', borderRight: '0.5px solid #222', padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0 }}>
        <div style={{ fontSize: '20px', fontWeight: 500, marginBottom: '1.5rem', padding: '0 8px' }}>Red<span style={{ color: '#2563eb' }}>Prop</span></div>
        {[
          { icon: '📊', label: 'Inicio', href: '/dashboard' },
          { icon: '🔍', label: 'Búsquedas', href: '/buscar' },
          { icon: '👥', label: 'Clientes', href: '/dashboard' },
          { icon: '🏠', label: 'Propiedades', href: '/buscar' },
          { icon: '📲', label: 'Fichas WhatsApp', href: '/buscar' },
          { icon: '⚙️', label: 'Configuración', href: '/dashboard' },
        ].map((item, i) => (
          <a key={i} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 10px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', background: item.label === 'Búsquedas' ? '#2563eb18' : 'transparent', color: item.label === 'Búsquedas' ? '#2563eb' : '#b7b7b7', textDecoration: 'none' }}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 500 }}>Buscador de propiedades</h1>
            <p style={{ fontSize: '14px', color: '#b7b7b7', marginTop: '2px' }}>Buscá en todos los portales y armá la ficha para tu cliente</p>
          </div>
          {seleccionadas.length > 0 && (
            <button onClick={enviarWhatsApp} style={{ background: '#25D366', color: '#fff', border: 'none', borderRadius: '8px', padding: '9px 18px', fontSize: '14px', cursor: 'pointer', fontWeight: 500 }}>
              📲 Enviar {seleccionadas.length} ficha{seleccionadas.length > 1 ? 's' : ''} por WhatsApp
            </button>
          )}
        </div>

        {/* FILTROS */}
        <div style={{ background: '#111', border: '0.5px solid #222', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '1rem' }}>
            {[
              { label: 'Zona / Barrio', key: 'zona', placeholder: 'Ej: Palermo' },
              { label: 'Ambientes', key: 'ambientes', placeholder: 'Ej: 2' },
              { label: 'Presupuesto máx (USD)', key: 'presupuesto', placeholder: 'Ej: 150000' },
            ].map((f) => (
              <div key={f.key}>
                <label style={{ fontSize: '12px', color: '#b7b7b7', display: 'block', marginBottom: '6px' }}>{f.label}</label>
                <input
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  style={{ width: '100%', padding: '9px 12px', background: '#060606', border: '0.5px solid #333', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            ))}
            <div>
              <label style={{ fontSize: '12px', color: '#b7b7b7', display: 'block', marginBottom: '6px' }}>Tipo</label>
              <select
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', background: '#060606', border: '0.5px solid #333', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              >
                <option value="departamento">Departamento</option>
                <option value="casa">Casa</option>
                <option value="ph">PH</option>
                <option value="local">Local</option>
                <option value="oficina">Oficina</option>
              </select>
            </div>
          </div>
          <button onClick={buscar} disabled={buscando} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 24px', fontSize: '14px', cursor: 'pointer', fontWeight: 500, opacity: buscando ? 0.7 : 1 }}>
            {buscando ? '🔍 Buscando en portales...' : '🔍 Buscar propiedades'}
          </button>
        </div>

        {/* RESULTADOS */}
        {buscando && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#b7b7b7' }}>
            <div style={{ fontSize: '32px', marginBottom: '1rem' }}>🔍</div>
            <p>Buscando en Zonaprop, Argenprop, MercadoLibre...</p>
          </div>
        )}

        {!buscando && resultados.length > 0 && (
          <div>
            <p style={{ fontSize: '13px', color: '#b7b7b7', marginBottom: '1rem' }}>{resultados.length} propiedades encontradas · {seleccionadas.length} seleccionadas</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
              {resultados.map((prop, i) => {
                const seleccionada = seleccionadas.find(p => p.link === prop.link)
                return (
                  <div key={i} style={{ background: '#111', border: seleccionada ? '2px solid #2563eb' : '0.5px solid #222', borderRadius: '12px', overflow: 'hidden', transition: 'border 0.2s' }}>
                    <div style={{ height: '140px', background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      {prop.foto ? (
                        <img src={prop.foto} alt={prop.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ fontSize: '40px' }}>🏠</span>
                      )}
                      <span style={{ position: 'absolute', top: '8px', left: '8px', background: '#2563eb', color: '#fff', fontSize: '10px', padding: '3px 8px', borderRadius: '99px' }}>{prop.portal}</span>
                    </div>
                    <div style={{ padding: '12px' }}>
                      <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '4px' }}>{prop.precio}</div>
                      <div style={{ fontSize: '13px', color: '#b7b7b7', marginBottom: '4px' }}>{prop.titulo}</div>
                      <div style={{ fontSize: '12px', color: '#b7b7b7', marginBottom: '10px' }}>📍 {prop.direccion}</div>
                      {prop.superficie && <div style={{ fontSize: '12px', color: '#b7b7b7', marginBottom: '10px' }}>📐 {prop.superficie}</div>}
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => toggleSeleccionar(prop)} style={{ flex: 1, padding: '7px', background: seleccionada ? '#2563eb' : 'transparent', color: seleccionada ? '#fff' : '#2563eb', border: '1.5px solid #2563eb', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: 500 }}>
                          {seleccionada ? '✓ Seleccionada' : '+ Seleccionar'}
                        </button>
                        <a href={prop.link} target="_blank" rel="noopener noreferrer" style={{ padding: '7px 10px', background: 'transparent', color: '#b7b7b7', border: '0.5px solid #333', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', textDecoration: 'none' }}>
                          🔗
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {!buscando && resultados.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#b7b7b7' }}>
            <div style={{ fontSize: '32px', marginBottom: '1rem' }}>🔍</div>
            <p>Ingresá los parámetros y buscá propiedades para tu cliente.</p>
          </div>
        )}
      </div>
    </main>
  )
}