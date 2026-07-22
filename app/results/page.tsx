'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, LoaderCircle, MailCheck, MailX } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { demoResult, type AnimalResult } from '@/lib/workplaceAnimals';

type ResultsResponse = AnimalResult & {
  emailDelivery?: 'sent' | 'failed' | 'not_configured' | 'not_requested';
};

export default function ResultsPage() {
  const router = useRouter();
  const hasStarted = useRef(false);
  const [results, setResults] = useState<ResultsResponse | null>(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const analyzeConversation = async () => {
      const conversation = sessionStorage.getItem('otto_conversation');
      const savedEmail = localStorage.getItem('otto_email') || '';
      setEmail(savedEmail);

      if (!conversation) {
        setResults(demoResult);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            conversationHistory: JSON.parse(conversation),
            email: savedEmail || undefined,
            profileContext: {
              role: localStorage.getItem('otto_role') || undefined,
              experience: localStorage.getItem('otto_experience') || undefined,
            },
          }),
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'We could not finish your results.');
        }

        setResults(data);
      } catch (requestError) {
        console.error('Error analyzing conversation:', requestError);
        setError(requestError instanceof Error ? requestError.message : 'We could not finish your results.');
      } finally {
        setLoading(false);
      }
    };

    analyzeConversation();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8f6]">
        <div className="text-center">
          <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-emerald-700" />
          <p className="mt-4 font-semibold text-gray-800">Putting your results together...</p>
        </div>
      </div>
    );
  }

  if (!results || error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8f6] px-5">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900">We couldn&apos;t finish your results.</h1>
          <p className="mt-3 text-gray-600">{error || 'Please try the conversation again.'}</p>
          <button onClick={() => router.push('/call')} className="mt-6 rounded-lg bg-[#235c4b] px-6 py-3 font-semibold text-white hover:bg-[#194b3d]">
            Back to the conversation
          </button>
        </div>
      </div>
    );
  }

  const radarData = [
    { subject: 'Focused', value: results.professionalStrengths.focused },
    { subject: 'Independent', value: results.professionalStrengths.independent },
    { subject: 'Social', value: results.professionalStrengths.social },
    { subject: 'Structured', value: results.professionalStrengths.structured },
    { subject: 'Analytical', value: results.professionalStrengths.analytical },
    { subject: 'Creative', value: results.professionalStrengths.creative },
    { subject: 'Collaborative', value: results.professionalStrengths.collaborative },
  ];

  return (
    <main className="min-h-screen bg-[#f7f8f6] px-4 py-5 sm:px-8 sm:py-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between border-b border-gray-200 pb-5">
          <button onClick={() => router.push('/')} className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            Home
          </button>
          <span className="text-sm text-gray-500">Your results</span>
        </header>

        <section className="py-8 md:py-10">
          <p className="mb-3 text-sm font-semibold uppercase text-emerald-800">Your workplace animal</p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">{results.personalityType}</h1>
        </section>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="flex min-h-[430px] flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <p className="text-sm font-semibold uppercase text-gray-500">At a glance</p>
            <h2 className="mt-1 text-2xl font-bold text-gray-900">Your strengths</h2>
            <div className="flex flex-1 items-center justify-center">
              <ResponsiveContainer width="100%" height={340}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#d9e2de" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 5]} tick={false} />
                  <Radar name="Strengths" dataKey="value" stroke="#2f765f" fill="#8fc2af" fillOpacity={0.55} strokeWidth={2} isAnimationActive={false} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-5">
            <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase text-gray-500">How you work</p>
              <p className="mt-4 leading-7 text-gray-600">{results.workPersona}</p>
            </section>

            <section className="rounded-lg border border-[#cddfd7] bg-[#e7f0eb] p-6">
              <h2 className="text-lg font-bold text-gray-900">You may work well with</h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {results.workBesties.map((bestie) => (
                  <div key={bestie} className="rounded-lg border border-white bg-white/80 p-4">
                    <p className="text-sm font-semibold leading-5 text-gray-800">{bestie}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-[#ead8d2] bg-[#f7e8e2] p-6">
              <h2 className="text-lg font-bold text-gray-900">People who may work differently</h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {results.colleagues.map((colleague) => (
                  <div key={colleague} className="rounded-lg border border-white bg-white/80 p-4">
                    <p className="text-sm font-semibold leading-5 text-gray-800">{colleague}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-gray-200 py-6 sm:flex-row sm:items-center">
          <EmailStatus delivery={results.emailDelivery} email={email} />
          <button onClick={() => router.push('/call')} className="min-h-12 w-full rounded-lg bg-[#235c4b] px-6 py-3 font-semibold text-white transition hover:bg-[#194b3d] sm:w-auto">
            Chat again
          </button>
        </div>
      </div>
    </main>
  );
}

function EmailStatus({ delivery, email }: { delivery?: ResultsResponse['emailDelivery']; email: string }) {
  if (!email || delivery === 'not_requested' || !delivery) {
    return <p className="text-sm text-gray-500">This result is based on what you shared in the conversation.</p>;
  }

  if (delivery === 'sent') {
    return (
      <p className="flex items-center gap-2 text-sm text-gray-600">
        <MailCheck className="h-5 w-5 text-emerald-700" />
        Sent to {email}
      </p>
    );
  }

  return (
    <p className="flex items-center gap-2 text-sm text-gray-600">
      <MailX className="h-5 w-5 text-amber-700" />
      We couldn&apos;t email this copy, but your results are here.
    </p>
  );
}
