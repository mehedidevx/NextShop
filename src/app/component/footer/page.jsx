"use client"
import React, { useState, useEffect } from 'react'
import { 
  ShoppingBag, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin,
  Send,
  Heart,
  ArrowUp,
  Shield,
  Truck,
  RotateCcw,
  Star,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

export default function FooterSection() {
  const [email, setEmail] = useState('')
  const [expandedSections, setExpandedSections] = useState({})
  const [stars, setStars] = useState([])

  // Generate stars only on client side to fix hydration error
  useEffect(() => {
    const generatedStars = [...Array(12)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${i * 0.8}s`,
      duration: `${3 + Math.random() * 2}s`,
    }))
    setStars(generatedStars)
  }, [])

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    console.log('Newsletter subscription:', email)
    setEmail('')
  }

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerSections = [
    {
      title: "Shop",
      links: [
        { name: "All Products", href: "/products" },
        { name: "New Arrivals", href: "/new-arrivals" },
        { name: "Best Sellers", href: "/best-sellers" },
        { name: "Sale Items", href: "/sale" },
        { name: "Gift Cards", href: "/gift-cards" },
        { name: "Collections", href: "/collections" }
      ]
    },
    {
      title: "Customer Service",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "FAQ", href: "/faq" },
        { name: "Size Guide", href: "/size-guide" },
        { name: "Shipping Info", href: "/shipping" },
        { name: "Returns", href: "/returns" },
        { name: "Track Order", href: "/track" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
        { name: "Blog", href: "/blog" },
        { name: "Sustainability", href: "/sustainability" },
        { name: "Affiliate Program", href: "/affiliate" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "GDPR", href: "/gdpr" },
        { name: "Accessibility", href: "/accessibility" },
        { name: "Sitemap", href: "/sitemap" }
      ]
    }
  ]

  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:text-blue-500", name: "Facebook" },
    { icon: Twitter, href: "#", color: "hover:text-sky-400", name: "Twitter" },
    { icon: Instagram, href: "#", color: "hover:text-pink-500", name: "Instagram" },
    { icon: Youtube, href: "#", color: "hover:text-red-500", name: "YouTube" },
    { icon: Linkedin, href: "#", color: "hover:text-blue-600", name: "LinkedIn" }
  ]

  const trustBadges = [
    { icon: Shield, text: "Secure Payment", color: "text-green-400" },
    { icon: Truck, text: "Free Shipping", color: "text-blue-400" },
    { icon: RotateCcw, text: "Easy Returns", color: "text-purple-400" },
    { icon: Star, text: "Quality Guarantee", color: "text-yellow-400" }
  ]

  const paymentMethods = ["💳", "🏦", "📱", "💰", "🔒", "✨"]

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white overflow-hidden">

      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-twinkle opacity-30"
            style={{
              left: star.left,
              top: star.top,
              animationDelay: star.delay,
              animationDuration: star.duration
            }}
          />
        ))}
      </div>

      <div className="relative z-10">

        {/* Newsletter Section */}
        <div className="border-b border-white/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">

              <div className="text-center lg:text-left">
                <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                  Stay in the <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Loop</span>
                </h3>
                <p className="text-gray-300 text-lg mb-6 lg:mb-0">
                  Subscribe to get special offers, free giveaways, and exclusive deals delivered to your inbox
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <button
                  onClick={handleNewsletterSubmit}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 hover:shadow-lg"
                >
                  <Send className="w-5 h-5" />
                  <span>Subscribe</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-6 gap-8">

            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <ShoppingBag className="w-7 h-7 text-white" />
                </div>
                <span className="text-3xl font-bold">NextShop</span>
              </div>

              <p className="text-gray-300 leading-relaxed max-w-md">
                Your premier destination for quality products at amazing prices. We're committed to delivering exceptional shopping experiences with style and convenience.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <span>hello@nextshop.com</span>
                </div>
                <div className="flex items-start space-x-3 text-gray-300 hover:text-white transition-colors">
                  <MapPin className="w-5 h-5 text-purple-400 mt-1" />
                  <span>123 Shopping Street<br />New York, NY 10001</span>
                </div>
              </div>

              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.name}
                    className={`w-12 h-12 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 flex items-center justify-center text-gray-300 ${social.color} transition-all duration-300 transform hover:scale-110 hover:bg-white/20`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {footerSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                <button
                  onClick={() => toggleSection(section.title)}
                  className="lg:hidden w-full flex items-center justify-between text-left"
                >
                  <h4 className="text-xl font-semibold text-white">{section.title}</h4>
                  {expandedSections[section.title] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>

                <h4 className="hidden lg:block text-xl font-semibold text-white mb-6">
                  {section.title}
                </h4>

                <div className={`space-y-3 ${expandedSections[section.title] ? 'block' : 'hidden'} lg:block`}>
                  {section.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.href}
                      className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <badge.icon className={`w-6 h-6 ${badge.color}`} />
                  <span className="text-gray-300 font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-2 text-gray-300">
                <span>&copy; 2024 NextShop. All rights reserved.</span>
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" />
                <span>in Bangladesh</span>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm hidden sm:block">We Accept:</span>
                <div className="flex items-center space-x-2">
                  {paymentMethods.map((method, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 flex items-center justify-center text-xl hover:bg-white/20 transition-all duration-300"
                    >
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </footer>
  )
}
