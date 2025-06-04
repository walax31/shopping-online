"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCartIcon, HeartIcon, PuzzleIcon, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";

const navItems = [
  { href: "/", label: "Home" },
  {
    href: "/cart",
    label: "Cart",
    icon: <ShoppingCartIcon className="size-4" />,
  },
  {
    href: "/favorite",
    label: "Favorite",
    icon: <HeartIcon className="size-4" />,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white px-4 py-3 md:px-6">
      <nav className="flex items-center justify-between max-w-6xl mx-auto">
        {/* LOGO */}
        <Link
          href="/"
          className="text-xl font-bold flex gap-2 items-center text-black"
        >
          <PuzzleIcon className="size-5" />
          Noblue
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "text-sm font-medium flex items-center gap-1 hover:underline transition",
                  isClient && pathname === item.href
                    ? "text-black"
                    : "text-muted-foreground"
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="space-y-4 px-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 text-base font-medium hover:text-black transition",
                      pathname === item.href
                        ? "text-black"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
