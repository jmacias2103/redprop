import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const zona = searchParams.get('zona') || ''
  const ambientes = searchParams.get('ambientes') || ''
  const tipo = searchParams.get('tipo') || 'departamento'
  const apiKey = process.env.SCRAPER_API_KEY

  const resultados: any[] = []

  try {
    // Zonaprop
    const zonaSlug = zona.toLowerCase().replace(/ /g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const urlZonaprop = `https://www.zonaprop.com.ar/${tipo}s-venta-${zonaSlug}-${ambientes}-ambientes.html`
    const scraperUrl = `http://api.scraperapi.com?api_key=${apiKey}&url=${encodeURIComponent(urlZonaprop)}&render=false`

    const res = await fetch(scraperUrl, { next: { revalidate: 0 } })
    const html = await res.text()
    const $ = cheerio.load(html)

    $('[data-id]').each((i, el) => {
      if (i >= 8) return false

      const precio = $(el).find('[data-price]').attr('data-price') ||
                     $(el).find('.firstPrice').text().trim()
      const titulo = $(el).find('.postingCardTitle').text().trim() ||
                     $(el).find('h2').first().text().trim()
      const direccion = $(el).find('.postingCardLocation span').first().text().trim()
      const foto = $(el).find('img').first().attr('data-src') ||
                   $(el).find('img').first().attr('src') || ''
      const link = $(el).find('a.go-to-posting').attr('href') ||
                   $(el).find('a').first().attr('href') || ''
      const sup = $(el).find('.postingCardMainFeatures').text().trim()

      if (titulo || precio) {
        resultados.push({
          portal: 'Zonaprop',
          titulo: titulo || `${tipo} en ${zona}`,
          precio: precio ? `USD ${Number(precio).toLocaleString()}` : 'Consultar',
          direccion: direccion || zona,
          foto: foto.startsWith('http') ? foto : '',
          link: link.startsWith('http') ? link : `https://www.zonaprop.com.ar${link}`,
          superficie: sup,
        })
      }
    })

  } catch (error) {
    console.log('Error scraping:', error)
  }

  // Si no trajo nada del scraping
  if (resultados.length === 0) {
    return NextResponse.json({
      resultados: [],
      total: 0,
      mensaje: 'No se encontraron propiedades. Probá con otra zona o tipo.'
    })
  }

  return NextResponse.json({ resultados, total: resultados.length })
}