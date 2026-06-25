export default function Home() {
  return (
    <main style={{ fontFamily: 'sans-serif', background: '#060606', minHeight: '100vh', color: '#ffffff' }}>
      
      {/* NAV */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem', borderBottom: '0.5px solid #222' }}>
        <div style={{ fontSize: '22px', fontWeight: 500 }}>Red<span style={{ color: '#e878c5' }}>Prop</span></div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <a href="#como" style={{ fontSize: '14px', color: '#b7b7b7', textDecoration: 'none' }}>Cómo funciona</a>
          <a href="#planes" style={{ fontSize: '14px', color: '#b7b7b7', textDecoration: 'none' }}>Planes</a>
          <button style={{ background: '#e878c5', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 18px', fontSize: '14px', cursor: 'pointer' }}>Empezar gratis</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ textAlign: 'center', padding: '5rem 2rem 3rem' }}>
        <span style={{ background: '#e878c522', color: '#e878c5', fontSize: '12px', padding: '4px 14px', borderRadius: '99px', marginBottom: '1rem', display: 'inline-block' }}>Para agentes independientes de Argentina</span>
        <h1 style={{ fontSize: '40px', fontWeight: 500, lineHeight: 1.2, marginBottom: '1rem', maxWidth: '600px', margin: '1rem auto' }}>Tu portal inmobiliario.<br />Tu marca. Tus comisiones.</h1>
        <p style={{ fontSize: '16px', color: '#b7b7b7', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.7 }}>Armá tu propio portal con propiedades de inmobiliarias que comparten comisión. El cliente solo ve tu contacto.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button style={{ background: '#e878c5', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px 28px', fontSize: '15px', cursor: 'pointer' }}>Empezar gratis</button>
          <button style={{ background: 'transparent', color: '#e878c5', border: '1.5px solid #e878c5', borderRadius: '8px', padding: '12px 28px', fontSize: '15px', cursor: 'pointer' }}>Ver demo</button>
        </div>
      </section>

      {/* FEATURES */}
      <section id="como" style={{ padding: '3rem 2rem', background: '#0d0d0d' }}>
        <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 500, marginBottom: '2rem' }}>Todo lo que necesitás para trabajar como agente comprador</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
          {[
            { icon: '🏠', title: 'Portal propio', desc: 'Tu nombre, logo y colores. Tu marca siempre adelante.' },
            { icon: '🤝', title: 'Propiedades colaborativas', desc: 'Accedé a propiedades de inmobiliarias que comparten comisión.' },
            { icon: '👥', title: 'Seguimiento de clientes', desc: 'Gestioná tus compradores y el estado de cada operación.' },
            { icon: '📊', title: 'Métricas de tu negocio', desc: 'Visualizá tus operaciones y comisiones generadas.' },
          ].map((f, i) => (
            <div key={i} style={{ background: '#111', border: '0.5px solid #222', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{f.icon}</div>
              <h3 style={{ fontSize: '15px', fontWeight: 500, marginBottom: '6px' }}>{f.title}</h3>
              <p style={{ fontSize: '13px', color: '#b7b7b7', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PLANES */}
      <section id="planes" style={{ padding: '3rem 2rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 500, marginBottom: '8px' }}>Elegí el plan que mejor te queda</h2>
        <p style={{ textAlign: 'center', color: '#b7b7b7', fontSize: '15px', marginBottom: '2rem' }}>Arrancá gratis y escalá cuando lo necesites.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
          {[
            { name: 'Free', price: '$0', desc: 'Para arrancar sin riesgos.', features: ['Portal básico', 'Hasta 10 propiedades', 'Hasta 5 clientes', 'Acceso a la red'], featured: false },
            { name: 'Pro', price: '$12.900', desc: 'Para el agente en movimiento.', features: ['Propiedades ilimitadas', '50 clientes', 'CRM incluido', 'Soporte prioritario'], featured: true },
            { name: 'Premium', price: '$24.900', desc: 'Para quien trabaja a escala.', features: ['Todo ilimitado', 'Múltiples portales', 'API de integración', 'Gerente de cuenta'], featured: false },
          ].map((p, i) => (
            <div key={i} style={{ background: '#111', border: p.featured ? '2px solid #e878c5' : '0.5px solid #222', borderRadius: '12px', padding: '1.5rem', position: 'relative' }}>
              {p.featured && <span style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#e878c5', color: '#fff', fontSize: '11px', padding: '3px 12px', borderRadius: '99px' }}>Más elegido</span>}
              <div style={{ fontSize: '18px', fontWeight: 500, marginBottom: '4px' }}>{p.name}</div>
              <div style={{ fontSize: '26px', fontWeight: 500, marginBottom: '4px' }}>{p.price}<span style={{ fontSize: '13px', color: '#b7b7b7', fontWeight: 400 }}> /mes</span></div>
              <div style={{ fontSize: '13px', color: '#b7b7b7', marginBottom: '1rem' }}>{p.desc}</div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.25rem' }}>
                {p.features.map((f, j) => (
                  <li key={j} style={{ fontSize: '13px', color: '#b7b7b7', padding: '5px 0', borderBottom: '0.5px solid #222', display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#e878c5' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button style={{ width: '100%', background: p.featured ? '#e878c5' : 'transparent', color: p.featured ? '#fff' : '#e878c5', border: p.featured ? 'none' : '1.5px solid #e878c5', borderRadius: '8px', padding: '10px', fontSize: '14px', cursor: 'pointer' }}>
                {p.name === 'Free' ? 'Empezar gratis' : `Elegir ${p.name}`}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '1.5rem 2rem', borderTop: '0.5px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '16px', fontWeight: 500 }}>Red<span style={{ color: '#e878c5' }}>Prop</span></div>
        <p style={{ fontSize: '13px', color: '#b7b7b7' }}>© 2025 RedProp · Buenos Aires, Argentina</p>
      </footer>

    </main>
  )
}