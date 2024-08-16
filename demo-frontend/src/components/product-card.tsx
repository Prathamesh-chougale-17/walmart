import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ProductProps = {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
  };
};

export default function ProductCard({ product }: ProductProps) {
  return (
    <Card className="w-[300px]">
      <CardContent className="p-4">
        <Image
          src={product.image}
          alt={product.name}
          width={280}
          height={200}
          className="rounded-md object-cover"
        />
        <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
        <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
