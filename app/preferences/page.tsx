'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Briefcase, Check, Code, LineChart, Palette } from 'lucide-react';
import Link from 'next/link';

const roles = [
  { id: 'engineering', name: 'Engineering', icon: Code, accent: 'bg-[#e4eff5]' },
  { id: 'design', name: 'Design', icon: Palette, accent: 'bg-[#f7e8e2]' },
  { id: 'product', name: 'Product', icon: LineChart, accent: 'bg-[#e7f0eb]' },
  { id: 'other', name: 'Something else', icon: Briefcase, accent: 'bg-[#eeeaf3]' },
];

const experienceLevels = [
  { id: 'entry', label: 'Just starting out', description: '0-2 years' },
  { id: 'mid', label: 'Building experience', description: '3-5 years' },
  { id: 'senior', label: 'Highly experienced', description: '5-10 years' },
  { id: 'lead', label: 'Leading the way', description: '10+ years' },
];

export default function PreferencesPage() {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const canContinue = selectedRole && selectedExperience;

  return (
    <main className="min-h-screen bg-[#f7f8f6] px-4 py-5 sm:px-8 sm:py-8 lg:px-12">
      <div className="mx-auto flex min-h-[calc(100vh-40px)] w-full max-w-6xl flex-col sm:min-h-[calc(100vh-64px)]">
        <header className="flex justify-end pb-5">
          <span className="text-sm text-gray-500">Step 2 of 2</span>
        </header>

        <section className="flex flex-1 flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-9 lg:p-11">
          <div className="mb-8 flex flex-col justify-between gap-4 border-b border-gray-200 pb-7 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase text-emerald-800">A little context</p>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">What are you looking for?</h1>
            </div>
            <p className="max-w-md leading-6 text-gray-500">These two details help us start in the right place.</p>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            <fieldset>
              <legend className="mb-4 text-sm font-semibold text-gray-800">Type of role</legend>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const selected = selectedRole === role.id;
                  return (
                    <button
                      type="button"
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      aria-pressed={selected}
                      className={`relative min-h-28 rounded-lg border p-4 text-left transition ${selected ? 'border-emerald-700 bg-emerald-50 shadow-sm' : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'}`}
                    >
                      <span className={`mb-4 flex h-9 w-9 items-center justify-center rounded-lg ${role.accent}`}>
                        <Icon className="h-5 w-5 text-gray-700" />
                      </span>
                      <span className="font-semibold text-gray-900">{role.name}</span>
                      {selected && <Check className="absolute right-3 top-3 h-5 w-5 text-emerald-700" />}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-4 text-sm font-semibold text-gray-800">Experience level</legend>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {experienceLevels.map((level) => {
                  const selected = selectedExperience === level.id;
                  return (
                    <button
                      type="button"
                      key={level.id}
                      onClick={() => setSelectedExperience(level.id)}
                      aria-pressed={selected}
                      className={`relative min-h-20 rounded-lg border px-4 py-3 text-left transition ${selected ? 'border-emerald-700 bg-emerald-50 shadow-sm' : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'}`}
                    >
                      <span className="block pr-6 font-semibold text-gray-900">{level.label}</span>
                      <span className="mt-1 block text-sm text-gray-500">{level.description}</span>
                      {selected && <Check className="absolute right-3 top-3 h-5 w-5 text-emerald-700" />}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>

          <div className="mt-9 flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/info" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <Link
              href={canContinue ? '/call' : '#'}
              onClick={() => {
                if (canContinue) {
                  localStorage.setItem('otto_role', selectedRole);
                  localStorage.setItem('otto_experience', selectedExperience);
                }
              }}
              aria-disabled={!canContinue}
              className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 font-semibold transition ${canContinue ? 'bg-[#235c4b] text-white hover:bg-[#194b3d]' : 'cursor-not-allowed bg-gray-200 text-gray-400'}`}
            >
              Start chatting
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
