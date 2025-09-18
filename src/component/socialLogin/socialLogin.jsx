"use client";
import {
  Mail,
  Lock,
  Facebook,
  Linkedin,
  Chrome,
  Settings,
  Shield,
  User,
  Github,
} from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function SocialLogin() {
  const router = useRouter();
  const session = useSession();

  const handleSocialLogin =(providerName) => {
    signIn(providerName);
  
  };
  useEffect(()=> {
    if(session?.status === "authenticated"){
        router.push("/");
        toast.success("Login successful!")
    }
  }, [session?.status])
  return (
    <div>
      {" "}
      <div className="space-y-3">
        <button   onClick={(e) => handleSocialLogin("google", e)} className="w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-4 py-3 text-white font-medium transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-[0.98]">
          <Chrome className="w-5 h-5" />
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
}
