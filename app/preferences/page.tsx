'use client';

import React, { useState } from 'react';
import OttoMascot from '@/components/OttoMascot';
import { ArrowRight, Briefcase, Code, Palette, LineChart } from 'lucide-react';
import Link from 'next/link';

const roles = [
  { id: 'engineering', name: 'Engineering', icon: Code, color: 'cake-sky' },
  { id: 'design', name: 'Design', icon: Palette, color: 'cake-peach' },
  { id: 'product', name: 'Product', icon: LineChart, color: 'cake-mint' },
  { id: 'other', name: 'Something else', icon: Briefcase, color: 'cake-lavender' },
];

const experienceLevels = [
  { id: 'entry', label: 'Just starting out', description: '0-2 years' },
  { id: 'mid', label: 'Getting the hang of it', description: '3-5 years' },
  { id: 'senior', label: 'Pretty experienced', description: '5-10 years' },
  { id: 'lead', label: 'Been around the block', description: '10+ years' },
];

export default function PreferencesPage() {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedExperience, setSelectedExperience] = useState<string>('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-cake-mint via-cake-cream to-cake-peach flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        
        {/* Card container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12">
          
          {/* Otto mascot */}
          <div className="flex justify-center mb-6">
            <OttoMascot size={100} expression="thinking" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800 text-center">
            What are you looking for?
          </h1>
          
          <p className="text-gray-600 mb-8 text-center">
            This helps Otto prepare the conversation
          </p>

          {/* Role selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              What type of role?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-4 rounded-2xl border-2 transition-all text-left ${
                      selectedRole === role.id
                        ? `border-${role.color} bg-${role.color}/10`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mb-2 ${selectedRole === role.id ? 'text-gray-700' : 'text-gray-400'}`} />
                    <div className="font-medium text-gray-800">{role.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Experience level */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Experience level
            </label>
            <div className="space-y-2">
              {experienceLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedExperience(level.id)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                    selectedExperience === level.id
                      ? 'border-cake-pink bg-cake-pink/10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-800">{level.label}</div>
                      <div className="text-sm text-gray-500">{level.description}</div>
                    </div>
                    {selectedExperience === level.id && (
                      <div className="w-5 h-5 rounded-full bg-cake-pink flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Continue button */}
          <Link href="/call">
            <button 
              disabled={!selectedRole || !selectedExperience}
              className="group w-full bg-gradient-to-r from-cake-mint to-cake-sky hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 flex items-center justify-center gap-3"
            >
              Talk to Otto
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          {/* Back link */}
          <div className="text-center mt-6">
            <Link href="/info" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              ← Back
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
