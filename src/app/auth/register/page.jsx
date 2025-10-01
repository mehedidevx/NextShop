"use client";
import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  UserPlus,
  Check,
} from "lucide-react";
import SocialLogin from "@/component/socialLogin/socialLogin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/actions/auth/registerUser";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { name, email, password } = formData;
    const payload = { name, email, password };
    console.log(payload)
    const response = await registerUser(payload);

    setIsLoading(false);

    if (response.success === true) {
      toast.success("Registered successfully");

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!result.error) {
        router.push("/");
      } else {
        toast.error("Login failed after registration");
      }
    } else {
      toast.warn("Authentication failed");
    }
  };

  const passwordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthColor = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return "bg-error";
      case 2:
        return "bg-warning";
      case 3:
        return "bg-info";
      case 4:
        return "bg-success";
      default:
        return "bg-base-300";
    }
  };

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Registration Card */}
      <div className="relative w-full max-w-2xl">
        <div className="backdrop-blur-lg bg-base-100/10 rounded-3xl border border-base-content/20 p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-primary-content" />
            </div>
            <h1 className="text-3xl font-bold text-base-content">Create Account</h1>
            <p className="text-base-content/70">Join us and start your journey</p>
          </div>

          {/* Registration Form */}
          <div className="space-y-4">
            {/* Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content/80 font-medium">Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input input-bordered w-full pl-10 py-6 bg-base-100/10 border-base-content/20 text-base-content placeholder:text-base-content/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content/80 font-medium">Email Address</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input input-bordered w-full pl-10 py-6 pr-12 bg-base-100/10 border-base-content/20 text-base-content placeholder:text-base-content/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Create a strong password"
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
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all duration-200 ${
                          passwordStrength(formData.password) >= level
                            ? getPasswordStrengthColor(
                                passwordStrength(formData.password)
                              )
                            : "bg-base-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p
                    className={`text-xs ${
                      passwordStrength(formData.password) <= 1
                        ? "text-error"
                        : passwordStrength(formData.password) === 2
                        ? "text-warning"
                        : passwordStrength(formData.password) === 3
                        ? "text-info"
                        : "text-success"
                    }`}
                  >
                    Password strength:{" "}
                    {getPasswordStrengthText(
                      passwordStrength(formData.password)
                    )}
                  </p>
                </div>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start space-x-2">
              <div className="relative">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="sr-only"
                />
                <div
                  onClick={() => setAgreedToTerms(!agreedToTerms)}
                  className={`w-5 h-5 rounded border-2 cursor-pointer transition-all duration-200 flex items-center justify-center ${
                    agreedToTerms
                      ? "bg-primary border-primary"
                      : "border-base-content/40 hover:border-primary"
                  }`}
                >
                  {agreedToTerms && <Check className="w-3 h-3 text-primary-content" />}
                </div>
              </div>
              <label
                htmlFor="terms"
                className="text-sm text-base-content/70 cursor-pointer"
              >
                I agree to the{" "}
                <button className="link link-primary">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button className="link link-primary">
                  Privacy Policy
                </button>
              </label>
            </div>

            {/* Register Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || !agreedToTerms}
              className="btn btn-primary w-full text-primary-content font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <span className="loading loading-spinner loading-sm"></span>
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-base-content/70">
              Already have an account?{" "}
              <Link href="/auth/login" className="link link-primary font-medium">
                Sign in
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="divider text-base-content/70">Or continue with</div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <SocialLogin />
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