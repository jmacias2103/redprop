'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function FichaCorta() {
  const params = useParams()
  const id = params.id as string
  const [datos, setDatos] = useState<any>(null)
  const [cargando, setCargando] = useState(true)
  const [fotoActual, setFotoActual] = useState(0)

  useEffect(() => {
    fetch(`/api/ficha?id=${id}`)
      .then(r => r.json())
      .then(d => { setDatos(d); setCargando(false) })
      .catch(() => setCargando(false))
  }, [id])

  if (cargando) return (
    <div style={{ background: '#060606', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '32px', marginBottom: '1rem' }}>🏠</div>
        <p>Cargando ficha...</p>
      </div>
    </div>
  )

  if (!datos) return (
    <div style={{ background: '#060606', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'sans-serif' }}>
      <p>Ficha no encontrada</p>
    </div>
  )

  const fotos = datos.fotos || (datos.foto ? [datos.foto] : [])
  const precioLimpio = (datos.precio || 'Consultar').split('$')[0].trim()
  const agente = datos.agente || 'Jimile Macias'
  const telefono = datos.telefono || '5491162397307'

  const caracteristicas = [
    datos.ambientes && { icon: '🛏', label: datos.ambientes },
    datos.superficie && { icon: '📐', label: datos.superficie },
    datos.cochera && { icon: '🚗', label: 'Cochera' },
    datos.balcon && { icon: '🌿', label: 'Balcón' },
    datos.pileta && { icon: '🏊', label: 'Pileta' },
    datos.amenities && { icon: '🏋️', label: 'Amenities' },
    datos.aptoCredito && { icon: '💳', label: 'Apto crédito' },
    datos.antiguedad && { icon: '📅', label: datos.antiguedad },
  ].filter(Boolean) as { icon: string; label: string }[]

  const tags = datos.tags || []

  return (
    <main style={{ fontFamily: 'sans-serif', background: '#060606', minHeight: '100vh', color: '#ffffff' }}>
      
      <div style={{ textAlign: 'center', padding: '1rem', borderBottom: '0.5px solid #222' }}>
        <div style={{ fontSize: '20px', fontWeight: 500 }}>Red<span style={{ color: '#2563eb' }}>Prop</span></div>
      </div>

      <div style={{ maxWidth: '520px', margin: '0 auto', padding: '1rem' }}>

        {/* CARRUSEL */}
        <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', marginBottom: '1rem' }}>
          {fotos.length > 0 ? (
            <>
              <img src={fotos[fotoActual]} alt="Propiedad" style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }} />
              {fotos.length > 1 && (
                <>
                  <button onClick={() => setFotoActual(f => f > 0 ? f - 1 : fotos.length - 1)}
                    style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', background: '#000000aa', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px' }}>‹</button>
                  <button onClick={() => setFotoActual(f => f < fotos.length - 1 ? f + 1 : 0)}
                    style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: '#000000aa', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px' }}>›</button>
                  <div style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '4px' }}>
                    {fotos.map((_: string, i: number) => (                      <div key={i} onClick={() => setFotoActual(i)} style={{ width: '6px', height: '6px', borderRadius: '50%', background: i === fotoActual ? '#fff' : '#ffffff66', cursor: 'pointer' }} />
                    ))}
                  </div>
                  <span style={{ position: 'absolute', bottom: '8px', right: '8px', background: '#000000aa', color: '#fff', fontSize: '11px', padding: '2px 8px', borderRadius: '99px' }}>{fotoActual + 1}/{fotos.length}</span>
                </>
              )}
              {datos.portal && <span style={{ position: 'absolute', top: '8px', left: '8px', background: '#2563eb', color: '#fff', fontSize: '11px', padding: '3px 10px', borderRadius: '99px' }}>{datos.portal}</span>}
            </>
          ) : (
            <div style={{ width: '100%', height: '260px', background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>🏠</div>
          )}
        </div>

        {/* PRECIO Y DIRECCIÓN */}
        <div style={{ background: '#111', border: '0.5px solid #222', borderRadius: '12px', padding: '1.25rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: '28px', fontWeight: 500, marginBottom: '4px' }}>{precioLimpio}</div>
          <div style={{ fontSize: '14px', color: '#b7b7b7', marginBottom: '8px' }}>
            {datos.tipo ? datos.tipo.charAt(0).toUpperCase() + datos.tipo.slice(1) + ' en venta' : 'Propiedad en venta'}
          </div>
          <div style={{ fontSize: '14px', color: '#b7b7b7' }}>📍 {datos.direccion}</div>
        </div>

        {/* CARACTERÍSTICAS */}
        {caracteristicas.length > 0 && (
          <div style={{ background: '#111', border: '0.5px solid #222', borderRadius: '12px', padding: '1.25rem', marginBottom: '1rem' }}>
            <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '12px' }}>Características</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {caracteristicas.map((c, i) => (
                <div key={i} style={{ background: '#060606', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>{c.icon}</div>
                  <div style={{ fontSize: '12px', color: '#b7b7b7' }}>{c.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAGS */}
        {tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1rem' }}>
            {tags.map((tag: string, i: number) => (
              <span key={i} style={{ background: '#111', border: '0.5px solid #333', borderRadius: '99px', padding: '4px 12px', fontSize: '12px', color: '#b7b7b7' }}>{tag}</span>
            ))}
          </div>
        )}

        {/* AGENTE */}
        <div style={{ background: '#111', border: '0.5px solid #222', borderRadius: '12px', padding: '1.25rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: '13px', color: '#b7b7b7', marginBottom: '12px' }}>Tu agente comprador</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 500, flexShrink: 0 }}>
              {agente.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 500 }}>{agente}</div>
              <div style={{ fontSize: '13px', color: '#2563eb' }}>+{telefono}</div>
            </div>
          </div>
        </div>

        <a href={`https://wa.me/${telefono}?text=${encodeURIComponent(`Hola ${agente}! Vi la propiedad en ${datos.direccion} y me interesa. ¿Podemos coordinar?`)}`}
          target="_blank"
          style={{ display: 'block', background: '#25D366', color: '#fff', textAlign: 'center', padding: '16px', borderRadius: '12px', textDecoration: 'none', fontSize: '16px', fontWeight: 500, marginBottom: '2rem' }}>
          💬 Consultar por esta propiedad
        </a>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#444', paddingBottom: '2rem' }}>
          Ficha generada por RedProp · {new Date().toLocaleDateString('es-AR')}
        </p>
      </div>
    </main>
  )
}