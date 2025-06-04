"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/store/cart";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CartPage() {
  const router = useRouter();
  const { cart, increaseQuantity, decreaseQuantity, removeItem } =
    useCartStore();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <h1 className="text-2xl font-semibold mb-4">Your cart is empty 🛒</h1>
        <Button onClick={() => router.push("/")}>Back to Shop</Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col min-h-[80vh]">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
      <div className="space-y-4 flex-1 pb-4">
        {cart.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex items-center justify-between p-4 gap-4">
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="object-contain"
                  priority
                />
                <div>
                  <h2 className="font-medium text-base line-clamp-2">
                    {item.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    ฿{item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </Button>
                <span className="w-6 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  className="text-destructive"
                >
                  <TrashIcon className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="sticky bottom-0 bg-white py-4 border-t z-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
          <p className="text-lg sm:text-xl font-medium">
            Total:
            <span className="font-bold">
              ฿
              {totalPrice.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
            </span>
          </p>
          <Button className="w-full sm:w-auto">Proceed to Checkout</Button>
        </div>
      </div>
    </div>
  );
}
