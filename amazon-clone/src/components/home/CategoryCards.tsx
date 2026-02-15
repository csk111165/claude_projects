import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";

export default function CategoryCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/category/${category.slug}`}
          className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow group"
        >
          <h3 className="font-bold text-base text-gray-900 mb-2">
            {category.name}
          </h3>
          <div className="relative aspect-[4/3] bg-gray-50 rounded-md overflow-hidden">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
          <p className="text-sm text-blue-600 mt-2 group-hover:text-[#FF9900] transition-colors">
            Shop now
          </p>
        </Link>
      ))}
    </div>
  );
}
