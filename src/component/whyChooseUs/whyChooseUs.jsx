"use client"
import React, { useState, useEffect } from 'react'
import { Award, Shield, Headphones, Truck, RefreshCw, Users, Zap } from 'lucide-react'

export default function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false)
  const [floatingShapes, setFloatingShapes] = useState([]) // client-only shapes

  // Why Choose Us Data
  const whyChooseFeatures = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "All our products go through rigorous quality checks to ensure excellence",
      color: "from-warning to-error",
      delay: "0ms"
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "Your payment information is protected with bank-level security",
      color: "from-success to-info",
      delay: "200ms"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Free shipping on orders over $50 with lightning-fast delivery",
      color: "from-info to-primary",
      delay: "400ms"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our dedicated support team is available round the clock for you",
      color: "from-secondary to-accent",
      delay: "600ms"
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "30-day hassle-free return policy for your peace of mind",
      color: "from-primary to-secondary",
      delay: "800ms"
    },
    {
      icon: Users,
      title: "Trusted by Thousands",
      description: "Join over 50,000 satisfied customers who love shopping with us",
      color: "from-accent to-warning",
      delay: "1000ms"
    }
  ]

  // Scroll detection for animations
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.6) {
        setIsVisible(true)
      }
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Generate floating shapes only on client
  useEffect(() => {
    const shapes = [...Array(8)].map((_, i) => ({
      id: i,
      left: `${10 + (i * 12)}%`,
      top: `${20 + (i % 3) * 30}%`,
      delay: `${i * 0.7}s`,
      duration: `${(4 + Math.random() * 2).toFixed(2)}s`
    }))
    setFloatingShapes(shapes)
  }, [])

  return (
    <section className="relative py-20 bg-base-200 overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/20 rounded-full filter blur-xl opacity-60 animate-pulse animation-delay-3000"></div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingShapes.map((shape) => (
          <div
            key={shape.id}
            className="absolute w-4 h-4 border-2 border-base-content/10 rotate-45 animate-float"
            style={{
              left: shape.left,
              top: shape.top,
              animationDelay: shape.delay,
              animationDuration: shape.duration
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="badge badge-lg bg-primary/20 border-primary/30 backdrop-blur-lg mb-6">
            <Zap className="w-4 h-4 text-warning mr-2" />
            <span className="text-base-content font-medium">Why NextShop</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-base-content">
            Why Choose <span className="bg-gradient-to-r from-warning to-error bg-clip-text text-transparent">Us?</span>
          </h2>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Experience the difference with our commitment to excellence and customer satisfaction
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseFeatures.map((feature, index) => (
            <div
              key={index}
              className={`card bg-base-100/50 backdrop-blur-lg shadow-lg border border-base-300/50 hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: feature.delay }}
            >
              <div className="card-body p-8 relative">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="card-title text-2xl font-bold text-base-content mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-base-content/70 leading-relaxed">
                  {feature.description}
                </p>
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button className="btn btn-primary btn-lg bg-gradient-to-r from-warning to-error hover:from-warning-focus hover:to-error-focus border-none shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
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