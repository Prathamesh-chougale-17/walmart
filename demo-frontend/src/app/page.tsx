import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
        <CategoryGrid />
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <ProductGrid />
      </section>
    </div>
  );
}
