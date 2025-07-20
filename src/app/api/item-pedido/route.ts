import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  console.log("Adding item to cart...");
  const { userId, produtoId, quantidade } = await req.json();

  if (!userId || !produtoId || !quantidade) {
    return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
  }

  try {
    const existingItem = await prisma.itemPedido.findFirst({
      where: {
        userId,
        estoque: {
          produtos: {
            some: { id: produtoId },
          },
        },
        concluido: false,
      },
    });

    if (existingItem) {
      const updated = await prisma.itemPedido.update({
        where: { id: existingItem.id },
        data: {
          quantidade_total: existingItem.quantidade_total + quantidade,
          valorTotal: existingItem.valorTotal,
        },
      });
      return NextResponse.json(updated);
    } else {
      const produto = await prisma.produto.findUnique({
        where: { id: produtoId },
        include: { estoque: true },
      });

      if (!produto) return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });

      const newItemPedido = await prisma.itemPedido.create({
        data: {
          quantidade_total: quantidade,
          valorTotal: parseFloat(produto.preco) * quantidade,
          concluido: false,
          userId,
          estoqueId: produto.estoqueId!,
        },
      });

      return NextResponse.json(newItemPedido);
    }
  } catch (error) {
    return NextResponse.json({ error: "Erro ao adicionar ao carrinho " + error }, { status: 500 });
  }
}
