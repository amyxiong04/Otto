'use client';

import OttoMascot from '@/components/OttoMascot';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f8f6] px-5 py-6 sm:px-8 lg:px-12">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] w-full max-w-6xl flex-col">
        <header className="border-b border-gray-200 pb-5">
          <span className="text-3xl font-bold text-gray-900">Otto</span>
        </header>

        <section className="flex flex-1 flex-col items-center justify-center py-10 text-center">
          <OttoMascot size={220} expression="happy" className="mb-7 drop-shadow-lg" />
          <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            What&apos;s your work style?
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-gray-600">
            Answer a few questions about how you think, work with others, and get things done. You&apos;ll see your workplace animal, strongest traits, and who you may work well with.
          </p>
          <Link href="/info" className="group mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#235c4b] px-7 py-3 font-semibold text-white transition hover:bg-[#194b3d]">
            Start the quiz
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="mt-4 text-sm text-gray-500">About 5 minutes</p>
        </section>
      </div>
    </main>
  );
}
