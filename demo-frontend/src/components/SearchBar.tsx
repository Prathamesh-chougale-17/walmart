"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Simulated suggestions - in a real app, you'd fetch these from an API
    if (value.length > 2) {
      setSuggestions([
        `${value} in electronics`,
        `${value} in clothing`,
        `${value} deals`,
      ]);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="relative w-full max-w-xl">
      <form onSubmit={handleSearch} className="flex">
        <Input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={handleInputChange}
          className="flex-grow rounded-r-none"
        />
        <Button type="submit" className="rounded-l-none">
          <Search className="h-4 w-4" />
        </Button>
      </form>
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full bg-white mt-1 rounded-md shadow-lg"
          >
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start text-left py-2 px-4 hover:bg-gray-100"
                onClick={() => {
                  setQuery(suggestion);
                  setSuggestions([]);
                }}
              >
                {suggestion}
              </Button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
