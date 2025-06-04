"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { HeartIcon } from "lucide-react";
import { useFavoriteStore } from "@/store/favorite";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
            className="group transition hover:shadow-lg relative overflow-hidden"
          >
            <CardHeader className="absolute top-2 right-5 z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  removeFavorite(product.id);
                  toast.success("Removed from favorite");
                }}
                aria-label="Remove from favorites"
              >
                <HeartIcon className="w-5 h-5 fill-red-600 text-red-600" />
              </Button>
            </CardHeader>
            <Link href={`/product/${product.id}`} className="block">
              <CardContent className="p-4 flex flex-col gap-3">
                <AspectRatio ratio={1}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain rounded bg-white dark:bg-zinc-900"
                    sizes="(min-width: 768px) 200px, 100vw"
                    priority
                  />
                </AspectRatio>
                <div>
                  <h2 className="text-sm font-semibold line-clamp-1">
                    {product.name}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    ฿
                    {Number(product.price).toLocaleString("th-TH", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
