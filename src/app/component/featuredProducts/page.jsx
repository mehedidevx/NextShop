"use client"
import React, { useState, useEffect } from 'react'
import { Star, Heart, ShoppingCart, Eye, TrendingUp, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

export default function FeaturedProducts() {
  const [currentProductSlide, setCurrentProductSlide] = useState(0)
  const [likedProducts, setLikedProducts] = useState(new Set())
  const [isVisible, setIsVisible] = useState(false)

  // Featured Products Data
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: "$299",
      originalPrice: "$399",
      rating: 4.8,
      reviews: 234,
      image: "🎧",
      badge: "Best Seller",
      badgeColor: "bg-red-500",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: "$199",
      originalPrice: "$279",
      rating: 4.9,
      reviews: 189,
      image: "⌚",
      badge: "New Arrival",
      badgeColor: "bg-green-500",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      name: "Professional Camera",
      price: "$799",
      originalPrice: "$999",
      rating: 4.7,
      reviews: 156,
      image: "📷",
      badge: "Limited",
      badgeColor: "bg-orange-500",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      id: 4,
      name: "Gaming Laptop",
      price: "$1299",
      originalPrice: "$1599",
      rating: 4.9,
      reviews: 312,
      image: "💻",
      badge: "Hot Deal",
      badgeColor: "bg-yellow-500",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      id: 5,
      name: "Wireless Speaker",
      price: "$149",
      originalPrice: "$199",
      rating: 4.6,
      reviews: 267,
      image: "🔊",
      badge: "Popular",
      badgeColor: "bg-pink-500",
      gradient: "from-rose-500 to-pink-500"
    },
    {
      id: 6,
      name: "Smart Phone",
      price: "$899",
      originalPrice: "$1099",
      rating: 4.8,
      reviews: 445,
      image: "📱",
      badge: "Trending",
      badgeColor: "bg-blue-500",
      gradient: "from-violet-500 to-purple-500"
    }
  ]

  // Scroll detection for animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      if (scrollY > windowHeight * 0.3) {
        setIsVisible(true)
      }
    }

    handleScroll() // Check initial position
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Product slider auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProductSlide(prev => (prev + 1) % Math.ceil(featuredProducts.length / 3))
    }, 5000)
    return () => clearInterval(interval)
  }, [featuredProducts.length])

  const toggleLike = (productId) => {
    setLikedProducts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }

  const nextSlide = () => {
    setCurrentProductSlide(prev => (prev + 1) % Math.ceil(featuredProducts.length / 3))
  }

  const prevSlide = () => {
    setCurrentProductSlide(prev => prev === 0 ? Math.ceil(featuredProducts.length / 3) - 1 : prev - 1)
  }

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 overflow-hidden">
      
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-full px-6 py-2 border border-purple-200 dark:border-purple-700 mb-6">
            <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-600 dark:text-purple-400 font-medium text-sm">Trending Products</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Featured Products
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products at unbeatable prices
          </p>
        </div>

        {/* Products Slider */}
        <div className="relative">
          
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 group"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-purple-600" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 group"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-purple-600" />
          </button>

          {/* Products Grid */}
          <div className="overflow-hidden mx-12">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentProductSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(featuredProducts.length / 3) }, (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-3 gap-8">
                    {featuredProducts.slice(slideIndex * 3, (slideIndex + 1) * 3).map((product, index) => (
                      <div
                        key={product.id}
                        className={`group bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden ${
                          isVisible ? 'animate-fade-in-up' : 'opacity-0'
                        }`}
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        
                        {/* Product Image */}
                        <div className={`relative h-64 bg-gradient-to-br ${product.gradient} flex items-center justify-center overflow-hidden`}>
                          
                          {/* Badge */}
                          <div className={`absolute top-4 left-4 ${product.badgeColor} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                            {product.badge}
                          </div>

                          {/* Action Buttons */}
                          <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <button
                              onClick={() => toggleLike(product.id)}
                              className={`w-10 h-10 rounded-full backdrop-blur-lg border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                                likedProducts.has(product.id) 
                                  ? 'bg-red-500 text-white' 
                                  : 'bg-white/10 text-white hover:bg-white/20'
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${likedProducts.has(product.id) ? 'fill-current' : ''}`} />
                            </button>
                            <button className="w-10 h-10 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Product Emoji */}
                          <div className="text-8xl group-hover:scale-110 transition-transform duration-500">
                            {product.image}
                          </div>

                          {/* Floating Elements */}
                          <div className="absolute bottom-2 left-2 w-8 h-8 bg-white/20 rounded-full animate-bounce"></div>
                          <div className="absolute top-1/2 right-2 w-6 h-6 bg-white/20 rounded-full animate-bounce animation-delay-1000"></div>
                        </div>

                        {/* Product Info */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-purple-600 transition-colors">
                            {product.name}
                          </h3>
                          
                          {/* Rating */}
                          <div className="flex items-center space-x-2 mb-4">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {product.rating} ({product.reviews} reviews)
                            </span>
                          </div>

                          {/* Price */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl font-bold text-purple-600">{product.price}</span>
                              <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
                            </div>
                          </div>

                          {/* Add to Cart Button */}
                          <button className={`w-full bg-gradient-to-r ${product.gradient} hover:shadow-lg text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 group`}>
                            <ShoppingCart className="w-5 h-5" />
                            <span>Add to Cart</span>
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(featuredProducts.length / 3) }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProductSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentProductSlide 
                    ? 'bg-purple-600 scale-125' 
                    : 'bg-gray-300 hover:bg-purple-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease forwards; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </section>
  )
}