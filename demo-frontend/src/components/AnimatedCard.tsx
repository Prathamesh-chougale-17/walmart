"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function AnimatedCard({ product }: { product: Product }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <Image
            src={"/noimage.jpg"}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover mb-4 rounded"
          />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Add to Cart</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
