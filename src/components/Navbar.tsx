"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCartIcon, HeartIcon, PuzzleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  {
    href: "/cart",
    icon: <ShoppingCartIcon className="w-4 h-4" />,
  },
  {
    href: "/favorite",
    icon: <HeartIcon className="w-4 h-4" />,
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
        <Link href="/" className="text-xl">
          <div className="font-bold text-black flex gap-2">
            <PuzzleIcon />
            Noblue
          </div>
        </Link>
        <ul className="flex items-center gap-4">
          {navItems.map((item) => (
            <li key={item.href} className="flex gap-3 w-full">
              <Link
                href={item.href}
                className={cn(
                  "text-sm font-medium flex items-center gap-1 hover:underline",
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
      </nav>
    </header>
  );
}
