"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Github } from "lucide-react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import SocialLogin from "@/component/socialLogin/socialLogin";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { email, password } = formData;
      console.log(email, password);
      const response = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (response.ok) {
        toast.success("Logged in successfully");
        setFormData({ email: "", password: "" });
        setIsLoading(false);
        setShowPassword(false);
        router.push("/");
      } else {
        toast.warn("Authentication failed");
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
      alert("Authentication failed");
    }
    setIsLoading(false);
  };


  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-80 h-80 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-2xl">
        <div className="backdrop-blur-lg bg-base-100/10 rounded-3xl  border border-base-content/20 p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary-content" />
            </div>
            <h1 className="text-3xl font-bold text-base-content">Welcome Back</h1>
            <p className="text-base-content/70">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content/80 font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  name="email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="input input-bordered w-full pl-10 py-6 bg-base-100/10 border-base-content/20 text-base-content placeholder:text-base-content/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content/80 font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  name="password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="input input-bordered w-full pl-10 py-6  pr-12 bg-base-100/10 border-base-content/20 text-base-content placeholder:text-base-content/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/40 hover:text-base-content transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="label cursor-pointer gap-2 p-0">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-sm"
                />
                <span className="label-text text-base-content/70">Remember me</span>
              </label>
              <button
                type="button"
                className="link link-hover text-sm text-primary"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="btn btn-primary w-full text-primary-content font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <span className="loading loading-spinner loading-sm"></span>
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-base-content/70">
              Don't have an account?{" "}
              <Link href="/auth/register" className="link link-primary font-medium">
                Sign up
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="divider text-base-content/70">Or continue with</div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
          
            
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}