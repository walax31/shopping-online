"use client";

import { useCartStore } from "@/store/cart";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductItem } from "@/types/product";

interface ProductCardProps {
  product: ProductItem;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Added to cart");
  };

  return (
    <Card className="w-full h-full flex flex-col justify-between max-w-sm">
      <Link href={`/product/${product.id}`}>
        <div className="relative w-full aspect-[3/2] bg-white">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4"
          />
        </div>
      </Link>
      <CardContent className="flex flex-col gap-1 flex-1">
        <Link href={`/product/${product.id}`}>
          <p className="text-sm font-medium line-clamp-1">{product.name}</p>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {product.desc}
          </p>
          <p className="text-base font-semibold pt-1 block">
            ฿{product.price.toLocaleString()}
          </p>
        </Link>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddToCart} className="w-full" variant="ghost">
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
