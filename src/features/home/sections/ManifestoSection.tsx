export function ManifestoSection() {
  const pillars = [
    {
      index: '01',
      title: 'Curaduría',
      body: 'No mostramos todo. Seleccionamos propiedades por arquitectura, ubicación y potencial.',
    },
    {
      index: '02',
      title: 'Ubicación',
      body: 'El entorno también es parte de la propiedad: barrio, accesos, vistas y forma de vivir.',
    },
    {
      index: '03',
      title: 'Experiencia',
      body: 'Desde el descubrimiento hasta la visita, cada interacción está diseñada para decidir mejor.',
    },
  ]

  return (
    <section className="manifesto">
      <div className="section-shell">
        <p className="eyebrow">NUESTRA MANERA DE TRABAJAR</p>
        <h2 className="section-display">
          UNA MANERA DIFERENTE
          <br />
          DE ENCONTRAR TU LUGAR
        </h2>

        <div className="manifesto-grid">
          {pillars.map((pillar) => (
            <article className="manifesto-item" key={pillar.index}>
              <span className="item-index">{pillar.index}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
