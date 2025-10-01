"use client";
import React, { useState, useEffect } from "react";
import {
  Star,
  Heart,
  ShoppingCart,
  Eye,
  TrendingUp,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

export default function product() {
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
      const data = await res.json();
      setProducts(data.data || []);
      setLoading(false); // set state
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  // Scroll detection for animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY > windowHeight * 0.3) {
        setIsVisible(true);
      }
    };

    handleScroll(); // Check initial position
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Product slider auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProductSlide(
        (prev) => (prev + 1) % Math.ceil(products.length / 3)
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [products.length]);

  const toggleLike = (productId) => {
    setLikedProducts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const nextSlide = () => {
    setCurrentProductSlide(
      (prev) => (prev + 1) % Math.ceil(products.length / 3)
    );
  };


  const prevSlide = () => {
    setCurrentProductSlide((prev) =>
      prev === 0 ? Math.ceil(products.length / 3) - 1 : prev - 1
    );
  };

  return (
    <section className="relative py-20 bg-base-200 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full filter blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/20 rounded-full filter blur-xl opacity-60 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="badge badge-lg bg-primary/20 border-primary/30 backdrop-blur-lg mb-6">
            <TrendingUp className="w-4 h-4 text-primary mr-2" />
            <span className="text-base-content font-medium">
              Trending Products
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Featured Products
            </span>
          </h2>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products at unbeatable
            prices
          </p>
        </div>

        {/* Products Slider */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="btn btn-circle btn-ghost bg-base-100 hover:bg-base-200 shadow-lg hover:shadow-xl absolute left-0 top-1/2 -translate-y-1/2 z-20 hover:scale-110 transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 text-base-content group-hover:text-primary" />
          </button>

          <button
            onClick={nextSlide}
            className="btn btn-circle btn-ghost bg-base-100 hover:bg-base-200 shadow-lg hover:shadow-xl absolute right-0 top-1/2 -translate-y-1/2 z-20 hover:scale-110 transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 text-base-content group-hover:text-primary" />
          </button>

          {/* Show loading spinner while products are loading */}
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <p className="text-base-content/70 ml-4">Loading products...</p>
            </div>
          ) : (
            /* Products Grid */
            <div className="overflow-hidden mx-12">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentProductSlide * 100}%)`,
                }}
              >
                {Array.from(
                  { length: Math.ceil(products.length / 3) },
                  (_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="grid md:grid-cols-3 gap-8">
                        {products
                          .slice(slideIndex * 3, (slideIndex + 1) * 3)
                          .map((product, index) => (
                            <div
                              key={index}
                              className={`card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group ${
                                isVisible ? "animate-fade-in-up" : "opacity-0"
                              }`}
                              style={{ animationDelay: `${index * 150}ms` }}
                            >
                              {/* Product Image */}
                              <figure
                                className={`relative h-64 bg-gradient-to-br ${product.gradient} flex items-center justify-center overflow-hidden`}
                              >
                                {/* Badge */}
                                <div
                                  className={`badge ${product.badgeColor} absolute top-4 left-4 font-semibold`}
                                >
                                  {product.badge}
                                </div>

                                {/* Action Buttons */}
                                <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                  <button
                                    onClick={() => toggleLike(product._id)}
                                    className={`btn btn-circle btn-sm ${
                                      likedProducts.has(product._id)
                                        ? "btn-error text-error-content"
                                        : "btn-ghost bg-base-100/20 hover:bg-base-100/30 text-base-100"
                                    } hover:scale-110 transition-all duration-300`}
                                  >
                                    <Heart
                                      className={`w-4 h-4 ${
                                        likedProducts.has(product._id)
                                          ? "fill-current"
                                          : ""
                                      }`}
                                    />
                                  </button>
                                  <button className="btn btn-circle btn-sm btn-ghost bg-base-100/20 hover:bg-base-100/30 text-base-100 hover:scale-110 transition-all duration-300">
                                    <Eye className="w-4 h-4" />
                                  </button>
                                </div>

                                {/* Product Image */}
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                {/* Floating Elements */}
                                <div className="absolute bottom-2 left-2 w-8 h-8 bg-base-100/20 rounded-full animate-bounce"></div>
                                <div className="absolute top-1/2 right-2 w-6 h-6 bg-base-100/20 rounded-full animate-bounce animation-delay-1000"></div>
                              </figure>

                              {/* Product Info */}
                              <div className="card-body">
                                <h2 className="card-title text-base-content group-hover:text-primary transition-colors">
                                  {product.name}
                                </h2>

                                {/* Rating */}
                                <div className="flex items-center space-x-2 mb-4">
                                  <div className="rating rating-sm">
                                    {[...Array(5)].map((_, i) => (
                                      <input
                                        key={i}
                                        type="radio"
                                        className={`mask mask-star-2 ${
                                          i < Math.floor(product.rating || 0)
                                            ? "bg-warning"
                                            : "bg-base-300"
                                        }`}
                                        disabled
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-base-content/70">
                                    {product.rating || 0} (
                                    {product.reviews || 0} reviews)
                                  </span>
                                </div>

                                {/* Price */}
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-2xl font-bold text-primary">
                                      ${product.price}
                                    </span>
                                    {product.originalPrice && (
                                      <span className="text-lg text-base-content/50 line-through">
                                        ${product.originalPrice}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Add to Cart Button */}
                                <div className="card-actions">
                                  <button
                                    className={`btn btn-primary w-full bg-gradient-to-r ${product.gradient} border-none hover:shadow-lg transition-all duration-300 transform hover:scale-105 group`}
                                  >
                                    <span>View Details</span>
                                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Slider Indicators - Only show when not loading */}
          {!loading && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from(
                { length: Math.ceil(products.length / 3) },
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentProductSlide(index)}
                    className={`btn btn-xs btn-circle transition-all duration-300 ${
                      index === currentProductSlide
                        ? "btn-primary scale-125"
                        : "btn-outline btn-primary hover:btn-primary"
                    }`}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease forwards;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
