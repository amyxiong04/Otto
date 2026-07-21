'use client';

import { useEffect, useState } from 'react';
import { Phone, PhoneOff } from 'lucide-react';

interface IncomingCallProps {
  onAccept: () => void;
  onDecline: () => void;
}

export default function IncomingCall({ onAccept, onDecline }: IncomingCallProps) {
  const [isRinging, setIsRinging] = useState(false);

  useEffect(() => {
    setIsRinging(true);
    const interval = setInterval(() => {
      // Reserved for a future ringtone cue.
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center transform transition-all duration-500 scale-100">
        <div className="relative mx-auto mb-6">
          {isRinging && (
            <>
              <div className="absolute inset-0 -m-8 bg-ghibli-ocean/20 rounded-full animate-ping" />
              <div className="absolute inset-0 -m-6 bg-ghibli-ocean/30 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            </>
          )}

          <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-ghibli-warm to-ghibli-sunset rounded-full flex items-center justify-center shadow-lg animate-ring">
            <span className="text-7xl">Otto</span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 animate-pulse-slow">
            Incoming Call...
          </h2>
          <p className="text-xl text-ghibli-forest font-medium mb-1">
            Otto
          </p>
          <p className="text-sm text-gray-600">
            Your friendly career advisor
          </p>
        </div>

        <div className="mb-8 p-4 bg-ghibli-sky/20 rounded-2xl">
          <p className="text-sm text-gray-700 leading-relaxed">
            &quot;Hey there! I&apos;m Otto, and I&apos;d love to chat with you about finding your dream job.
            No boring interviews, just a friendly conversation about what makes you happy at work!&quot;
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onDecline}
            className="group relative bg-gradient-to-br from-red-400 to-red-500 text-white p-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95"
            aria-label="Decline call"
          >
            <PhoneOff className="w-8 h-8" />
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Maybe later
            </span>
          </button>

          <button
            onClick={onAccept}
            className="group relative bg-gradient-to-br from-green-400 to-ghibli-grass text-white p-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 animate-bounce-slow"
            aria-label="Accept call"
          >
            <Phone className="w-8 h-8" />
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Let&apos;s chat!
            </span>
          </button>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 italic">
            Friendly career chats, minus the awkward interview energy.
          </p>
        </div>
      </div>
    </div>
  );
}
