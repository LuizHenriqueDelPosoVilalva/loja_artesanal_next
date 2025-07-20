import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  const produtos = await prisma.produto.findMany({
    include: {
      cadastradoPor: {
        select: { name: true, email: true },
      },
    },

    orderBy: {
      id: "desc",
    },
  });

  return NextResponse.json(produtos);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      nome,
      descricao,
      preco,
      imagemUrl,
      quantidade,
      dataDeEntrada,
      userId,
    } = body;

    const estoque = await prisma.estoque.create({
      data: {
        dataDeEntrada,
        quantidade,
      },
    });

    const produto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        preco,
        imagemUrl,
        userId,
        estoqueId: estoque.id,
      },
    });

    return NextResponse.json({ success: true, produto });
  } catch (error) {
    console.error("[POST_PRODUTO]", error);
    return NextResponse.json(
      { error: "Erro ao criar produto" },
      { status: 500 },
    );
  }
}
