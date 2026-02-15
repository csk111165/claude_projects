import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="max-w-[1500px] mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-medium text-gray-700 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been
        removed, renamed, or doesn&apos;t exist.
      </p>
      <div className="flex gap-3 justify-center">
        <Button asChild variant="outline">
          <Link href="/products">Browse Products</Link>
        </Button>
        <Button asChild className="bg-[#FF9900] hover:bg-[#FFa31a] text-black">
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
