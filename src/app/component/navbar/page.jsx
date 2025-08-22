'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X, ShoppingBag, User, Heart, Search } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/component/about' },
    { name: 'Contact', href: '/component/contact' }
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-xl' 
        : 'bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 shadow-lg'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 group">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center transform transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className={`text-2xl font-bold transition-colors duration-300 ${
                scrolled 
                  ? 'text-gray-800 dark:text-white' 
                  : 'text-white'
              }`}>
                NextShop
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 items-center">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105 ${
                  scrolled
                    ? 'text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-800 hover:text-purple-600 dark:hover:text-purple-300'
                    : 'text-white/90 hover:text-white hover:bg-white/20 backdrop-blur-sm'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right Side Icons & Login */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Search Icon */}
            <button className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
              scrolled
                ? 'text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-800 hover:text-purple-600 dark:hover:text-purple-300'
                : 'text-white/90 hover:text-white hover:bg-white/20 backdrop-blur-sm'
            }`}>
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button className={`p-2 rounded-full transition-all duration-200 hover:scale-110 relative ${
              scrolled
                ? 'text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-800 hover:text-purple-600 dark:hover:text-purple-300'
                : 'text-white/90 hover:text-white hover:bg-white/20 backdrop-blur-sm'
            }`}>
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>

            {/* Cart Icon */}
            <button className={`p-2 rounded-full transition-all duration-200 hover:scale-110 relative ${
              scrolled
                ? 'text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-800 hover:text-purple-600 dark:hover:text-purple-300'
                : 'text-white/90 hover:text-white hover:bg-white/20 backdrop-blur-sm'
            }`}>
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">7</span>
            </button>

            {/* Login Button */}
            <a 
              href="/auth/login" 
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Cart */}
            <button className={`p-2 rounded-full transition-all duration-200 relative ${
              scrolled
                ? 'text-gray-600 dark:text-gray-300'
                : 'text-white/90'
            }`}>
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">7</span>
            </button>

            {/* Hamburger Menu */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`p-2 rounded-lg transition-all duration-200 ${
                scrolled
                  ? 'text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-800'
                  : 'text-white hover:bg-white/20 backdrop-blur-sm'
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-purple-200 dark:border-purple-800">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-800 dark:hover:to-pink-800 hover:text-purple-600 dark:hover:text-purple-300 font-medium transition-all duration-200 transform hover:translate-x-1"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.name}
              </a>
            ))}
            
            {/* Mobile Action Buttons */}
            <div className="pt-4 space-y-3 border-t border-purple-200 dark:border-purple-800">
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-800 dark:to-pink-800 text-purple-600 dark:text-purple-300 rounded-xl hover:from-purple-200 hover:to-pink-200 dark:hover:from-purple-700 dark:hover:to-pink-700 transition-all duration-200">
                <Search className="w-4 h-4" />
                <span>Search Products</span>
              </button>
              
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-800 dark:to-pink-800 text-red-600 dark:text-red-300 rounded-xl hover:from-red-200 hover:to-pink-200 dark:hover:from-red-700 dark:hover:to-pink-700 transition-all duration-200">
                <Heart className="w-4 h-4" />
                <span>Wishlist (3)</span>
              </button>
              
              <a 
                href="/auth/login" 
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
              >
                <User className="w-4 h-4" />
                <span>Login / Register</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}