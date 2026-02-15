import Foundation

let mockCategories: [Category] = [
    Category(id: "cat-1", name: "Electronics", slug: "electronics", image: "https://picsum.photos/seed/electronics/400/300", subcategories: [
        Subcategory(id: "sub-1-1", name: "Smartphones", slug: "smartphones"),
        Subcategory(id: "sub-1-2", name: "Laptops", slug: "laptops"),
        Subcategory(id: "sub-1-3", name: "Headphones", slug: "headphones"),
        Subcategory(id: "sub-1-4", name: "Cameras", slug: "cameras"),
        Subcategory(id: "sub-1-5", name: "Tablets", slug: "tablets"),
        Subcategory(id: "sub-1-6", name: "Smart Home", slug: "smart-home"),
    ]),
    Category(id: "cat-2", name: "Clothing", slug: "clothing", image: "https://picsum.photos/seed/clothing/400/300", subcategories: [
        Subcategory(id: "sub-2-1", name: "Men's Fashion", slug: "mens-fashion"),
        Subcategory(id: "sub-2-2", name: "Women's Fashion", slug: "womens-fashion"),
        Subcategory(id: "sub-2-3", name: "Kids' Clothing", slug: "kids-clothing"),
        Subcategory(id: "sub-2-4", name: "Shoes", slug: "shoes"),
        Subcategory(id: "sub-2-5", name: "Accessories", slug: "accessories"),
    ]),
    Category(id: "cat-3", name: "Home & Kitchen", slug: "home-kitchen", image: "https://picsum.photos/seed/homekitchen/400/300", subcategories: [
        Subcategory(id: "sub-3-1", name: "Furniture", slug: "furniture"),
        Subcategory(id: "sub-3-2", name: "Kitchen Appliances", slug: "kitchen-appliances"),
        Subcategory(id: "sub-3-3", name: "Bedding", slug: "bedding"),
        Subcategory(id: "sub-3-4", name: "Decor", slug: "decor"),
        Subcategory(id: "sub-3-5", name: "Storage", slug: "storage"),
    ]),
    Category(id: "cat-4", name: "Books", slug: "books", image: "https://picsum.photos/seed/books/400/300", subcategories: [
        Subcategory(id: "sub-4-1", name: "Fiction", slug: "fiction"),
        Subcategory(id: "sub-4-2", name: "Non-Fiction", slug: "non-fiction"),
        Subcategory(id: "sub-4-3", name: "Science & Tech", slug: "science-tech"),
        Subcategory(id: "sub-4-4", name: "Children's Books", slug: "childrens-books"),
        Subcategory(id: "sub-4-5", name: "Textbooks", slug: "textbooks"),
    ]),
    Category(id: "cat-5", name: "Sports & Outdoors", slug: "sports-outdoors", image: "https://picsum.photos/seed/sports/400/300", subcategories: [
        Subcategory(id: "sub-5-1", name: "Exercise Equipment", slug: "exercise-equipment"),
        Subcategory(id: "sub-5-2", name: "Outdoor Recreation", slug: "outdoor-recreation"),
        Subcategory(id: "sub-5-3", name: "Team Sports", slug: "team-sports"),
        Subcategory(id: "sub-5-4", name: "Cycling", slug: "cycling"),
        Subcategory(id: "sub-5-5", name: "Camping", slug: "camping"),
    ]),
    Category(id: "cat-6", name: "Beauty", slug: "beauty", image: "https://picsum.photos/seed/beauty/400/300", subcategories: [
        Subcategory(id: "sub-6-1", name: "Skincare", slug: "skincare"),
        Subcategory(id: "sub-6-2", name: "Makeup", slug: "makeup"),
        Subcategory(id: "sub-6-3", name: "Hair Care", slug: "hair-care"),
        Subcategory(id: "sub-6-4", name: "Fragrances", slug: "fragrances"),
        Subcategory(id: "sub-6-5", name: "Personal Care", slug: "personal-care"),
    ]),
    Category(id: "cat-7", name: "Toys & Games", slug: "toys-games", image: "https://picsum.photos/seed/toys/400/300", subcategories: [
        Subcategory(id: "sub-7-1", name: "Action Figures", slug: "action-figures"),
        Subcategory(id: "sub-7-2", name: "Board Games", slug: "board-games"),
        Subcategory(id: "sub-7-3", name: "Building Toys", slug: "building-toys"),
        Subcategory(id: "sub-7-4", name: "Dolls", slug: "dolls"),
        Subcategory(id: "sub-7-5", name: "Educational", slug: "educational"),
    ]),
    Category(id: "cat-8", name: "Automotive", slug: "automotive", image: "https://picsum.photos/seed/automotive/400/300", subcategories: [
        Subcategory(id: "sub-8-1", name: "Car Electronics", slug: "car-electronics"),
        Subcategory(id: "sub-8-2", name: "Interior Accessories", slug: "interior-accessories"),
        Subcategory(id: "sub-8-3", name: "Exterior Accessories", slug: "exterior-accessories"),
        Subcategory(id: "sub-8-4", name: "Tools & Equipment", slug: "tools-equipment"),
        Subcategory(id: "sub-8-5", name: "Car Care", slug: "car-care"),
    ]),
]
