"use client"
import React, { useState, useEffect } from 'react'
import { 
  Heart, 
  Users, 
  Target, 
  Award, 
  Sparkles, 
  Globe, 
  Shield, 
  Zap,
  ArrowRight,
  Star,
  CheckCircle,
  TrendingUp
} from 'lucide-react'

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description: "Our customers' satisfaction is our primary goal. Every product and service is designed with our customers in mind.",
      gradient: "from-secondary to-secondary"
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "We ensure a safe and trusted shopping environment. The security of your information and money is our promise.",
      gradient: "from-success to-success"
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "We continuously improve by keeping pace with technology. Innovation and modernity are in every service we provide.",
      gradient: "from-primary to-accent"
    },
    {
      icon: Globe,
      title: "Global Vision",
      description: "We are committed to providing world-class products and services. We maintain both local and international standards.",
      gradient: "from-info to-info"
    }
  ]

  const stats = [
    { number: "50,000+", label: "Happy Customers", icon: "👥" },
    { number: "10,000+", label: "Products", icon: "📦" },
    { number: "99.9%", label: "Satisfaction Rate", icon: "⭐" },
    { number: "24/7", label: "Customer Support", icon: "🛠️" }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Customer",
      content: "Shopping from NextShop is truly an amazing experience. Fast delivery and great quality products.",
      avatar: "👩‍🦱",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Business Owner",
      content: "I've never experienced such easy and secure online shopping before. Excellent customer service.",
      avatar: "👨‍💼",
      rating: 5
    },
    {
      name: "Emma Williams",
      role: "Homemaker",
      content: "I can find all kinds of products from home. Both price and quality are excellent. Very satisfied.",
      avatar: "👩‍🍳",
      rating: 5
    }
  ]

  const milestones = [
    { year: "2020", event: "NextShop Founded", description: "Started with a dream" },
    { year: "2021", event: "10,000 Customers", description: "First milestone achieved" },
    { year: "2022", event: "National Award", description: "Best E-commerce Platform" },
    { year: "2023", event: "50,000+ Customers", description: "Recognition of trust" }
  ]

  const team = [
    {
      name: "Alex Rodriguez",
      role: "CEO & Founder",
      description: "Visionary leader with 10+ years in e-commerce",
      avatar: "👨‍💻",
      gradient: "from-primary to-secondary"
    },
    {
      name: "Jessica Park",
      role: "CTO",
      description: "Tech innovator driving our digital transformation",
      avatar: "👩‍💻",
      gradient: "from-info to-accent"
    },
    {
      name: "David Kim",
      role: "Head of Operations",
      description: "Ensuring smooth operations and customer satisfaction",
      avatar: "👨‍💼",
      gradient: "from-success to-success"
    }
  ]

  return (
    <div className="min-h-screen ">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-3 h-3 bg-gradient-to-r from-base-content to-primary rounded-full animate-float opacity-40`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Hero Section */}
        <div className={`text-center mb-20 mt-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-2 bg-primary/20 backdrop-blur-lg rounded-full px-6 py-2 border border-base-content/10 mb-6">
            <Sparkles className="w-4 h-4 text-warning" />
            <span className="text-base-content font-medium text-sm">About NextShop</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            <span className="text-primary">
              Our Story
            </span>
          </h1>
          
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
            We're passionate about creating exceptional shopping experiences that bring joy, convenience, and trust to millions of customers worldwide. Our journey started with a simple dream - to revolutionize online shopping.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-6 bg-base-content/5 backdrop-blur-lg rounded-2xl border border-base-content/10 hover:bg-base-content/10 transition-all duration-300 hover:scale-105 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-base-content mb-2">{stat.number}</div>
              <div className="text-base-content/70">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="bg-base-content/5 backdrop-blur-lg rounded-3xl p-8 border border-base-content/10 h-full">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-base-content">Our Mission</h2>
              </div>
              <p className="text-base-content/70 text-lg leading-relaxed">
                To democratize commerce by making quality products accessible to everyone, everywhere. We believe shopping should be simple, secure, and delightful. Our mission is to bridge the gap between consumers and their desired products through innovative technology and exceptional service.
              </p>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-base-content/5 backdrop-blur-lg rounded-3xl p-8 border border-base-content/10 h-full">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-success to-success rounded-2xl flex items-center justify-center mr-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-base-content">Our Vision</h2>
              </div>
              <p className="text-base-content/70 text-lg leading-relaxed">
                To be the world's most customer-centric company where people can find and discover anything they want to buy online. We envision a future where technology enhances human connections and creates meaningful experiences that enrich people's lives through thoughtful commerce.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-base-content mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className={`bg-base-content/5 backdrop-blur-lg rounded-2xl p-6 border border-base-content/10 hover:bg-base-content/10 transition-all duration-300 hover:scale-105 ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${600 + index * 200}ms` }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${value.gradient} rounded-xl flex items-center justify-center mb-4`}>
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-base-content mb-3">{value.title}</h3>
                <p className="text-base-content/70 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-base-content mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-full"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} ${
                    isVisible ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${1000 + index * 300}ms` }}
                >
                  <div className={`w-full max-w-md ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                    <div className="bg-base-content/5 backdrop-blur-lg rounded-2xl p-6 border border-base-content/10 hover:bg-base-content/10 transition-all duration-300">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                          {milestone.year.slice(-2)}
                        </div>
                        <h3 className="text-xl font-bold text-base-content">{milestone.event}</h3>
                      </div>
                      <p className="text-base-content/70">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-base-content mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className={`bg-base-content/5 backdrop-blur-lg rounded-2xl p-6 border border-base-content/10 hover:bg-base-content/10 transition-all duration-300 hover:scale-105 text-center ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${1200 + index * 200}ms` }}
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${member.gradient} rounded-full flex items-center justify-center text-4xl mx-auto mb-4`}>
                  {member.avatar}
                </div>
                <h3 className="text-xl font-bold text-base-content mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-base-content/70 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-base-content mb-12">What Our Customers Say</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-base-content/5 backdrop-blur-lg rounded-3xl p-8 border border-base-content/10 text-center">
              <div className="text-6xl mb-6">{testimonials[currentTestimonial].avatar}</div>
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-warning fill-current" />
                ))}
              </div>
              <p className="text-xl text-base-content/70 mb-6 italic leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </p>
              <h4 className="text-lg font-bold text-base-content">{testimonials[currentTestimonial].name}</h4>
              <p className="text-primary">{testimonials[currentTestimonial].role}</p>
              
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'bg-base-content scale-125' 
                        : 'bg-base-content/40 hover:bg-base-content/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-primary/20 backdrop-blur-lg rounded-3xl p-12 border border-base-content/10">
            <h2 className="text-4xl font-bold text-base-content mb-6">Ready to Start Shopping?</h2>
            <p className="text-xl text-base-content/70 mb-8 max-w-2xl mx-auto">
              Join millions of satisfied customers and discover why NextShop is the preferred choice for online shopping.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-2">
                <span>Explore Products</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group bg-base-content/10 hover:bg-base-content/20 backdrop-blur-lg text-base-content font-bold py-4 px-8 rounded-2xl border border-base-content/20 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Contact Us</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease forwards; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  )
}