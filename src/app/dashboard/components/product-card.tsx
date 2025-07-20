'use client'

import { Pencil,Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

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
  const handleDelete = async () => {
    const confirm = window.confirm('Deseja realmente excluir este produto?')
    if (!confirm) return

    const res = await fetch(`/api/produtos/${product.id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      toast.success('Produto excluído!')
      window.location.reload()
    } else {
      toast.error('Erro ao excluir produto.')
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
          <Link href={`/produtos/editar/${product.id}`}>
            <Button size="sm" variant="outline">
              <Pencil size={16} className="mr-1" />
              Editar
            </Button>
          </Link>
          <Button size="sm" variant="destructive" onClick={handleDelete}>
            <Trash2 size={16} className="mr-1" />
            Excluir
          </Button>
        </div>
      )}
    </div>
  )
}

export default ProductCard
