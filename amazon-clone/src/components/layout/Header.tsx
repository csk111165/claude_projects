"use client";

import Link from "next/link";
import { ShoppingCart, User, Menu, MapPin } from "lucide-react";
import SearchBar from "./SearchBar";
import MegaMenu from "./MegaMenu";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";
import { useEffect, useState } from "react";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems);
  const { user, isAuthenticated } = useAuthStore();
  const { toggleCart, toggleMobileMenu } = useUIStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartCount = mounted ? totalItems() : 0;

  return (
    <header className={`sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-md" : ""}`}>
      {/* Main Header */}
      <div className="bg-[#131921] text-white">
        <div className="max-w-[1500px] mx-auto px-4 flex items-center gap-4 h-[60px]">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-1 hover:text-[#FF9900] transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-1 shrink-0 hover:outline hover:outline-1 hover:outline-white rounded-sm px-2 py-1 -mx-2"
          >
            <span className="text-xl font-bold">
              Nova<span className="text-[#FF9900]">Mart</span>
            </span>
          </Link>

          {/* Deliver To */}
          <div className="hidden lg:flex items-center gap-1 text-sm shrink-0 hover:outline hover:outline-1 hover:outline-white rounded-sm px-2 py-1 cursor-pointer">
            <MapPin className="w-5 h-5 text-white" />
            <div>
              <p className="text-xs text-gray-300">Deliver to</p>
              <p className="font-bold text-sm">United States</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1">
            <SearchBar />
          </div>

          {/* Account */}
          <Link
            href={isAuthenticated ? "/account" : "/auth/signin"}
            className="hidden sm:block text-sm shrink-0 hover:outline hover:outline-1 hover:outline-white rounded-sm px-2 py-1"
          >
            <p className="text-xs text-gray-300">
              Hello, {isAuthenticated && mounted ? user?.name : "sign in"}
            </p>
            <p className="font-bold text-sm">Account & Lists</p>
          </Link>

          {/* Orders */}
          <Link
            href="/account/orders"
            className="hidden sm:block text-sm shrink-0 hover:outline hover:outline-1 hover:outline-white rounded-sm px-2 py-1"
          >
            <p className="text-xs text-gray-300">Returns</p>
            <p className="font-bold text-sm">& Orders</p>
          </Link>

          {/* Cart */}
          <button
            onClick={toggleCart}
            className="flex items-center gap-1 hover:outline hover:outline-1 hover:outline-white rounded-sm px-2 py-1 relative"
          >
            <div className="relative">
              <ShoppingCart className="w-7 h-7" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF9900] text-[#131921] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-bold text-sm">Cart</span>
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-2">
          <SearchBar />
        </div>
      </div>

      {/* Sub Header / Navigation Bar */}
      <div className="bg-[#232F3E] text-white">
        <div className="max-w-[1500px] mx-auto px-4 flex items-center gap-4 h-[40px] text-sm overflow-x-auto scrollbar-hide">
          <MegaMenu />
          <Link href="/products" className="hover:text-[#FF9900] transition-colors whitespace-nowrap">
            All Products
          </Link>
          <Link href="/products?sort=newest" className="hover:text-[#FF9900] transition-colors whitespace-nowrap">
            New Arrivals
          </Link>
          <Link href="/products?sort=rating" className="hover:text-[#FF9900] transition-colors whitespace-nowrap">
            Best Sellers
          </Link>
          <Link href="/category/electronics" className="hover:text-[#FF9900] transition-colors whitespace-nowrap">
            Electronics
          </Link>
          <Link href="/category/clothing" className="hover:text-[#FF9900] transition-colors whitespace-nowrap">
            Fashion
          </Link>
          <Link href="/category/home-kitchen" className="hover:text-[#FF9900] transition-colors whitespace-nowrap">
            Home
          </Link>
          <Link href="/category/books" className="hover:text-[#FF9900] transition-colors whitespace-nowrap">
            Books
          </Link>
        </div>
      </div>
    </header>
  );
}
