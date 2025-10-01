"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Grid3X3,
  List,
  Star,
  Heart,
  ShoppingCart,
  Eye,
  ChevronDown,
  Loader2,
  Package,
} from "lucide-react";
import Link from "next/link";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [filterCategory, setFilterCategory] = useState("all");
  const [favorites, setFavorites] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // ✅ API call function
  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", { cache: "no-store" });

      if (!res.ok) {
        throw new Error(`Failed to fetch products. Status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Fetched Products:", data);
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await getProducts();
      setProducts(data.data);
      setLoading(false);
    };

    loadProducts();
  }, []);
  
  // filter + sort
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        filterCategory === "all" || product.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1;
        case "featured":
          return b.isFeatured === a.isFeatured ? 0 : b.isFeatured ? 1 : -1;
        default:
          return 0;
      }
    });

  // ✅ Fixed Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterCategory, sortBy]);

  const categories = [
    "all",
    ...new Set(products.map((p) => p.category)),
  ];

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  // product card (inner component) - Fixed with DaisyUI and equal heights
  const ProductCard = ({ product }) => (
    <div className="group  card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300 hover:border-primary/30 h-full flex flex-col">
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-success text-success-content text-xs px-2 py-1 rounded-full font-medium">
              NEW
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-primary text-primary-content text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
              <Star className="w-3 h-3" />
              FEATURED
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-error text-error-content text-xs px-2 py-1 rounded-full font-medium">
              -{product.discount}%
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => toggleFavorite(product._id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors duration-200 ${
              favorites.has(product._id)
                ? "bg-error text-error-content"
                : "bg-base-100/80 text-base-content hover:bg-error hover:text-error-content"
            }`}
          >
            <Heart className="w-4 h-4" />
          </button>
          <Link href={`/products/${product._id}`} className="p-2 rounded-full bg-base-100/80 backdrop-blur-sm text-base-content hover:bg-neutral hover:text-neutral-content transition-colors duration-200">
            <Eye className="w-4 h-4" />
          </Link>
        </div>

       
      </div>

      <div className="card-body p-4 flex-grow flex flex-col justify-between">
        <div className="flex-grow">
          <div className="mb-2">
            <span className="text-xs text-base-content/60 font-medium uppercase tracking-wide">
              {product.brand}
            </span>
          </div>

          <h3 className="font-semibold text-base-content mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {product.name}
          </h3>

          <p className="text-sm text-base-content/70 mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "text-warning fill-current"
                      : "text-base-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-base-content">
              {product.rating}
            </span>
            <span className="text-xs text-base-content/60">({product.reviews})</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-base-content">
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-base-content/60 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <span className="text-xs text-success font-medium bg-success/10 px-2 py-1 rounded">
            Free Shipping
          </span>
        </div>
      </div>
    </div>
  );

  // main return
  return (
    <div className="min-h-screen bg-base-200">
      {/* Header Section */}
      <div className="bg-base-100 shadow-sm border-b border-base-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mt-20 gap-6">
            <div>
              <h1 className="text-3xl font-bold text-base-content mb-2">
                All Products
              </h1>
              <p className="text-base-content/70">
                Discover our complete collection of premium products
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {products.length}
                </div>
                <div className="text-xs text-base-content/60 uppercase tracking-wide">
                  Products
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">4.7</div>
                <div className="text-xs text-base-content/60 uppercase tracking-wide">
                  Avg Rating
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">50+</div>
                <div className="text-xs text-base-content/60 uppercase tracking-wide">
                  Brands
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters + Results */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="card bg-base-100 shadow-sm border border-base-300 mb-8">
          <div className="card-body p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/60" />
                <input
                  type="text"
                  placeholder="Search products, brands, categories..."
                  className="w-full pl-10 pr-4 py-3 border border-base-300 bg-base-100 text-base-content rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="relative">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="appearance-none bg-base-100 border border-base-300 text-base-content rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/60 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-base-100 border border-base-300 text-base-content rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/60 pointer-events-none" />
              </div>

             
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-base-content/70">Loading awesome products...</p>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-base-content/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-base-content mb-2">
              No products found
            </h3>
            <p className="text-base-content/70 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterCategory("all");
              }}
              className="bg-primary text-primary-content px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-base-content/60">
              Showing {Math.min(filteredProducts.length, startIndex + 1)}-
              {Math.min(filteredProducts.length, startIndex + productsPerPage)} of{" "}
              {filteredProducts.length} products
            </div>
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {currentProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </>
        )}
        
        {/* Pagination Controls */}
        {filteredProducts.length > productsPerPage && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-base-300 text-base-content bg-base-100 hover:bg-base-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Previous
            </button>

            <div className="md:flex hidden items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg transition-colors duration-200 ${
                    currentPage === page
                      ? "bg-primary text-primary-content"
                      : "border border-base-300 text-base-content bg-base-100 hover:bg-base-200"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-base-300 text-base-content bg-base-100 hover:bg-base-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}