"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { products } from "@/data/products";
import { useUIStore } from "@/store/uiStore";
import Link from "next/link";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedQuery = useDebounce(query, 200);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const closeSearch = useUIStore((s) => s.closeSearch);

  const suggestions = debouncedQuery.length > 1
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            p.tags.some((t) =>
              t.toLowerCase().includes(debouncedQuery.toLowerCase())
            )
        )
        .slice(0, 6)
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?q=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
      closeSearch();
    }
  };

  return (
    <div ref={wrapperRef} className="relative flex-1 max-w-3xl">
      <form onSubmit={handleSubmit} className="flex">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search NovaMart"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          className="w-full h-10 px-4 rounded-l-md border-0 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
        />
        <button
          type="submit"
          className="h-10 px-4 bg-[#FF9900] hover:bg-[#FFa31a] rounded-r-md transition-colors"
        >
          <Search className="w-5 h-5 text-gray-900" />
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-md shadow-lg z-50 mt-0.5">
          {suggestions.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              onClick={() => {
                setShowSuggestions(false);
                setQuery("");
                closeSearch();
              }}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-sm text-gray-700"
            >
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="truncate">{product.name}</span>
              <span className="text-xs text-gray-400 ml-auto shrink-0">
                in {product.category}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
