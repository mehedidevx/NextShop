"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ShoppingBag,
  User,
  Heart,
  Search,
  ChevronDown,
  LogOut,
  Settings,
  UserCircle,
  ShoppingCart,
  Bell,
  Package,
} from "lucide-react";
import { useSession } from "next-auth/react";


// Mock usePathname - replace with actual Next.js hook
const usePathname = () => "/";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(7);
  const [wishlistCount, setWishlistCount] = useState(3);
  const pathname = usePathname();
  const dropdownRef = useRef(null);
  const { data: session, status } = useSession();
  console.log(session)

  const handleLogout = () => {
    signOut();
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/component/about" },
    { name: "Contact", href: "/component/contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-xl border-b border-gray-200/20"
          : "bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 shadow-lg"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 group">
            <a href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span
                className={`text-2xl font-bold transition-colors duration-300 ${
                  scrolled ? "text-gray-800 dark:text-white" : "text-white"
                }`}
              >
                NextShop
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 items-center">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden group
                    ${
                      scrolled
                        ? isActive
                          ? "bg-purple-100 text-purple-600 dark:bg-purple-800 dark:text-purple-300"
                          : "text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-800 hover:text-purple-600 dark:hover:text-purple-300"
                        : isActive
                        ? "bg-white/20 text-white backdrop-blur-sm"
                        : "text-white/90 hover:text-white hover:bg-white/20 backdrop-blur-sm"
                    }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                </a>
              );
            })}
          </div>

          {/* Right Side Icons & User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* User Menu */}
            {status==="authenticated" ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={`flex items-center space-x-3 p-1 pr-3 rounded-full transition-all duration-300 hover:scale-105 group ${
                    scrolled
                      ? "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                      : "bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={session.user.photoURL || "/default-avatar.png"}
                      alt={session.user.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-white/20 group-hover:border-white/40 transition-all duration-300"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span
                      className={`font-medium text-sm hidden lg:block ${
                        scrolled
                          ? "text-gray-700 dark:text-gray-200"
                          : "text-white"
                      }`}
                    >
                      {session.user.name?.split(" ")[0]}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        userDropdownOpen ? "rotate-180" : ""
                      } ${
                        scrolled
                          ? "text-gray-600 dark:text-gray-300"
                          : "text-white/90"
                      }`}
                    />
                  </div>
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/20 dark:border-gray-700/20 backdrop-blur-xl transition-all duration-300 transform origin-top-right ${
                    userDropdownOpen
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {/* User Info Header */}
                  <div className="px-4 py-4 border-b border-gray-200/20 dark:border-gray-700/20">
                    <div className="flex items-center space-x-3">
                      <img
                        src={session.user.photoURL || "/default-avatar.png"}
                        alt={session.user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {session.user.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {session.user.email}
                        </p>
                        <span className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-300 text-xs rounded-full mt-1 capitalize">
                          {session.user.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <a
                      href="/myProfile"
                      className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-300 transition-colors duration-200 group"
                    >
                      <UserCircle className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-medium">My Profile</span>
                    </a>
                    <a
                      href="/dashboard"
                      className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-300 transition-colors duration-200 group rounded-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h18v18H3V3z M7 7h10v10H7V7z"
                        />
                      </svg>
                      <span className="font-medium">Dashboard</span>
                    </a>

                    <div className="border-t border-gray-200/20 dark:border-gray-700/20 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-400 transition-colors duration-200 group"
                      >
                        <LogOut className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <a
                href="/auth/login"
                className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2 group"
              >
                <User className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                <span>Login</span>
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Cart */}
            <button
              className={`p-2 rounded-full transition-all duration-200 relative ${
                scrolled ? "text-gray-600 dark:text-gray-300" : "text-white/90"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile User Avatar */}
            {status === "authenticated" && (
              <button className="p-1 rounded-full">
                <img
                  src={session.user.photoURL || "/default-avatar.png"}
                  alt={session.user.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-white/20"
                />
              </button>
            )}

            {/* Hamburger Menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                scrolled
                  ? "text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-800"
                  : "text-white hover:bg-white/20 backdrop-blur-sm"
              }`}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-purple-200/20 dark:border-purple-800/20">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {/* Mobile User Info */}
            {status==="authenticated" && (
              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-100/50 to-pink-100/50 dark:from-purple-800/20 dark:to-pink-800/20 rounded-xl border border-purple-200/20 mb-4">
                <img
                  src={session.user.photoURL || "/default-avatar.png"}
                  alt={session.user.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {session.user.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {session.user.email}
                  </p>
                </div>
              </div>
            )}

            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-800 dark:hover:to-pink-800 hover:text-purple-600 dark:hover:text-purple-300 font-medium transition-all duration-300 transform hover:translate-x-1"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.name}
              </a>
            ))}

            {/* Mobile Action Buttons */}
            <div className="pt-4 space-y-3 border-t border-purple-200/20 dark:border-purple-800/20">
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-800 dark:to-pink-800 text-purple-600 dark:text-purple-300 rounded-xl hover:from-purple-200 hover:to-pink-200 dark:hover:from-purple-700 dark:hover:to-pink-700 transition-all duration-200">
                <Search className="w-4 h-4" />
                <span>Search Products</span>
              </button>

              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-800 dark:to-pink-800 text-red-600 dark:text-red-300 rounded-xl hover:from-red-200 hover:to-pink-200 dark:hover:from-red-700 dark:hover:to-pink-700 transition-all duration-200">
                <Heart className="w-4 h-4" />
                <span>Wishlist ({wishlistCount})</span>
              </button>

              {status === "authenticated" ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <a
                  href="/auth/login"
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
                >
                  <User className="w-4 h-4" />
                  <span>Login / Register</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
