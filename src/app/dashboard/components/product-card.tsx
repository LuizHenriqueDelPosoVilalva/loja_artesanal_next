"use client";

import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import AddToCartModal from "./addToCarModal";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Product {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
  imagemUrl: string;
  cadastradoPor: {
    name: string;
    email: string;
  } | null;
}

interface Props {
  product: Product;
  canEdit: boolean;
  userId: string;
}

const ProductCard = ({ product, canEdit, userId }: Props) => {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState(product.nome);
  const [descricao, setDescricao] = useState(product.descricao);
  const [preco, setPreco] = useState(product.preco);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [quantidade, setQuantidade] = useState(1);

  const handleDelete = async () => {
    const confirm = window.confirm("Deseja realmente excluir este produto?");
    if (!confirm) return;

    const res = await fetch(`/api/product/${product.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Produto excluído!");
      window.location.reload();
    } else {
      toast.error("Erro ao excluir produto.");
    }
  };

  const handleUpdate = async () => {
    const res = await fetch(`/api/product/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, descricao, preco }),
    });

    if (res.ok) {
      toast.success("Produto atualizado!");
      setOpen(false);
      window.location.reload();
    } else {
      toast.error("Erro ao atualizar produto.");
    }
  };

  const handleAddToCart = async () => {
    const res = await fetch("/api/item-pedido", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        produtoId: product.id,
        quantidade,
        valorTotal: parseFloat(product.preco) * quantidade,
      }),
    });

    if (res.ok) {
      toast.success("Produto adicionado ao carrinho!");
      setIsCartModalOpen(false);
    } else {
      toast.error("Erro ao adicionar produto.");
    }
  };

  return (
    <div className="space-y-2 rounded-lg border p-4 shadow">
      <Image
        src={product.imagemUrl}
        alt={product.nome}
        width={400}
        height={200}
        className="rounded object-cover"
      />
      <h2 className="text-lg font-semibold">{product.nome}</h2>
      <p className="text-muted-foreground text-sm">{product.descricao}</p>
      <p className="font-bold text-blue-600">R$ {product.preco}</p>

      {canEdit && (
        <div className="flex gap-2 pt-2">
          <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
            <Pencil size={16} className="mr-1" />
            Editar
          </Button>
          <Button size="sm" variant="destructive" onClick={handleDelete}>
            <Trash2 size={16} className="mr-1" />
            Excluir
          </Button>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome do produto"
            />
            <Textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descrição"
            />
            <Input
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              placeholder="Preço"
            />
          </div>
          <DialogFooter>
            <Button onClick={handleUpdate}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button size="sm" onClick={() => setIsCartModalOpen(true)}>
        Adicionar ao Carrinho
      </Button>

      <Dialog open={isCartModalOpen} onOpenChange={setIsCartModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar ao Carrinho</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p className="text-sm font-medium">{product.nome}</p>
            <p className="text-muted-foreground text-sm">
              Preço unitário: R$ {product.preco}
            </p>
            <Input
              type="number"
              min={1}
              value={quantidade}
              onChange={(e) => setQuantidade(Number(e.target.value))}
              placeholder="Quantidade"
            />
          </div>
          <DialogFooter>
            <Button onClick={handleAddToCart}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductCard;
