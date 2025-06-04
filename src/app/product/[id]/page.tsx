"use client";

import { useParams, useRouter } from "next/navigation";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cart";
import { useFavoriteStore } from "@/store/favorite";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  ShoppingCartIcon,
  HeartIcon,
  StarIcon,
} from "lucide-react";
import { toast } from "sonner";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  const { addToCart } = useCartStore();
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();

  if (!product)
    return <div className="p-10 text-center">Product not found.</div>;

  const favorite = isFavorite(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Added to cart");
  };

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFavorite(product.id);
      toast.success("Removed from favorites");
    } else {
      addFavorite(product);
      toast.success("Added to favorites");
    }
  };

  const renderStars = (rate: number) => {
    const fullStars = Math.floor(rate);
    return Array.from({ length: 5 }).map((_, i) => (
      <StarIcon
        key={i}
        className={clsx(
          "size-4.5",
          i < fullStars ? "fill-amber-400 text-amber-400" : "text-gray-300"
        )}
      />
    ));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div>
        <Button onClick={() => router.back()} variant="ghost" className="">
          <ArrowLeftIcon className="w-4 h-4" />
          Back
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center justify-center md:p-6 p-4 flex-1">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="rounded object-contain"
          />
        </div>
        <div className="flex flex-col gap-10 md:p-6 p-4 flex-1 ">
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground mt-2">{product.desc}</p>
            <p className="mt-4 text-xl font-semibold text-black">
              ฿{product.price.toLocaleString()}
            </p>
            <div className="text-sm text-gray-500 mt-1 flex items-center gap-1">
              {renderStars(product.rating.rate)}
              <span className="ml-2">
                {product.rating.rate} ({product.rating.count} Reviews)
              </span>
            </div>
          </div>
          <div className="flex gap-3 justify-between flex-wrap sm:flex-nowrap">
            <Button
              onClick={handleAddToCart}
              className="flex-1 gap-2 w-5"
              variant="outline"
            >
              <ShoppingCartIcon className="w-4 h-4" />
              Add to cart
            </Button>
            <Button onClick={handleToggleFavorite} variant="outline">
              <HeartIcon
                className={cn(
                  "w-5 h-5",
                  favorite && "fill-red-600 text-red-600"
                )}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
