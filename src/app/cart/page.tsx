"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface ItemPedido {
  id: string;
  quantidade_total: number;
  valorTotal: number;
  estoque: {
    produtos: {
      id: string;
      nome: string;
      preco: string;
      imagemUrl: string;
    }[];
  };
}

export default function CartPage() {
  const [items, setItems] = useState<ItemPedido[]>([]);
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  useEffect(() => {
    if (userId) {
      fetch(`/api/item-pedido/user/${userId}`)
        .then((res) => res.json())
        .then(setItems);
    }
  }, [userId]);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">🛒 Seu Carrinho</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">Carrinho vazio</p>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => {
            const produto = item.estoque.produtos[0];

            return (
              <Card
                key={item.id}
                className="flex flex-col items-center gap-4 sm:flex-row"
              >
                <Image
                  src={produto.imagemUrl}
                  alt={produto.nome}
                  width={120}
                  height={120}
                  className="rounded-md object-cover"
                />
                <CardContent className="flex-1 space-y-1">
                  <h2 className="text-xl font-semibold">{produto.nome}</h2>
                  <p className="text-gray-700">
                    Quantidade: {item.quantidade_total}
                  </p>
                  <p className="text-gray-700">
                    Valor Total: R$ {item.valorTotal.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      <Link href="/dashboard" className="text-blue-600 hover:underline">
        Dashboard
      </Link>
    </div>
  );
}
