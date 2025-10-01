'use client'
import React, { useState, useEffect, use } from 'react'
import { Star, Heart, Share2, Truck, Shield, RotateCcw, ArrowLeft, Loader2, Package, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

// API call to get specific product by ID
const getProductById = async (id) => {
  try {
    const res = await fetch(`/api/products/${id}`, { cache: "no-store" });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch product. Status: ${res.status}`);
    }
    
    const data = await res.json();
    console.log("Fetched Product:", data);
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

// Alternative: Get all products and find specific one
const getAllProductsAndFind = async (id) => {
  try {
    const res = await fetch("/api/products", { cache: "no-store" });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch products. Status: ${res.status}`);
    }
    
    const data = await res.json();
    console.log("All Products:", data);
    
    // Find specific product by ID - handle both data.data and direct data structures
    const products = data.data || data;
    const product = products.find(p => p._id === id);
    return product || null;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

// Get related products
const getRelatedProducts = async (category, currentProductId) => {
  try {
    const res = await fetch("/api/products", { cache: "no-store" });
    
    if (!res.ok) {
      return [];
    }
    
    const data = await res.json();
    const products = data.data || data;
    
    return products
      .filter(p => p.category === category && p._id !== currentProductId)
      .slice(0, 4);
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
};

export default function ProductDetails({ params }) {
  // Next.js 15: params is now a Promise, need to unwrap it
  const unwrappedParams = use(params);
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);

  // Mock additional images for gallery
  const getProductImages = (mainImage) => {
    return [
      mainImage,
      `${mainImage}&variant=2`,
      `${mainImage}&variant=3`,
      `${mainImage}&variant=4`
    ];
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!unwrappedParams?.id) {
        setError("Product ID not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Direct approach: Get all products and find specific one
        // This avoids the 404 error from /api/products/${id}
        const productData = await getAllProductsAndFind(unwrappedParams.id);
        
        if (productData) {
          setProduct(productData);
          
          // Fetch related products
          if (productData.category) {
            const related = await getRelatedProducts(productData.category, productData._id);
            setRelatedProducts(related);
          }
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to load product");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [unwrappedParams?.id]);

  const renderStars = (rating) => {
    if (!rating) return null;
    
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-warning fill-current"
            : "text-base-300"
        }`}
      />
    ));
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-base-content/70">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-base-content/40 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-base-content mb-2">Product Not Found</h2>
          <p className="text-base-content/70 mb-6">
            {error || "The product you're looking for doesn't exist."}
          </p>
          <Link href="/products" className="btn btn-primary">
            <ArrowLeft className="w-4 h-4" />
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  const productImages = getProductImages(product.image);

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header with Breadcrumb */}
      <div className="bg-base-100 shadow-sm border-b border-base-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4 mt-16">
            <Link href="/products" className="btn btn-ghost btn-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>
          </div>
          
          <div className="text-sm breadcrumbs">
            <ul>
              <li><Link href="/" className="text-primary hover:text-primary-focus">Home</Link></li>
              <li><Link href="/products" className="text-primary hover:text-primary-focus">Products</Link></li>
              {product.category && (
                <li><Link href={`/category/${product.category.toLowerCase()}`} className="text-primary hover:text-primary-focus">{product.category}</Link></li>
              )}
              <li className="text-base-content opacity-70">{product.name}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-0">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Product Images */}
              <div className="p-8">
                <div className="space-y-4">
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-base-200">
                    <img 
                      src={productImages[selectedImageIndex]} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="bg-success text-success-content text-xs px-3 py-1 rounded-full font-medium">
                          NEW
                        </span>
                      )}
                      {product.isFeatured && (
                        <span className="bg-primary text-primary-content text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" />
                          FEATURED
                        </span>
                      )}
                      {product.discount > 0 && (
                        <span className="bg-error text-error-content text-xs px-3 py-1 rounded-full font-medium">
                          -{product.discount}%
                        </span>
                      )}
                    </div>

                    {/* Image Navigation */}
                    {productImages.length > 1 && (
                      <>
                        <button 
                          onClick={() => setSelectedImageIndex((prev) => prev === 0 ? productImages.length - 1 : prev - 1)}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 btn btn-circle btn-sm bg-base-100/80 backdrop-blur-sm border-none hover:bg-base-100"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setSelectedImageIndex((prev) => prev === productImages.length - 1 ? 0 : prev + 1)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 btn btn-circle btn-sm bg-base-100/80 backdrop-blur-sm border-none hover:bg-base-100"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* Thumbnail Gallery */}
                  <div className="flex gap-2 justify-center">
                    {productImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImageIndex === index 
                            ? 'border-primary' 
                            : 'border-base-300 hover:border-primary/50'
                        }`}
                      >
                        <img 
                          src={image}
                          alt={`${product.name} view ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/placeholder-image.jpg';
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-8 border-l border-base-300">
                <div className="space-y-6">
                  {/* Product Title and Brand */}
                  <div>
                    {product.brand && (
                      <div className="badge badge-outline badge-lg mb-3">{product.brand}</div>
                    )}
                    <h1 className="text-3xl lg:text-4xl font-bold text-base-content mb-3">
                      {product.name}
                    </h1>
                    
                    {/* Rating and Reviews */}
                    {product.rating && (
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center gap-1">
                          {renderStars(product.rating)}
                        </div>
                        <span className="text-lg font-semibold text-base-content">{product.rating}</span>
                        {product.reviews && (
                          <span className="text-base-content/60">
                            ({product.reviews} reviews)
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Price Section */}
                  <div className="flex items-baseline gap-4 p-4 bg-base-200 rounded-xl">
                    <span className="text-4xl font-bold text-primary">
                      ${product.price}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-2xl text-base-content/50 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                    {product.discount > 0 && product.originalPrice && (
                      <div className="badge badge-success badge-lg">
                        Save ${(product.originalPrice - product.price).toFixed(2)}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {product.description && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Description</h3>
                      <p className="text-base-content/80 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  )}

                  {/* Features */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">What's Included</h3>
                    <div className="grid gap-3">
                      <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                        <Truck className="w-5 h-5 text-primary flex-shrink-0" />
                        <div className="min-w-0">
                          <h4 className="font-medium text-sm">Free Shipping</h4>
                          <p className="text-xs text-base-content/60">On orders over $50</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                        <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                        <div className="min-w-0">
                          <h4 className="font-medium text-sm">2 Year Warranty</h4>
                          <p className="text-xs text-base-content/60">Full coverage included</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                        <RotateCcw className="w-5 h-5 text-primary flex-shrink-0" />
                        <div className="min-w-0">
                          <h4 className="font-medium text-sm">30 Day Returns</h4>
                          <p className="text-xs text-base-content/60">Easy returns & exchanges</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4 pt-4 border-t border-base-300">
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setIsFavorited(!isFavorited)}
                        className={`btn btn-outline flex-1 ${isFavorited ? 'btn-error' : ''}`}
                      >
                        <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                        {isFavorited ? 'Favorited' : 'Add to Wishlist'}
                      </button>
                      <button className="btn btn-outline">
                        <Share2 className="w-5 h-5" />
                        Share
                      </button>
                    </div>
                  </div>

                  {/* Product Meta */}
                  <div className="space-y-3 text-sm pt-4 border-t border-base-300">
                    {product.category && (
                      <div className="flex justify-between">
                        <span className="text-base-content/60">Category:</span>
                        <span className="font-medium">{product.category}</span>
                      </div>
                    )}
                    {product.brand && (
                      <div className="flex justify-between">
                        <span className="text-base-content/60">Brand:</span>
                        <span className="font-medium">{product.brand}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-base-content/60">SKU:</span>
                      <span className="font-medium font-mono">{product._id?.slice(-8).toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-content/60">Availability:</span>
                      <span className="font-medium text-success">In Stock</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="card bg-base-100 shadow-xl border border-base-300 mt-8">
          <div className="card-body">
            <div className="tabs tabs-bordered tabs-lg">
              <button 
                className={`tab ${activeTab === 'description' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button 
                className={`tab ${activeTab === 'specifications' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('specifications')}
              >
                Specifications
              </button>
              <button 
                className={`tab ${activeTab === 'reviews' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews {product.reviews && `(${product.reviews})`}
              </button>
            </div>
            
            <div className="mt-6">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <h3 className="text-xl font-bold mb-4">Product Description</h3>
                  <p className="text-base-content/80 leading-relaxed mb-6">
                    {product.description || "No description available for this product."}
                  </p>
                  <h4 className="text-lg font-semibold mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    <li>• Premium build quality with durable materials</li>
                    <li>• Advanced technology implementation</li>
                    <li>• Long-lasting performance and reliability</li>
                    <li>• User-friendly design and interface</li>
                    <li>• High-quality standards and certifications</li>
                    <li>• Modern connectivity and compatibility options</li>
                  </ul>
                </div>
              )}
              
              {activeTab === 'specifications' && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Technical Specifications</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-base-300">
                        <span className="font-medium">Brand</span>
                        <span>{product.brand || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-base-300">
                        <span className="font-medium">Category</span>
                        <span>{product.category || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-base-300">
                        <span className="font-medium">Model</span>
                        <span>{product._id?.slice(-6).toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-base-300">
                        <span className="font-medium">Weight</span>
                        <span>1.2 kg</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-base-300">
                        <span className="font-medium">Dimensions</span>
                        <span>25×20×8 cm</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-base-300">
                        <span className="font-medium">Warranty</span>
                        <span>2 Years</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
                  <div className="text-center py-8 text-base-content/60">
                    <Star className="w-12 h-12 mx-auto mb-3 text-base-content/30" />
                    <p>No reviews yet. Be the first to review this product!</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-base-content mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300 hover:border-primary/30">
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <Link 
                      href={`/products/${relatedProduct._id}`}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300"
                    >
                      <Eye className="w-6 h-6 text-white" />
                    </Link>
                  </div>
                  <div className="card-body p-4">
                    <h3 className="font-semibold text-base-content line-clamp-1">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {renderStars(relatedProduct.rating)}
                      </div>
                      <span className="text-sm">{relatedProduct.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        ${relatedProduct.price}
                      </span>
                      <Link 
                        href={`/products/${relatedProduct._id}`}
                        className="btn btn-primary btn-sm"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}