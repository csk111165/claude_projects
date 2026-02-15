"use client";

import { useState, useEffect } from "react";
import { Home, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";

export default function BottomNav() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.totalItems);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = mounted ? totalItems() : 0;

  const tabs = [
    { href: "/", icon: Home, label: "Home", active: pathname === "/" },
    {
      href: "/products",
      icon: Search,
      label: "Explore",
      active: pathname === "/products" || pathname.startsWith("/category"),
    },
    {
      href: "/cart",
      icon: ShoppingCart,
      label: "Cart",
      active: pathname === "/cart",
      badge: cartCount,
    },
    {
      href: isAuthenticated ? "/account" : "/auth/signin",
      icon: User,
      label: "Account",
      active: pathname.startsWith("/account") || pathname.startsWith("/auth"),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] md:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-14">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center justify-center flex-1 h-full relative transition-colors ${
              tab.active ? "text-[#FF9900]" : "text-gray-500"
            }`}
          >
            <div className="relative">
              <tab.icon className="w-5 h-5" />
              {tab.badge && tab.badge > 0 && (
                <span className="absolute -top-1.5 -right-2.5 bg-[#FF9900] text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                  {tab.badge > 99 ? "99+" : tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 font-medium">{tab.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
