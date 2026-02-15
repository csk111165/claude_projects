"use client";

import { SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import ProductFilters from "./ProductFilters";

export default function MobileFilterDrawer() {
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "";
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentRating = searchParams.get("rating") || "";
  const currentBrand = searchParams.get("brand") || "";

  // Count active filters
  let activeFilterCount = 0;
  if (currentCategory) activeFilterCount++;
  if (currentMinPrice) activeFilterCount++;
  if (currentRating) activeFilterCount++;
  if (currentBrand) activeFilterCount++;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors relative">
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#FF9900] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
              {activeFilterCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[80vh] rounded-t-2xl">
        <SheetHeader className="border-b border-gray-200 pb-3">
          <SheetTitle className="text-lg">Filters</SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto flex-1 px-4 py-4">
          <ProductFilters />
        </div>
        <SheetFooter className="border-t border-gray-200 pt-3">
          <SheetClose asChild>
            <button className="w-full py-3 bg-[#FF9900] text-white font-semibold rounded-lg hover:bg-[#e88a00] transition-colors">
              Apply Filters
            </button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
