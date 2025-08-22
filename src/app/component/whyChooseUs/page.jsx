"use client"
import React, { useState, useEffect } from 'react'
import { Award, Shield, Headphones, Truck, RefreshCw, Users, Zap } from 'lucide-react'

export default function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false)

  // Why Choose Us Data
  const whyChooseFeatures = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "All our products go through rigorous quality checks to ensure excellence",
      color: "from-yellow-400 to-orange-500",
      delay: "0ms"
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "Your payment information is protected with bank-level security",
      color: "from-green-400 to-emerald-500",
      delay: "200ms"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Free shipping on orders over $50 with lightning-fast delivery",
      color: "from-blue-400 to-cyan-500",
      delay: "400ms"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our dedicated support team is available round the clock for you",
      color: "from-purple-400 to-pink-500",
      delay: "600ms"
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "30-day hassle-free return policy for your peace of mind",
      color: "from-indigo-400 to-purple-500",
      delay: "800ms"
    },
    {
      icon: Users,
      title: "Trusted by Thousands",
      description: "Join over 50,000 satisfied customers who love shopping with us",
      color: "from-pink-400 to-rose-500",
      delay: "1000ms"
    }
  ]

  // Scroll detection for animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      if (scrollY > windowHeight * 0.6) {
        setIsVisible(true)
      }
    }

    handleScroll() // Check initial position
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-3000"></div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 border-2 border-white/10 rotate-45 animate-float"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-full px-6 py-2 border border-white/10 mb-6">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-white font-medium text-sm">Why NextShop</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
            Why Choose <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Us?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the difference with our commitment to excellence and customer satisfaction
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseFeatures.map((feature, index) => (
            <div
              key={index}
              className={`group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 relative ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: feature.delay }}
            >
              
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect Border */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            Start Shopping Now
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(45deg); }
          50% { transform: translateY(-20px) rotate(45deg); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease forwards; }
        .animation-delay-3000 { animation-delay: 3s; }
      `}</style>
    </section>
  )
}