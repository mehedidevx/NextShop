"use client";
import { Chrome, Github } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SocialLogin() {
  const [loading, setLoading] = useState(null);
  const router = useRouter();
  const session = useSession();

  const handleSocialLogin = async (providerName) => {
    setLoading(providerName);
    try {
      const result = await signIn(providerName, { 
        redirect: false,
        callbackUrl: "/"
      });
      
      if (result?.error) {
        toast.error("Login failed! Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
      toast.success("Login successful!");
    }
  }, [session?.status, router]);

  // যদি user already authenticated হয়, তবে buttons show না করা
  if (session?.status === "authenticated") {
    return null;
  }

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 gap-4">
        <button
          onClick={() => handleSocialLogin("google")}
          disabled={loading}
          className="w-full bg-base-100/10 hover:bg-base-100/20 border border-base-content/20 rounded-xl px-4 py-3 text-base-content font-medium transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading === "google" ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <Chrome className="w-5 h-5" />
          )}
          <span>
            {loading === "google" ? "Signing in..." : "Continue with Google"}
          </span>
        </button>

        <button
          onClick={() => handleSocialLogin("github")}
          disabled={loading}
          className="w-full bg-base-100/10 hover:bg-base-100/20 border border-base-content/20 rounded-xl px-4 py-3 text-base-content font-medium transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading === "github" ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <Github className="w-5 h-5" />
          )}
          <span>
            {loading === "github" ? "Signing in..." : "Continue with GitHub"}
          </span>
        </button>
      </div>
    </div>
  );
}