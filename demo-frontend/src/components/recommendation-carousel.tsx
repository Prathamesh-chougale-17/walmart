"use client";

import { useEffect, useState } from "react";
import ProductCard from "./product-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
};

export default function RecommendationCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch recommendations from the API
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    // Implement API call to get recommendations
    // For now, we'll use dummy data
    const dummyProducts: Product[] = [
      { id: "1", name: "Product 1", image: "/product.jpg", price: 19.99 },
      { id: "2", name: "Product 2", image: "/product.jpg", price: 29.99 },
      { id: "3", name: "Product 3", image: "/product.jpg", price: 39.99 },
      // Add more dummy products...
    ];
    setProducts(dummyProducts);
  };

  const nextProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  };

  return (
    <div className="relative">
      <div className="flex overflow-hidden">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`w-full flex-shrink-0 transition-transform duration-300 ease-in-out ${
              index === currentIndex
                ? "transform translate-x-0"
                : "transform translate-x-full"
            }`}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-0 transform -translate-y-1/2"
        onClick={prevProduct}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-0 transform -translate-y-1/2"
        onClick={nextProduct}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
