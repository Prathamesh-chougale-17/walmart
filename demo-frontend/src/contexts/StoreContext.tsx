"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  relevance: number;
}

interface StoreContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  updateProductRelevance: (productIds: string[]) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};

let globalProducts: Product[] = [];

export const getGlobalProducts = () => globalProducts;
export const setGlobalProducts = (products: Product[]) => {
  globalProducts = products;
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      setProducts(parsedProducts);
      setGlobalProducts(parsedProducts);
    }
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
    setGlobalProducts(products);
  }, [products]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const updateProductRelevance = (productIds: string[]) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => ({
        ...product,
        relevance: productIds.includes(product.id)
          ? product.relevance + 1
          : product.relevance,
      }))
    );
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        setProducts,
        updateProductRelevance,
        language,
        setLanguage,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
