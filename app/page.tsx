'use client';

import React from 'react';
import OttoMascot from '@/components/OttoMascot';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cake-pink via-cake-blush to-cake-sky flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        
        {/* Otto mascot with animation */}
        <div className="flex justify-center mb-8 animate-float">
          <OttoMascot size={180} expression="happy" />
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-800">
          Meet Otto
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-3">
          Your friendly career companion
        </p>

        <p className="text-lg text-gray-500 mb-12 max-w-xl mx-auto leading-relaxed">
          Skip the formal interviews. Just chat with Otto about what you're looking for, 
          and we'll help you find a role that actually fits your life.
        </p>

        {/* CTA Button */}
        <Link href="/info">
          <button className="group bg-white hover:bg-cake-blush text-gray-800 px-10 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto">
            Start your journey
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cake-mint"></div>
            <span>5 minute conversation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cake-lavender"></div>
            <span>Personalized matches</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cake-peach"></div>
            <span>No awkward interviews</span>
          </div>
        </div>

      </div>
    </div>
  );
}
