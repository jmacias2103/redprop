import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const zona = searchParams.get('zona') || ''
  const ambientes = searchParams.get('ambientes') || ''
  const tipo = searchParams.get('tipo') || 'departamento'
  const apiKey = process.env.SCRAPER_API_KEY

  const resultados: any[] = []

  const zonaSlug = zona.toLowerCase()
    .replace(/ /g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  const paginas = [1, 2, 3]

  for (const pagina of paginas) {
    try {
      const offset = (pagina - 1) * 20
      const urlZonaprop = ambientes
        ? `https://www.zonaprop.com.ar/${tipo}s-venta-${zonaSlug}-${ambientes}-ambientes-mas-de-${offset}.html`
        : `https://www.zonaprop.com.ar/${tipo}s-venta-${zonaSlug}-mas-de-${offset}.html`

      const scraperUrl = `http://api.scraperapi.com?api_key=${apiKey}&url=${encodeURIComponent(urlZonaprop)}&render=true`

      const res = await fetch(scraperUrl, { next: { revalidate: 0 } })
      const html = await res.text()
      const $ = cheerio.load(html)

      $('[data-id]').each((i, el) => {
        const dataId = $(el).attr('data-id')
        if (!dataId) return

        // Precio
        const precioRaw = $(el).find('[data-price]').attr('data-price') || ''
        const precioTexto = $(el).find('.firstPrice').text().trim() ||
                            $(el).find('[class*="price"]').first().text().trim() || ''
        const precio = precioRaw
          ? `USD ${Number(precioRaw).toLocaleString('es-AR')}`
          : precioTexto || 'Consultar'

        // Título real
        const titulo = $(el).find('.postingCardTitle').text().trim() ||
                       $(el).find('[class*="title"]').first().text().trim() ||
                       $(el).find('h2').first().text().trim() ||
                       `${tipo} en ${zona}`

        // Dirección
        const direccion = $(el).find('.postingCardLocation span').first().text().trim() ||
                          $(el).find('[class*="location"]').first().text().trim() || zona

        // Fotos — solo fotos de propiedades, no logos
        const fotos: string[] = []
        $(el).find('img').each((j, img) => {
          const src = $(img).attr('data-src') || $(img).attr('src') || ''
          if (src.includes('/avisos/') && !src.includes('/empresas/')) {
            const srcGrande = src.replace('360x266', '720x532').replace('-I.jpg', '-O.jpg')
            if (!fotos.includes(srcGrande)) fotos.push(srcGrande)
          }
        })

        // Link
        const link = $(el).find('a.go-to-posting').attr('href') ||
                     $(el).find('a[href*="/propiedades/"]').first().attr('href') || ''

        // Superficie y ambientes
        const featuresText = $(el).find('.postingCardMainFeatures').text().trim()
        const supMatch = featuresText.match(/(\d+)\s*m²/)
        const superficie = supMatch ? `${supMatch[1]} m²` : ''
        const ambMatch = featuresText.match(/(\d+)\s*amb/i)
        const ambientesCard = ambMatch ? `${ambMatch[1]} ambientes` : ''

        // Tags de características
        const tags: string[] = []
        $(el).find('[class*="feature"] span, [class*="tag"] span, [class*="pill"]').each((j, tag) => {
          const text = $(tag).text().trim()
          if (text && text.length > 1) tags.push(text)
        })

        const textoCompleto = $(el).text().toLowerCase()
        const aptoCredito = textoCompleto.includes('apto crédito') || textoCompleto.includes('apto credito')
        const cochera = textoCompleto.includes('cochera') || textoCompleto.includes('garage')
        const balcon = textoCompleto.includes('balcón') || textoCompleto.includes('balcon')
        const pileta = textoCompleto.includes('pileta') || textoCompleto.includes('piscina')
        const amenities = textoCompleto.includes('amenities') || textoCompleto.includes('ameniti')
        const antiguedadMatch = textoCompleto.match(/(\d+)\s*año/)
        const antiguedad = antiguedadMatch ? `${antiguedadMatch[1]} años` : ''

        if (titulo || precio) {
          resultados.push({
            portal: 'Zonaprop',
            titulo,
            precio,
            direccion,
            fotos,
            foto: fotos[0] || '',
            link: link.startsWith('http') ? link : `https://www.zonaprop.com.ar${link}`,
            superficie,
            ambientes: ambientesCard,
            tipo,
            aptoCredito,
            cochera,
            balcon,
            pileta,
            amenities,
            antiguedad,
            tags,
          })
        }
      })

    } catch (error) {
      console.log(`Error página ${pagina}:`, error)
    }
  }

  // Eliminar duplicados por link
  const unicos = resultados.filter((item, index, self) =>
    index === self.findIndex(t => t.link === item.link)
  )

  return NextResponse.json({ resultados: unicos, total: unicos.length })
}