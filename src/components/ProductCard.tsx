"use client";

import { useCartStore } from "@/store/cart";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductItem } from "@/types/product";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
    <Card className="w-full h-full flex flex-col justify-between max-w-sm transition-shadow hover:shadow-lg group">
      <Link href={`/product/${product.id}`} aria-label={`View ${product.name}`}>
        <AspectRatio
          ratio={3 / 2}
          className="bg-white overflow-hidden rounded-t-lg"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        </AspectRatio>
      </Link>

      <CardContent className="flex flex-col gap-2 flex-1 px-4 py-2">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-base font-semibold line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.desc}
          </p>
        </Link>
        <p className="text-lg font-bold text-primary mt-auto">
          ฿{product.price.toLocaleString()}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full"
          aria-label="Add to cart"
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
