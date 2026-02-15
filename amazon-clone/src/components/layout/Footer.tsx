"use client";

import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer>
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-full bg-[#37475A] hover:bg-[#485769] text-white text-sm py-3 transition-colors"
      >
        Back to top
      </button>

      {/* Main Footer */}
      <div className="bg-[#232F3E] text-white">
        <div className="max-w-[1500px] mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-base mb-3">Get to Know Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/" className="hover:underline">About NovaMart</Link></li>
              <li><Link href="/" className="hover:underline">Careers</Link></li>
              <li><Link href="/" className="hover:underline">Press Releases</Link></li>
              <li><Link href="/" className="hover:underline">NovaMart Science</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-base mb-3">Make Money with Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/" className="hover:underline">Sell products on NovaMart</Link></li>
              <li><Link href="/" className="hover:underline">Become an Affiliate</Link></li>
              <li><Link href="/" className="hover:underline">Advertise Your Products</Link></li>
              <li><Link href="/" className="hover:underline">Self-Publish with Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-base mb-3">Let Us Help You</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/account" className="hover:underline">Your Account</Link></li>
              <li><Link href="/account/orders" className="hover:underline">Your Orders</Link></li>
              <li><Link href="/" className="hover:underline">Shipping Rates & Policies</Link></li>
              <li><Link href="/" className="hover:underline">Returns & Replacements</Link></li>
              <li><Link href="/" className="hover:underline">Help</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-base mb-3">Shop Categories</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/category/electronics" className="hover:underline">Electronics</Link></li>
              <li><Link href="/category/clothing" className="hover:underline">Clothing</Link></li>
              <li><Link href="/category/home-kitchen" className="hover:underline">Home & Kitchen</Link></li>
              <li><Link href="/category/books" className="hover:underline">Books</Link></li>
              <li><Link href="/category/sports-outdoors" className="hover:underline">Sports & Outdoors</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#131921] text-white">
        <div className="max-w-[1500px] mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <Link href="/" className="text-lg font-bold text-white">
            Nova<span className="text-[#FF9900]">Mart</span>
          </Link>
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved. This is a demo site.</p>
        </div>
      </div>
    </footer>
  );
}
