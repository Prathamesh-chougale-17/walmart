"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    name: "Electronics",
    image: "/images/electronics.jpg",
    slug: "electronics",
  },
  { name: "Clothing", image: "/images/clothing.jpg", slug: "clothing" },
  {
    name: "Home & Garden",
    image: "/images/home-garden.jpg",
    slug: "home-garden",
  },
  { name: "Toys", image: "/images/toys.jpg", slug: "toys" },
  { name: "Sports", image: "/images/sports.jpg", slug: "sports" },
  { name: "Groceries", image: "/images/groceries.jpg", slug: "groceries" },
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <Link href={`/categories/${category.slug}`} key={category.slug}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden rounded-lg shadow-md group"
          >
            <Image
              src={"/noimage.jpg"}
              alt={category.name}
              width={200}
              height={200}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <h3 className="absolute bottom-2 left-2 text-white font-semibold text-lg">
              {category.name}
            </h3>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
