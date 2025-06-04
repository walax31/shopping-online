"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { HeartIcon } from "lucide-react";
import { useFavoriteStore } from "@/store/favorite";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function FavoritePage() {
  const router = useRouter();
  const { favorites, removeFavorite } = useFavoriteStore();

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <h1 className="text-2xl font-semibold mb-4">No Favorites yet ❤️</h1>
        <Button onClick={() => router.push("/")}>Back to Shop</Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Your Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favorites.map((product) => (
          <Card
            key={product.id}
            className="group transition hover:shadow-md gap-2"
          >
            <CardHeader className="px-6 flex justify-end">
              <Button
                variant="secondary"
                size="icon"
                onClick={() => {
                  removeFavorite(product.id);
                  toast.success("Removed from favorite");
                }}
              >
                <HeartIcon className="w-5 h-5 fill-red-600 text-red-600" />
              </Button>
            </CardHeader>
            <Link href={`/product/${product.id}`}>
              <CardContent>
                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-[200px] h-[200px]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                      sizes="(min-width: 768px) 200px, 100vw"
                      priority
                    />
                  </div>
                </div>
                <h2 className="text-sm font-medium line-clamp-1">
                  {product.name}
                </h2>
                <p className="text-muted-foreground text-sm mb-2">
                  ฿
                  {Number(product.price).toLocaleString("th-TH", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
