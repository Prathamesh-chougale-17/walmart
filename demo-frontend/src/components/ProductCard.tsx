import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  relevance: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0">
        <Image
          src={"/product.jpg"}
          alt={product.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
        <Link href={`/product/${product.id}`} passHref>
          <Button className="w-full">View Product</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
