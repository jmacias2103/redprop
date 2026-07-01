import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const datos = await request.json()
    
    const { data, error } = await supabase
      .from('fichas')
      .insert([{ datos }])
      .select('id')
      .single()

    if (error) {
      console.log('Error guardando ficha:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ id: data.id })

  } catch (error) {
    console.log('Error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })

  const { data, error } = await supabase
    .from('fichas')
    .select('datos')
    .eq('id', id)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Ficha no encontrada' }, { status: 404 })
  }

  return NextResponse.json(data.datos)
}