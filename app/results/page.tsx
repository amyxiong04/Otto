'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import OttoMascot from '@/components/OttoMascot';

type AnalysisResult = {
  personalityType: string;
  hashtags: string[];
  workPersona: string;
  professionalStrengths: {
    focused: number;
    independent: number;
    social: number;
    structured: number;
    analytical: number;
    creative: number;
    collaborative: number;
  };
  workBesties: string[];
  colleagues: string[];
};

export default function ResultsPage() {
  return (
    <Suspense fallback={<ResultsLoading />}>
      <ResultsContent />
    </Suspense>
  );
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const analyzeConversation = async () => {
      const historyParam = searchParams.get('history');
      if (!historyParam) {
        // Demo data if no history
        setResults({
          personalityType: "Dolphin - Collaborative Connector",
          hashtags: ["#PeopleEnergy", "#IdeaFlow"],
          workPersona: "You do your best work when ideas can move between people instead of staying stuck in one person's head. You bring warmth and momentum to a team, especially when the environment leaves room for creativity.",
          professionalStrengths: {
            focused: 4,
            independent: 2,
            social: 5,
            structured: 3,
            analytical: 3,
            creative: 5,
            collaborative: 5
          },
          workBesties: ["Beaver - Systems Builder", "Fox - Adaptive Strategist"],
          colleagues: ["Bear - Independent Builder", "Owl - Deep Thinker"]
        });
        setLoading(false);
        return;
      }

      try {
        const conversationHistory = JSON.parse(decodeURIComponent(historyParam));
        
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ conversationHistory }),
        });

        if (response.ok) {
          const data = await response.json();
          setResults(data);
        }
      } catch (error) {
        console.error('Error analyzing:', error);
      } finally {
        setLoading(false);
      }
    };

    analyzeConversation();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8f6]">
        <div className="text-center">
          <OttoMascot size={100} expression="happy" />
          <p className="mt-4 text-lg font-semibold text-gray-800">Analyzing your work style...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8f6]">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-900">Something went wrong.</p>
          <button 
            onClick={() => router.push('/call')}
            className="mt-4 rounded-lg bg-[#235c4b] px-6 py-3 font-semibold text-white"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  // Transform data for radar chart
  const radarData = [
    { subject: 'Focused', value: results.professionalStrengths.focused, fullMark: 5 },
    { subject: 'Independent', value: results.professionalStrengths.independent, fullMark: 5 },
    { subject: 'Social', value: results.professionalStrengths.social, fullMark: 5 },
    { subject: 'Structured', value: results.professionalStrengths.structured, fullMark: 5 },
    { subject: 'Analytical', value: results.professionalStrengths.analytical, fullMark: 5 },
    { subject: 'Creative', value: results.professionalStrengths.creative, fullMark: 5 },
    { subject: 'Collaborative', value: results.professionalStrengths.collaborative, fullMark: 5 },
  ];

  return (
    <main className="min-h-screen bg-[#f7f8f6] px-4 py-5 sm:px-8 sm:py-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between border-b border-gray-200 pb-5">
          <button onClick={() => router.push('/')} className="text-xl font-bold text-gray-900">Otto</button>
          <span className="text-sm text-gray-500">Your work-style profile</span>
        </header>

        <section className="grid grid-cols-1 items-center gap-6 py-8 md:grid-cols-[1fr_auto] md:gap-10 md:py-10">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase text-emerald-800">Your workplace animal</p>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">{results.personalityType}</h1>
            <div className="mt-5 flex flex-wrap gap-2">
            {results.hashtags.map((tag, i) => (
              <span key={i} className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600">
                {tag}
              </span>
            ))}
            </div>
          </div>
          <div className="hidden h-32 w-32 items-center justify-center rounded-lg bg-[#e7f0eb] md:flex lg:h-40 lg:w-40">
            <OttoMascot size={110} expression="happy" />
          </div>
        </section>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="flex min-h-[430px] flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-2">
              <p className="text-sm font-semibold uppercase text-gray-500">At a glance</p>
              <h2 className="mt-1 text-2xl font-bold text-gray-900">Professional strengths</h2>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <ResponsiveContainer width="100%" height={340}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#d9e2de" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 600 }}
                  />
                  <PolarRadiusAxis angle={90} domain={[0, 5]} tick={false} />
                  <Radar 
                    name="Strengths" 
                    dataKey="value" 
                    stroke="#2f765f"
                    fill="#8fc2af"
                    fillOpacity={0.55}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-5">
            <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase text-gray-500">How you work</p>
              <h2 className="mt-1 text-xl font-bold text-gray-900">Work persona</h2>
              <p className="mt-4 leading-7 text-gray-600">{results.workPersona}</p>
            </section>

            <section className="rounded-lg border border-[#cddfd7] bg-[#e7f0eb] p-6">
              <h2 className="text-lg font-bold text-gray-900">Best collaborators</h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {results.workBesties.map((bestie, i) => (
                  <div key={i} className="rounded-lg border border-white bg-white/80 p-4">
                    <p className="text-sm font-semibold leading-5 text-gray-800">{bestie}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-[#ead8d2] bg-[#f7e8e2] p-6">
              <h2 className="text-lg font-bold text-gray-900">Different work styles</h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {results.colleagues.map((colleague, i) => (
                  <div key={i} className="rounded-lg border border-white bg-white/80 p-4">
                    <p className="text-sm font-semibold leading-5 text-gray-800">{colleague}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-gray-200 py-6 sm:flex-row">
          <p className="text-sm text-gray-500">Your profile reflects this conversation and can evolve over time.</p>
          <button
            onClick={() => router.push('/call')}
            className="min-h-12 w-full rounded-lg bg-[#235c4b] px-6 py-3 font-semibold text-white transition hover:bg-[#194b3d] sm:w-auto"
          >
            Chat with Otto again
          </button>
        </div>
      </div>
    </main>
  );
}

function ResultsLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f8f6]">
      <div className="text-center">
        <OttoMascot size={100} expression="happy" />
        <p className="mt-4 text-lg font-semibold text-gray-800">Analyzing your work style...</p>
      </div>
    </div>
  );
}
