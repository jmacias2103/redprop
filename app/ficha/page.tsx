'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function FichaContent() {
  const params = useSearchParams()
  
  const titulo = params.get('titulo') || 'Propiedad'
  const precio = params.get('precio') || 'Consultar'
  const direccion = params.get('direccion') || ''
  const foto = params.get('foto') || ''
  const superficie = params.get('superficie') || ''
  const portal = params.get('portal') || ''
  const link = params.get('link') || ''
  const agente = params.get('agente') || 'Jimile Macias'
  const telefono = params.get('telefono') || '5491162397307'

  return (
    <main style={{ fontFamily: 'sans-serif', background: '#060606', minHeight: '100vh', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ maxWidth: '480px', width: '100%' }}>
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '22px', fontWeight: 500 }}>Red<span style={{ color: '#2563eb' }}>Prop</span></div>
          <p style={{ fontSize: '13px', color: '#b7b7b7', marginTop: '4px' }}>Ficha de propiedad</p>
        </div>

        {/* CARD */}
        <div style={{ background: '#111', border: '0.5px solid #222', borderRadius: '16px', overflow: 'hidden' }}>
          
          {/* FOTO */}
          {foto ? (
            <img src={foto} alt={titulo} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '220px', background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>🏠</div>
          )}

          <div style={{ padding: '1.5rem' }}>
            {/* PRECIO */}
            <div style={{ fontSize: '26px', fontWeight: 500, marginBottom: '6px' }}>{precio}</div>
            
            {/* TITULO */}
            <div style={{ fontSize: '15px', color: '#b7b7b7', marginBottom: '8px' }}>{titulo}</div>
            
            {/* DETALLES */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {direccion && <span style={{ fontSize: '13px', color: '#b7b7b7' }}>📍 {direccion}</span>}
              {superficie && <span style={{ fontSize: '13px', color: '#b7b7b7' }}>📐 {superficie}</span>}
              {portal && <span style={{ fontSize: '11px', background: '#2563eb18', color: '#2563eb', padding: '3px 10px', borderRadius: '99px' }}>{portal}</span>}
            </div>

            {/* DIVIDER */}
            <div style={{ height: '0.5px', background: '#222', margin: '1rem 0' }}></div>

            {/* AGENTE */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 500, flexShrink: 0 }}>
                {agente.charAt(0)}
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 500 }}>{agente}</div>
                <div style={{ fontSize: '13px', color: '#b7b7b7' }}>Agente comprador</div>
                <div style={{ fontSize: '13px', color: '#2563eb' }}>+{telefono}</div>
              </div>
            </div>

            {/* CTA */}
            <a href={`https://wa.me/${telefono}?text=${encodeURIComponent(`Hola ${agente}! Vi la propiedad que me enviaste y me interesa. ¿Podemos coordinar una visita?`)}`}
              target="_blank"
              style={{ display: 'block', background: '#25D366', color: '#fff', textAlign: 'center', padding: '14px', borderRadius: '10px', textDecoration: 'none', fontSize: '15px', fontWeight: 500, marginBottom: '10px' }}>
              💬 Consultar por esta propiedad
            </a>

          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#555', marginTop: '1rem' }}>
          Ficha generada por RedProp · {new Date().toLocaleDateString('es-AR')}
        </p>
      </div>
    </main>
  )
}

export default function Ficha() {
  return (
    <Suspense fallback={<div style={{ background: '#060606', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Cargando...</div>}>
      <FichaContent />
    </Suspense>
  )
}