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
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileUserDropdownOpen, setMobileUserDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(7);
  const [wishlistCount, setWishlistCount] = useState(3);
  const pathname = usePathname();
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const { data: session, status } = useSession();

  const handleLogout = () => {
    signOut();
    setUserDropdownOpen(false);
    setMobileUserDropdownOpen(false);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside for desktop dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle click outside for mobile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setMobileUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setUserDropdownOpen(false);
    setMobileUserDropdownOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleMobileProfileClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMobileUserDropdownOpen(!mobileUserDropdownOpen);
  };

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
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <ShoppingBag className="w-6 h-6 text-primary-content" />
              </div>
              <span className="text-2xl font-bold transition-colors duration-300 text-base-content">
                NextShop
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 items-center">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden group
                    ${
                      isActive
                        ? "bg-primary text-primary-content font-semibold shadow-md"
                        : "text-base-content hover:bg-primary hover:text-primary-content"
                    }`}
                >
                  <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {status === "authenticated" ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-3 p-2 cursor-pointer rounded-full transition-all duration-300 hover:scale-105 group bg-base-200 hover:bg-base-300"
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

                {/* Desktop Dropdown */}
                <div
                  className={`absolute right-0 mt-2 w-64 bg-base-100 rounded-2xl shadow-xl border border-base-300 backdrop-blur-md transition-all duration-300 transform origin-top-right ${
                    userDropdownOpen
                      ? "opacity-100 scale-100 translate-y-0 visible"
                      : "opacity-0 scale-95 -translate-y-2 invisible"
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
                        <p className="font-semibold text-base-content truncate">
                          {session.user.name}
                        </p>
                        <p className="text-sm text-base-content opacity-70 truncate">
                          {session.user.email}
                        </p>
                        <span className="inline-block px-2 py-1 bg-primary text-primary-content text-xs rounded-full mt-1 capitalize">
                          {session.user.role || 'User'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      href="/myProfile"
                      className="flex items-center px-4 py-3 text-base-content hover:bg-primary hover:text-primary-content rounded-lg mx-2 transition-colors duration-200"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <UserCircle className="w-5 h-5 mr-3" />
                      <span className="font-medium">My Profile</span>
                    </Link>
                    <Link
                      href="/dashboard"
                      className="flex items-center px-4 py-3 text-base-content hover:bg-primary hover:text-primary-content rounded-lg mx-2 transition-colors duration-200"
                      onClick={() => setUserDropdownOpen(false)}
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
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0"
                        />
                      </svg>
                      <span className="font-medium">Dashboard</span>
                    </Link>

                    <div className="border-t border-base-300 mt-2 pt-2 mx-2">
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
              <Link
                href="/auth/login"
                className="px-6 py-2.5 bg-primary text-primary-content font-semibold rounded-full hover:bg-primary-focus transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button & Profile */}
          <div className="md:hidden flex items-center justify-center gap-3">
            <ThemeToggle />

           <div className=" flex items-center justify-center">
             {status === "authenticated" && (
              <div className="relative flex justify-center items-center" ref={mobileDropdownRef}>
                <button 
                  onClick={handleMobileProfileClick}
                  className="p-1 rounded-full hover:bg-base-200 transition-colors duration-200"
                >
                  <img
                    src={session.user.photoURL || "/default-avatar.png"}
                    alt={session.user.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-primary"
                  />
                </button>

                {/* Mobile Profile Dropdown */}
                <div
                  className={`absolute top-12 right-0  w-64 bg-base-100 rounded-2xl shadow-xl border border-base-300 backdrop-blur-md transition-all duration-300 transform origin-top-right z-50 ${
                    mobileUserDropdownOpen
                      ? "opacity-100 scale-100 translate-y-0 visible"
                      : "opacity-0 scale-95 -translate-y-2 invisible"
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
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-base-content truncate">
                          {session.user.name}
                        </p>
                        <p className="text-sm text-base-content opacity-70 truncate">
                          {session.user.email}
                        </p>
                        <span className="inline-block px-2 py-1 bg-primary text-primary-content text-xs rounded-full mt-1 capitalize">
                          {session.user.role || 'User'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      href="/myProfile"
                      className="flex items-center px-4 py-3 text-base-content hover:bg-primary hover:text-primary-content rounded-lg mx-2 transition-colors duration-200"
                      onClick={() => setMobileUserDropdownOpen(false)}
                    >
                      <UserCircle className="w-5 h-5 mr-3" />
                      <span className="font-medium">My Profile</span>
                    </Link>
                    <Link
                      href="/dashboard"
                      className="flex items-center px-4 py-3 text-base-content hover:bg-primary hover:text-primary-content rounded-lg mx-2 transition-colors duration-200"
                      onClick={() => setMobileUserDropdownOpen(false)}
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
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002 2H5a2 2 0 00-2-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0"
                        />
                      </svg>
                      <span className="font-medium">Dashboard</span>
                    </Link>

                    <div className="border-t border-base-300 mt-2 pt-2 mx-2">
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
            )}
           </div>

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
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-base-100 backdrop-blur-md border-t border-base-300">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-primary-content"
                      : "text-base-content hover:bg-primary hover:text-primary-content"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}

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
                <Link
                  href="/auth/login"
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-primary-content font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02]"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="w-4 h-4" />
                  <span>Login / Register</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}