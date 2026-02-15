"use client";

import { X, User, Package, Heart, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useUIStore } from "@/store/uiStore";
import { useAuthStore } from "@/store/authStore";
import { categories } from "@/data/categories";
import { Separator } from "@/components/ui/separator";

export default function MobileNav() {
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();
  const { user, isAuthenticated } = useAuthStore();

  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={closeMobileMenu}>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="bg-[#232F3E] text-white p-4">
          <SheetTitle className="text-white flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <span>
              {isAuthenticated ? `Hello, ${user?.name}` : "Hello, Sign In"}
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="overflow-y-auto h-full pb-20">
          <div className="p-4">
            <h3 className="font-bold text-sm text-gray-900 mb-2">
              Shop By Category
            </h3>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                onClick={closeMobileMenu}
                className="flex items-center justify-between py-2.5 text-sm text-gray-700 hover:text-[#FF9900]"
              >
                <span>{category.name}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            ))}
          </div>

          <Separator />

          <div className="p-4">
            <h3 className="font-bold text-sm text-gray-900 mb-2">
              Your Account
            </h3>
            {!isAuthenticated ? (
              <Link
                href="/auth/signin"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 py-2.5 text-sm text-gray-700 hover:text-[#FF9900]"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/account"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 py-2.5 text-sm text-gray-700 hover:text-[#FF9900]"
                >
                  <User className="w-4 h-4" />
                  <span>Your Account</span>
                </Link>
                <Link
                  href="/account/orders"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 py-2.5 text-sm text-gray-700 hover:text-[#FF9900]"
                >
                  <Package className="w-4 h-4" />
                  <span>Your Orders</span>
                </Link>
              </>
            )}
          </div>

          <Separator />

          <div className="p-4">
            <Link
              href="/products"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 py-2.5 text-sm text-gray-700 hover:text-[#FF9900]"
            >
              <Heart className="w-4 h-4" />
              <span>Browse All Products</span>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
