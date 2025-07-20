import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    await prisma.produto.delete({
      where: { id },
    })
    return NextResponse.json({ message: 'Produto deletado com sucesso.' })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar produto.' + error }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const body = await request.json()

  try {
    const produtoAtualizado = await prisma.produto.update({
      where: { id },
      data: body,
    })
    return NextResponse.json(produtoAtualizado)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao editar produto.' + error }, { status: 500 })
  }
}
