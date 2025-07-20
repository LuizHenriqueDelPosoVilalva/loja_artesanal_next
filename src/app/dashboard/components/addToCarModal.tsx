"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Props {
  userId: string;
  produtoId: string;
  produtoNome: string;
  preco: string;
  onClose: () => void;
}

export default function AddToCartModal({ userId, produtoId, produtoNome, preco, onClose }: Props) {
  const [quantidade, setQuantidade] = useState(1);
  const [loading, setLoading] = useState(false);

  async function handleAdd() {
    setLoading(true);
    const res = await fetch("/api/item-pedido", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, produtoId, quantidade }),
    });

    setLoading(false);
    if (res.ok) {
      toast.success(`${produtoNome} adicionado ao carrinho!`);
      onClose();
    } else {
      toast.error("Erro ao adicionar ao carrinho.");
    }
  }

  return (
    <div className="modal">
      <h2>Adicionar {produtoNome} ao carrinho</h2>
      <p>Preço: R$ {preco}</p>
      <Input type="number" min={1} value={quantidade} onChange={e => setQuantidade(Number(e.target.value))} />
      <Button onClick={handleAdd} disabled={loading}>
        {loading ? "Adicionando..." : "Adicionar ao carrinho"}
      </Button>
      <Button variant="outline" onClick={onClose}>Cancelar</Button>
    </div>
  );
}
