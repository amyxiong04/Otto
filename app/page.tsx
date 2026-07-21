'use client';

import OttoMascot from '@/components/OttoMascot';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f8f6] px-5 py-6 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-6xl">
        <header className="flex items-center justify-between border-b border-gray-200 pb-5">
          <span className="text-xl font-bold text-gray-900">Otto</span>
          <span className="hidden text-sm text-gray-500 sm:block">Career fit, through conversation</span>
        </header>

        <div className="grid min-h-[calc(100vh-105px)] grid-cols-1 items-center gap-8 py-9 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <section className="min-w-0 max-w-2xl">
            <p className="mb-5 text-sm font-semibold uppercase text-emerald-800">Meet Otto</p>
            <h1 className="text-5xl font-bold leading-[1.05] text-gray-900 sm:text-6xl lg:text-7xl">
              Find the kind of work that fits you.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Talk through what energizes you, what drains you, and how you work best. Otto turns the conversation into a practical work-style profile.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/info" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#235c4b] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#194b3d]">
                Start the conversation
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <span className="text-sm text-gray-500">About 5-10 minutes</span>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-gray-200 pt-6 text-sm text-gray-600">
              {['Personalized profile', 'Natural conversation', 'Clear work insights'].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-700" />
                  {item}
                </span>
              ))}
            </div>
          </section>

          <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-lg bg-[#e7f0eb] sm:min-h-[420px] lg:min-h-[520px]">
            <div className="absolute left-6 top-6 h-3 w-16 rounded-full bg-[#edb6aa]" />
            <div className="absolute bottom-7 right-7 h-20 w-20 rounded-full border border-[#93b6a8]" />
            <OttoMascot size={260} expression="happy" className="relative drop-shadow-xl sm:scale-110" />
          </div>
        </div>
      </div>
    </main>
  );
}
