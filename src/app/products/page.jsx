"use client"
import React, { useState, useEffect } from 'react';
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
  Package
} from 'lucide-react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [filterCategory, setFilterCategory] = useState('all');
  const [favorites, setFavorites] = useState(new Set());

  // // mock API call
  // const getProducts = async () => {
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //   return [
  //     {
  //       id: 1,
  //       name: "Premium Wireless Headphones",
  //       price: 299.99,
  //       originalPrice: 399.99,
  //       image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
  //       rating: 4.8,
  //       reviews: 124,
  //       category: "Electronics",
  //       brand: "TechPro",
  //       isNew: true,
  //       isFeatured: true,
  //       discount: 25,
  //       description: "High-quality wireless headphones with noise cancellation"
  //     },
  //     {
  //       id: 2,
  //       name: "Smart Fitness Watch",
  //       price: 199.99,
  //       originalPrice: 249.99,
  //       image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
  //       rating: 4.6,
  //       reviews: 89,
  //       category: "Wearables",
  //       brand: "FitTech",
  //       isNew: false,
  //       isFeatured: true,
  //       discount: 20,
  //       description: "Advanced fitness tracking with heart rate monitoring"
  //     },
  //     {
  //       id: 3,
  //       name: "Organic Coffee Beans",
  //       price: 24.99,
  //       originalPrice: 29.99,
  //       image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300&h=300&fit=crop",
  //       rating: 4.9,
  //       reviews: 203,
  //       category: "Food & Beverage",
  //       brand: "BrewMaster",
  //       isNew: false,
  //       isFeatured: false,
  //       discount: 17,
  //       description: "Premium organic coffee beans, ethically sourced"
  //     },
  //     {
  //       id: 4,
  //       name: "Leather Messenger Bag",
  //       price: 89.99,
  //       originalPrice: 119.99,
  //       image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
  //       rating: 4.7,
  //       reviews: 156,
  //       category: "Fashion",
  //       brand: "StyleCraft",
  //       isNew: true,
  //       isFeatured: false,
  //       discount: 25,
  //       description: "Handcrafted genuine leather messenger bag"
  //     },
  //     {
  //       id: 5,
  //       name: "Wireless Charging Pad",
  //       price: 39.99,
  //       originalPrice: 49.99,
  //       image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop",
  //       rating: 4.4,
  //       reviews: 67,
  //       category: "Electronics",
  //       brand: "ChargePlus",
  //       isNew: false,
  //       isFeatured: true,
  //       discount: 20,
  //       description: "Fast wireless charging for all compatible devices"
  //     },
  //     {
  //       id: 6,
  //       name: "Yoga Mat Premium",
  //       price: 49.99,
  //       originalPrice: 69.99,
  //       image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop",
  //       rating: 4.8,
  //       reviews: 92,
  //       category: "Sports & Fitness",
  //       brand: "ZenFit",
  //       isNew: false,
  //       isFeatured: false,
  //       discount: 29,
  //       description: "Non-slip premium yoga mat with carrying strap"
  //     }
  //   ];
  // };

    // ✅ Real API call
  const getProducts = async () => {
    try {
      const res = await fetch("/api/products"); // server route
      const data = await res.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  // load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // filter + sort
  const filteredProducts = products
    .filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'newest': return b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1;
        case 'featured': return b.isFeatured === a.isFeatured ? 0 : b.isFeatured ? 1 : -1;
        default: return 0;
      }
    });

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  // product card (inner component)
  const ProductCard = ({ product }) => (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              NEW
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
              <Star className="w-3 h-3" />
              FEATURED
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              -{product.discount}%
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => toggleFavorite(product.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors duration-200 ${
              favorites.has(product.id) 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-gray-900 hover:text-white transition-colors duration-200">
            <Eye className="w-4 h-4" />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-full bg-white text-gray-900 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            {product.brand}
          </span>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-900">{product.rating}</span>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <span className="text-xs text-green-600 font-medium">
            Free Shipping
          </span>
        </div>
      </div>
    </div>
  );

  // main return
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mt-20 gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
              <p className="text-gray-600">Discover our complete collection of premium products</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{products.length}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">4.7</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">50+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Brands</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters + Results */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            <div className="flex items-center bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading awesome products...</p>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterCategory('all');
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
