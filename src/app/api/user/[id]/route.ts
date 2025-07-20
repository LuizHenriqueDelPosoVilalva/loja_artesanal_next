import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const body = await req.json()

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: body.name,
        email: body.email,
      }
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar usuário' + error }, { status: 500 })
  }
}

// GET /api/user/:id - Buscar usuário por id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar usuário' + error }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  try {
    await prisma.user.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Usuário deletado com sucesso' })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar usuário' + error }, { status: 500 })
  }
}