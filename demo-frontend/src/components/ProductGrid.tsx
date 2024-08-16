"use client";

import { useState, useEffect } from "react";
import AnimatedCard from "./AnimatedCard";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    setProducts([
      {
        id: "1",
        name: "Wireless Earbuds",
        price: 79.99,
        image: "/images/earbuds.jpg",
      },
      {
        id: "2",
        name: "Smart Watch",
        price: 199.99,
        image: "/images/smartwatch.jpg",
      },
      { id: "3", name: "4K TV", price: 499.99, image: "/images/tv.jpg" },
      { id: "4", name: "Laptop", price: 899.99, image: "/images/laptop.jpg" },
      {
        id: "5",
        name: "Smartphone",
        price: 699.99,
        image: "/images/smartphone.jpg",
      },
      {
        id: "6",
        name: "Gaming Console",
        price: 399.99,
        image: "/images/console.jpg",
      },
    ]);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <AnimatedCard key={product.id} product={product} />
      ))}
    </div>
  );
}
