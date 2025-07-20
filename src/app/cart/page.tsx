"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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

  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  useEffect(() => {
    fetch(`/api/item-pedido/user/${userId}`)
      .then((res) => res.json())
      .then(setItems);
  }, [userId]);

  return (
    <div>
      <h1>Carrinho</h1>
      {items.length === 0 && <p>Carrinho vazio</p>}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <p>
              {item.estoque.produtos[0].nome} - Quantidade:{" "}
              {item.quantidade_total} - Valor: R$ {item.valorTotal.toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
