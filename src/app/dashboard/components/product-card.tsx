'use client'

import { Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface Product {
  id: string
  nome: string
  descricao: string
  preco: string
  imagemUrl: string
  cadastradoPor: {
    name: string
    email: string
  } | null
}

interface Props {
  product: Product
  canEdit: boolean
}

const ProductCard = ({ product, canEdit }: Props) => {
  const [open, setOpen] = useState(false)
  const [nome, setNome] = useState(product.nome)
  const [descricao, setDescricao] = useState(product.descricao)
  const [preco, setPreco] = useState(product.preco)

  const handleDelete = async () => {
    const confirm = window.confirm('Deseja realmente excluir este produto?')
    if (!confirm) return

    const res = await fetch(`/api/product/${product.id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      toast.success('Produto excluído!')
      window.location.reload()
    } else {
      toast.error('Erro ao excluir produto.')
    }
  }

  const handleUpdate = async () => {
    const res = await fetch(`/api/product/${product.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, descricao, preco }),
    })

    if (res.ok) {
      toast.success('Produto atualizado!')
      setOpen(false)
      window.location.reload()
    } else {
      toast.error('Erro ao atualizar produto.')
    }
  }

  return (
    <div className="border rounded-lg shadow p-4 space-y-2">
      <Image
        src={product.imagemUrl}
        alt={product.nome}
        width={400}
        height={200}
        className="object-cover rounded"
      />
      <h2 className="font-semibold text-lg">{product.nome}</h2>
      <p className="text-sm text-muted-foreground">{product.descricao}</p>
      <p className="text-blue-600 font-bold">R$ {product.preco}</p>

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

      {/* Modal de Edição */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome do produto" />
            <Textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />
            <Input value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="Preço" />
          </div>
          <DialogFooter>
            <Button onClick={handleUpdate}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProductCard
