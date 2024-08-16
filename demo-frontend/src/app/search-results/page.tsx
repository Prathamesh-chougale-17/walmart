// app/search-results/page.tsx
"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Product = {
  name: string;
  description: string;
  features: string[];
  confidenceScore: number;
};

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch("/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        // Handle error (e.g., show error message to user)
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  if (isLoading) {
    return <div>Loading search results...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Search Results for: {query}</h1>
      {products.length === 0 ? (
        <p>No products found matching your criteria.</p>
      ) : (
        <ul className="space-y-4">
          {products.map((product, index) => (
            <li key={index} className="border p-4 rounded-lg">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <ul className="mt-2">
                {product.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-sm text-gray-500">
                    • {feature}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm font-medium">
                Match confidence: {product.confidenceScore}%
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
