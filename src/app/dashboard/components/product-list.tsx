"use client";

import { useEffect, useState } from "react";

import ProductCard from "./product-card";

interface Product {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
  imagemUrl: string;
  userId: string | null;
  cadastradoPor: {
    name: string;
    email: string;
  } | null;
}

interface Props {
  currentUserId: string;
}

const ProductList = ({ currentUserId }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/product");
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          canEdit={product.userId === currentUserId}
        />
      ))}
    </div>
  );
};

export default ProductList;
