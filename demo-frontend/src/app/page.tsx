"use client";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useProductStore } from "@/stores/productStore";
import { useEffect } from "react";

export default function Home() {
  const { products } = useProductStore();
  useEffect(() => {
    console.log(products);
  }, [products]);

  console.log(products);
  // Sort products by relevance
  const sortedProducts = [...products].sort(
    (a, b) => b.relevance - a.relevance
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Welcome to Our Store
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link href="/products" passHref>
          <Button size="lg">View All Products</Button>
        </Link>
      </div>
    </div>
  );
}
