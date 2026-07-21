'use client';

import React, { useState } from 'react';
import OttoMascot from '@/components/OttoMascot';
import { ArrowRight, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export default function InfoPage() {
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-cake-lavender via-cake-blush to-cake-mint flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-5xl w-full">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-5">
                <OttoMascot size={110} expression="happy" />
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
                Let&apos;s get started
              </h1>

              <p className="text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                Just a couple quick details before you chat with Otto. This keeps the conversation focused and makes your results more useful.
              </p>
            </div>

            <div>
              <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
                <div>
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

                <div>
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
                </div>
              </div>

              <p className="text-xs text-gray-500 mb-6">
                Otto can use these details to understand your background and keep track of your results.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                <Link href="/preferences" className="flex-1">
                  <button
                    disabled={!email}
                    className="group w-full bg-gradient-to-r from-cake-pink to-cake-lavender hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>

                <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors text-center px-4">
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
