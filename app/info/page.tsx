'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Mail, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function InfoPage() {
  const [email, setEmail] = useState('');
  const cleanEmail = email.trim().toLowerCase();
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);

  const rememberEmail = () => {
    if (emailIsValid) {
      localStorage.setItem('otto_email', cleanEmail);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f8f6] px-4 py-5 sm:px-8 sm:py-8 lg:px-12">
      <div className="mx-auto flex min-h-[calc(100vh-40px)] w-full max-w-6xl flex-col sm:min-h-[calc(100vh-64px)]">
        <header className="flex justify-end pb-5">
          <span className="text-sm text-gray-500">Step 1 of 2</span>
        </header>

        <section className="grid flex-1 grid-cols-1 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex min-w-0 flex-col justify-center bg-[#e7f0eb] p-7 sm:p-10 lg:p-12">
            <p className="mb-3 text-sm font-semibold uppercase text-emerald-800">Before we start</p>
            <h1 className="max-w-md text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              Where should we send your results?
            </h1>
            <p className="mt-5 max-w-md leading-7 text-gray-600">
              Add your email now and your summary will be sent when the conversation is done.
            </p>
          </div>

          <div className="flex min-w-0 items-center p-7 sm:p-10 lg:p-14">
            <div className="w-full">
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

              <div className="mt-4 flex items-start gap-3 text-sm leading-6 text-gray-500">
                <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-700" />
                <p>We&apos;ll only use this address to send your result.</p>
              </div>

              <div className="mt-9 flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <Link href="/" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-gray-900">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Link>
                <Link
                  href={emailIsValid ? '/preferences' : '#'}
                  onClick={rememberEmail}
                  aria-disabled={!emailIsValid}
                  className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 font-semibold transition ${emailIsValid ? 'bg-[#235c4b] text-white hover:bg-[#194b3d]' : 'cursor-not-allowed bg-gray-200 text-gray-400'}`}
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
