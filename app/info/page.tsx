'use client';

import { useState } from 'react';
import OttoMascot from '@/components/OttoMascot';
import { ArrowLeft, ArrowRight, Linkedin, Mail, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function InfoPage() {
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');

  return (
    <main className="min-h-screen bg-[#f7f8f6] px-4 py-5 sm:px-8 sm:py-8 lg:px-12">
      <div className="mx-auto flex min-h-[calc(100vh-40px)] w-full max-w-6xl flex-col sm:min-h-[calc(100vh-64px)]">
        <header className="flex items-center justify-between pb-5">
          <Link href="/" className="text-xl font-bold text-gray-900">Otto</Link>
          <span className="text-sm text-gray-500">Step 1 of 2</span>
        </header>

        <section className="grid flex-1 grid-cols-1 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm lg:grid-cols-[0.85fr_1.15fr]">
          <div className="min-w-0 flex flex-col justify-between bg-[#e7f0eb] p-7 sm:p-10 lg:p-12">
            <div>
              <div className="mb-7 hidden lg:block">
                <OttoMascot size={135} expression="happy" />
              </div>
              <p className="mb-3 text-sm font-semibold uppercase text-emerald-800">A quick introduction</p>
              <h1 className="max-w-md text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                Let&apos;s get started.
              </h1>
              <p className="mt-5 max-w-md leading-7 text-gray-600">
                Share one way to identify your session. Your LinkedIn is optional, and the conversation does the real work.
              </p>
            </div>

            <div className="mt-7 flex items-center gap-3 text-sm text-gray-600 lg:mt-10">
              <ShieldCheck className="h-5 w-5 text-emerald-700" />
              Your details are only used for this experience.
            </div>
          </div>

          <div className="min-w-0 flex items-center p-7 sm:p-10 lg:p-14">
            <div className="w-full">
              <div className="min-w-0 grid grid-cols-1 gap-6 xl:grid-cols-2">
                <div className="min-w-0">
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-800">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      className="min-h-12 min-w-0 w-full rounded-lg border border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-900 transition placeholder:text-gray-400 hover:border-gray-400 focus:border-emerald-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="min-w-0">
                  <label htmlFor="linkedin" className="mb-2 block text-sm font-semibold text-gray-800">
                    LinkedIn profile <span className="font-normal text-gray-400">(optional)</span>
                  </label>
                  <div className="relative">
                    <Linkedin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      id="linkedin"
                      type="url"
                      value={linkedin}
                      onChange={(event) => setLinkedin(event.target.value)}
                      placeholder="linkedin.com/in/yourname"
                      className="min-h-12 min-w-0 w-full rounded-lg border border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-900 transition placeholder:text-gray-400 hover:border-gray-400 focus:border-emerald-700 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-500">
                Otto uses this context to make the conversation and results more relevant to you.
              </p>

              <div className="mt-9 flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <Link href="/" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-gray-900">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Link>
                <Link
                  href={email ? '/preferences' : '#'}
                  aria-disabled={!email}
                  className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 font-semibold transition ${email ? 'bg-[#235c4b] text-white hover:bg-[#194b3d]' : 'cursor-not-allowed bg-gray-200 text-gray-400'}`}
                >
                  Continue
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
