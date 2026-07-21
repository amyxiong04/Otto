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
          personalityType: "Creative Collaborator",
          hashtags: ["#TeamPlayer", "#IdeaMachine"],
          workPersona: "You thrive in collaborative environments where ideas flow freely. You bring creative energy to projects while keeping the team vibe positive and productive.",
          professionalStrengths: {
            focused: 4,
            independent: 2,
            social: 5,
            structured: 3,
            analytical: 3,
            creative: 5,
            collaborative: 5
          },
          workBesties: ["Structure Seeker", "Solo Slayer"],
          colleagues: ["Coffee Hustler", "Meeting Maven"]
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
      <div className="min-h-screen bg-gradient-to-br from-cake-pink via-cake-lavender to-cake-mint flex items-center justify-center">
        <div className="text-center">
          <OttoMascot size={100} expression="happy" />
          <p className="mt-4 text-xl font-bold text-white">Analyzing your work style...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cake-pink via-cake-lavender to-cake-mint flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-bold text-white">Something went wrong.</p>
          <button 
            onClick={() => router.push('/call')}
            className="mt-4 px-6 py-3 bg-white rounded-full font-semibold"
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
    <div className="min-h-screen bg-gradient-to-br from-cake-pink via-cake-lavender to-cake-mint p-6">
      <div className="max-w-4xl mx-auto py-8">
        
        {/* Header with Otto */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <OttoMascot size={80} expression="happy" />
          </div>
          <h1 className="text-4xl font-black text-white mb-2">You are a...</h1>
          <h2 className="text-6xl font-black text-gray-900 mb-4">{results.personalityType}</h2>
          <div className="flex gap-3 justify-center flex-wrap">
            {results.hashtags.map((tag, i) => (
              <span key={i} className="px-6 py-2 bg-white/90 rounded-full font-bold text-gray-700 text-lg">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          {/* Professional Strengths Radar Chart */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-xl border-2 border-white/50 flex flex-col">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Your Professional Strengths</h3>
            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#d4c5f9" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#4a5568', fontSize: 12, fontWeight: 600 }}
                  />
                  <PolarRadiusAxis angle={90} domain={[0, 5]} tick={false} />
                  <Radar 
                    name="Strengths" 
                    dataKey="value" 
                    stroke="#a78bfa" 
                    fill="#c4b5fd" 
                    fillOpacity={0.7}
                    strokeWidth={3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Work Persona */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-xl border-2 border-white/50">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Work Persona</h3>
              <p className="text-gray-700 leading-relaxed">{results.workPersona}</p>
            </div>

            {/* Work Besties */}
            <div className="bg-gradient-to-br from-cake-mint to-cake-sky rounded-3xl p-6 shadow-xl border-2 border-white/50">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Work Besties</h3>
              <div className="flex gap-4">
                {results.workBesties.map((bestie, i) => (
                  <div key={i} className="flex-1 bg-white/90 rounded-2xl p-4 text-center">
                    <p className="font-semibold text-gray-800 text-sm">{bestie}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Colleagues */}
            <div className="bg-gradient-to-br from-cake-lavender to-cake-pink rounded-3xl p-6 shadow-xl border-2 border-white/50">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Strictly Colleagues</h3>
              <div className="flex gap-4">
                {results.colleagues.map((colleague, i) => (
                  <div key={i} className="flex-1 bg-white/90 rounded-2xl p-4 text-center">
                    <p className="font-semibold text-gray-800 text-sm">{colleague}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Actions */}
        <div className="text-center space-y-4">
          <button
            onClick={() => router.push('/call')}
            className="px-8 py-4 bg-white hover:bg-gray-50 rounded-full font-bold text-gray-800 text-lg shadow-xl transition-all hover:scale-105"
          >
            Chat with Otto Again
          </button>
          <p className="text-white/80 text-sm">
            Ready to find your perfect role? Let&apos;s keep chatting.
          </p>
        </div>

      </div>
    </div>
  );
}

function ResultsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cake-pink via-cake-lavender to-cake-mint flex items-center justify-center">
      <div className="text-center">
        <OttoMascot size={100} expression="happy" />
        <p className="mt-4 text-xl font-bold text-white">Analyzing your work style...</p>
      </div>
    </div>
  );
}
