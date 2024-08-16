import create from 'zustand'
import { persist } from 'zustand/middleware'

interface Product {
  id: string
  name: string
  price: number
  image: string
  relevance: number
}

interface ProductState {
  products: Product[]
  setProducts: (products: Product[]) => void
  updateProductRelevance: (productIds: string[]) => void
}

export const useProductStore = create(
  persist<ProductState>(
    (set) => ({
      products: [],
      setProducts: (products) => set({ products }),
      updateProductRelevance: (productIds) =>
        set((state) => ({
          products: state.products.map((product) => ({
            ...product,
            relevance: productIds.includes(product.id)
              ? product.relevance + 1
              : product.relevance,
          })),
        })),
    }),
    {
      name: 'product-store',
    }
  )
)