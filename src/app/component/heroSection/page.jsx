"use client"
import React, { useState, useEffect } from 'react'
import { ShoppingBag, Star, TrendingUp, Zap, ArrowRight, Play, Shield, Truck, Heart } from 'lucide-react'

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const heroSlides = [
    {
      title: "Discover Amazing Products",
      subtitle: "Premium Quality at Unbeatable Prices",
      gradient: "from-purple-600 via-pink-500 to-red-500",
      image: "🛍️"
    },
    {
      title: "Summer Sale Collection",
      subtitle: "Up to 70% Off on Selected Items",
      gradient: "from-emerald-600 via-teal-500 to-cyan-500",
      image: "🌟"
    },
    {
      title: "New Arrivals Weekly Exclusive",
      subtitle: "Stay Ahead with Latest Trends",
      gradient: "from-indigo-600 via-purple-500 to-pink-500",
      image: "🚀"
    }
  ]

  const features = [
    { icon: Shield, text: "Secure Shopping", color: "text-green-400" },
    { icon: Truck, text: "Free Delivery", color: "text-blue-400" },
    { icon: Heart, text: "Quality Guaranteed", color: "text-pink-400" },
  ]

  const stats = [
    { number: "50K+", label: "Happy Customers", icon: "👥" },
    { number: "10K+", label: "Products", icon: "📦" },
    { number: "99.9%", label: "Satisfaction", icon: "⭐" },
    { number: "24/7", label: "Support", icon: "🛠️" }
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-4 h-4 bg-gradient-to-r from-white to-purple-200 rounded-full animate-float opacity-60`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-full px-6 py-2 border border-white/10">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-white font-medium text-sm">New Features Available</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className={`bg-gradient-to-r ${heroSlides[currentSlide].gradient} bg-clip-text text-transparent animate-gradient-x`}>
                  NextShop
                </span>
                <br />
                <span className="text-white">
                  {heroSlides[currentSlide].title}
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
                {heroSlides[currentSlide].subtitle}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center p-4 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 ${
                    isVisible ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <feature.icon className={`w-6 h-6 ${feature.color} mb-2`} />
                  <span className="text-white text-sm font-medium text-center">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-2">
                <ShoppingBag className="w-5 h-5" />
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group bg-white/10 hover:bg-white/20 backdrop-blur-lg text-white font-bold py-4 px-8 rounded-2xl border border-white/20 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 ${
                    isVisible ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${800 + index * 100}ms` }}
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Hero Visual */}
          <div className={`relative transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            
            {/* Main Hero Card */}
            <div className="relative">
              <div className={`w-full h-96 bg-gradient-to-br ${heroSlides[currentSlide].gradient} rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500 flex items-center justify-center relative overflow-hidden`}>
                
                {/* Card Content */}
                <div className="text-center z-10">
                  <div className="text-8xl mb-4 animate-bounce">
                    {heroSlides[currentSlide].image}
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-2">NextShop</h3>
                  <p className="text-white/80 text-lg">Your Shopping Destination</p>
                </div>

                {/* Floating Elements Inside Card */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-white animate-spin-slow" />
                </div>
                <div className="absolute bottom-4 left-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>

                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full animate-ping"></div>
                  <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-white rounded-full animate-ping animation-delay-1000"></div>
                </div>
              </div>

              {/* Floating Product Cards */}
              <div className="absolute -top-8 -left-8 w-24 h-32 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 flex flex-col items-center justify-center hover:scale-110 transition-transform duration-300">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg mb-2"></div>
                <span className="text-white text-xs font-medium">Hot Deal</span>
              </div>

              <div className="absolute -bottom-8 -right-8 w-28 h-36 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 flex flex-col items-center justify-center hover:scale-110 transition-transform duration-300">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg mb-2 flex items-center justify-center">
                  <span className="text-white text-lg">🎁</span>
                </div>
                <span className="text-white text-xs font-medium">Free Gift</span>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white scale-125' 
                      : 'bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-gradient-x { animation: gradient-x 3s ease infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease forwards; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  )
}
