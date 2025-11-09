'use client';

import React, { useState } from 'react';
import OttoMascot from '@/components/OttoMascot';
import { ArrowRight, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export default function InfoPage() {
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-cake-lavender via-cake-blush to-cake-mint flex items-center justify-center p-6">
      <div className="max-w-lg w-full">
        
        {/* Card container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12">
          
          {/* Otto mascot */}
          <div className="flex justify-center mb-6">
            <OttoMascot size={100} expression="happy" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800 text-center">
            Let's get started
          </h1>
          
          <p className="text-gray-600 mb-8 text-center">
            Just need a couple quick things so Otto knows how to reach you
          </p>

          {/* Email input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cake-pink focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* LinkedIn input */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LinkedIn profile <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <div className="relative">
              <Linkedin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="linkedin.com/in/yourname"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cake-lavender focus:border-transparent transition-all"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 ml-1">
              Otto can read your profile to better understand your background
            </p>
          </div>

          {/* Continue button */}
          <Link href="/preferences">
            <button 
              disabled={!email}
              className="group w-full bg-gradient-to-r from-cake-pink to-cake-lavender hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 flex items-center justify-center gap-3"
            >
              Continue
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          {/* Back link */}
          <div className="text-center mt-6">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              ← Back
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
