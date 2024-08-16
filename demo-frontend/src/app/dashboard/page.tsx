import RecommendationCarousel from "@/components/recommendation-carousel";
import SearchBar from "@/components/search-bar";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Personalized Dashboard</h1>
      <SearchBar />
      <section className="my-12">
        <h2 className="text-2xl font-semibold mb-4">Recommended for You</h2>
        <RecommendationCarousel />
      </section>
      {/* Add more sections as needed */}
    </div>
  );
}
