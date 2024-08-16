"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { Button } from "./ui/button";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            WalmartAi
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <SearchBar />
            <Button variant="ghost">
              <User />
            </Button>
            <Button variant="ghost">
              <ShoppingCart />
            </Button>
          </div>
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu />
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden p-4"
        >
          <SearchBar />
          <div className="mt-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <User /> Account
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <ShoppingCart /> Cart
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
