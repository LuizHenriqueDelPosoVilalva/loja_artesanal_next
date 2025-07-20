import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = params;

  try {
    const itens = await prisma.itemPedido.findMany({
      where: {
        userId,
        concluido: false,
      },
      include: {
        estoque: {
          include: {
            produtos: true,
          },
        },
      },
    });

    return NextResponse.json(itens);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar carrinho " + error }, { status: 500 });
  }
}
