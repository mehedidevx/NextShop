"use client"

import { Chrome } from "lucide-react";
import React from "react";

export default function SocialLogin() {
  return (
    <div>
      {" "}
      <div className="space-y-3">
        <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-4 py-3 text-white font-medium transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-[0.98]">
          <Chrome className="w-5 h-5" />
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
}
