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
  UserCircle,
  ShoppingCart,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import ThemeToggle from "../DarkMode/ThemeToggle";

import { usePathname } from "next/navigation";



export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(7);
  const [wishlistCount, setWishlistCount] = useState(3);
  const pathname = usePathname();
  const dropdownRef = useRef(null);
  const { data: session, status } = useSession();

  const handleLogout = () => signOut();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-base-100 backdrop-blur-md shadow-lg border-b border-base-300"
          : "bg-base-100"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 group">
            <a href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <ShoppingBag className="w-6 h-6 text-primary-content" />
              </div>
              <span className="text-2xl font-bold transition-colors duration-300 text-base-content">
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
                      isActive
                        ? "bg-primary text-primary-content font-semibold shadow-md"
                        : "text-base-content hover:bg-primary hover:text-primary-content"
                    }`}
                >
                  <span className="relative z-10">{item.name}</span>
                </a>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {status === "authenticated" ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-3 p-1 cursor-pointer rounded-full transition-all duration-300 hover:scale-105 group bg-base-200 hover:bg-base-300"
                >
                  <div className="relative">
                    <img
                      src={session.user.photoURL || "/default-avatar.png"}
                      alt={session.user.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-primary"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-base-100"></div>
                  </div>
                 
                </button>

                <div
                  className={`absolute right-0 mt-2 w-64 bg-base-100 rounded-2xl shadow-xl border border-base-300 backdrop-blur-md transition-all duration-300 transform origin-top-right ${
                    userDropdownOpen
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {/* User Info */}
                  <div className="px-4 py-4 border-b border-base-300">
                    <div className="flex items-center space-x-3">
                      <img
                        src={session.user.photoURL || "/default-avatar.png"}
                        alt={session.user.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                      />
                      <div>
                        <p className="font-semibold text-base-content">
                          {session.user.name}
                        </p>
                        <p className="text-sm text-base-content opacity-70">
                          {session.user.email}
                        </p>
                        <span className="inline-block px-2 py-1 bg-primary text-primary-content text-xs rounded-full mt-1 capitalize">
                          {session.user.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <a
                      href="/myProfile"
                      className="flex items-center px-4 py-3 text-base-content hover:bg-primary hover:text-primary-content rounded-lg transition-colors duration-200"
                    >
                      <UserCircle className="w-5 h-5 mr-3" />
                      <span className="font-medium">My Profile</span>
                    </a>
                    <a
                      href="/dashboard"
                      className="flex items-center px-4 py-3 text-base-content hover:bg-primary hover:text-primary-content rounded-lg transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-3"
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

                    <div className="border-t border-base-300 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3 text-error hover:bg-error hover:text-error-content rounded-lg transition-colors duration-200"
                      >
                        <LogOut className="w-5 h-5 mr-3" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <a
                href="/auth/login"
                className="px-6 py-2.5 bg-primary text-primary-content font-semibold rounded-full hover:bg-primary-focus transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </a>
            )}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle></ThemeToggle>

            {status === "authenticated" && (
              <button className="p-1 rounded-full">
                <img
                  src={session.user.photoURL || "/default-avatar.png"}
                  alt={session.user.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-primary"
                />
              </button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg transition-all duration-200 text-base-content hover:bg-base-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="bg-base-100 backdrop-blur-md border-t border-base-300">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {status === "authenticated" && (
              <div className="flex items-center space-x-3 p-4 rounded-xl border border-primary bg-primary/10">
                <img
                  src={session.user.photoURL || "/default-avatar.png"}
                  alt={session.user.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <p className="font-semibold text-base-content">{session.user.name}</p>
                  <p className="text-sm text-base-content opacity-70">{session.user.email}</p>
                </div>
              </div>
            )}

            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-3 rounded-xl text-base-content hover:bg-primary hover:text-primary-content font-medium transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.name}
              </a>
            ))}

            <div className="pt-4 space-y-3 border-t border-base-300">
              {status === "authenticated" ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-error text-error-content font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02]"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <a
                  href="/auth/login"
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-primary-content font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02]"
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