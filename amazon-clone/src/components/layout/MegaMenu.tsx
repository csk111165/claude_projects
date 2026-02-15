"use client";

import { useState } from "react";
import { ChevronRight, Menu } from "lucide-react";
import Link from "next/link";
import { categories } from "@/data/categories";

export default function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div
      className="relative"
      onMouseLeave={() => {
        setIsOpen(false);
        setActiveCategory(null);
      }}
    >
      <button
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-white text-sm font-medium hover:text-[#FF9900] transition-colors py-2"
      >
        <Menu className="w-5 h-5" />
        <span>All Categories</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 flex bg-white rounded-b-md shadow-xl z-50 min-w-[600px]">
          <div className="w-64 border-r border-gray-100">
            {categories.map((category) => (
              <div
                key={category.id}
                onMouseEnter={() => setActiveCategory(category.id)}
                className={`flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                  activeCategory === category.id
                    ? "bg-gray-50 text-[#FF9900]"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Link
                  href={`/category/${category.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="flex-1"
                >
                  {category.name}
                </Link>
                <ChevronRight className="w-4 h-4" />
              </div>
            ))}
          </div>

          {activeCategory && (
            <div className="w-72 p-4">
              {categories
                .find((c) => c.id === activeCategory)
                ?.subcategories.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/category/${categories.find((c) => c.id === activeCategory)?.slug}?sub=${sub.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-[#FF9900] hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {sub.name}
                  </Link>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
