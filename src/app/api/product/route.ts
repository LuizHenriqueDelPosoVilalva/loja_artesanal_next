import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET() {
  const produtos = await prisma.produto.findMany({
    include: {
      cadastradoPor: {
        select: { name: true, email: true },
      },
    },

    orderBy: {
      id: 'desc',
    },
  })

  return NextResponse.json(produtos)
}
