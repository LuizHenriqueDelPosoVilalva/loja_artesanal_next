'use client'

import { useState } from 'react'

import { Input } from '@/components/ui/input'

const ProductSearchInput = () => {
  const [query, setQuery] = useState('')

  return (
    <Input
      type="text"
      placeholder="Buscar produtos..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full px-4 py-2 border rounded-md shadow-sm"
    />
  )
}

export default ProductSearchInput
