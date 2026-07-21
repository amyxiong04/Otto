'use client';

import React, { useState, useEffect, useRef } from 'react';
import OttoMascot from '@/components/OttoMascot';
import { Phone, X, Send, Mic, StopCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Message = {
  role: 'otto' | 'user';
  text: string;
};

const MIN_USER_MESSAGES_FOR_RESULTS = 8;

export default function CallPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'otto', text: "Hi, nice to meet you. So you're looking for a new opportunity? Tell me what's on your mind." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [callDuration, setCallDuration] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [showResultsButton, setShowResultsButton] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Check if we have enough conversation to show results.
  useEffect(() => {
    const userMessages = messages.filter(m => m.role === 'user');
    if (userMessages.length >= MIN_USER_MESSAGES_FOR_RESULTS) {
      setShowResultsButton(true);
    }
  }, [messages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputValue;
    if (!messageText.trim()) return;

    const userMessage: Message = { role: 'user', text: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Get AI response from Otto
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          conversationHistory: messages
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const ottoMessage: Message = { role: 'otto', text: data.response };
        setMessages(prev => [...prev, ottoMessage]);
      } else {
        // Fallback response
        const ottoMessage: Message = { role: 'otto', text: "That's interesting. Tell me more about what you want next." };
        setMessages(prev => [...prev, ottoMessage]);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      const ottoMessage: Message = { role: 'otto', text: "Sorry, I had a hiccup. Can you say that again?" };
      setMessages(prev => [...prev, ottoMessage]);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await transcribeAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Please allow microphone access to use voice input!');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    setIsTranscribing(true);
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.webm');
      formData.append('model', 'whisper-1');

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const { text } = await response.json();
        console.log('Transcribed:', text);
        handleSendMessage(text);
      } else {
        alert('Transcription failed. Make sure you have OPENAI_API_KEY set in .env.local');
      }
    } catch (error) {
      console.error('Error transcribing audio:', error);
      alert('Error transcribing audio');
    } finally {
      setIsTranscribing(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const goToResults = () => {
    const historyParam = encodeURIComponent(JSON.stringify(messages));
    router.push(`/results?history=${historyParam}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cake-pink via-cake-lavender to-cake-mint p-6">
      <div className="max-w-4xl mx-auto h-screen flex flex-col py-6">
        
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-xl border-2 border-white/50 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cake-peach to-cake-rose flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Chat with Otto</h3>
                <p className="text-sm text-gray-500">Duration: {formatTime(callDuration)}</p>
              </div>
            </div>
            <Link href="/">
              <button className="p-3 rounded-full bg-red-50 hover:bg-red-100 text-red-500 transition-all">
                <X className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border-2 border-white/50 p-6 mb-6 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {message.role === 'otto' && (
                  <div className="flex-shrink-0">
                    <OttoMascot size={50} expression="happy" />
                  </div>
                )}
                <div className={`max-w-[70%] rounded-3xl px-6 py-4 shadow-md ${
                  message.role === 'otto' 
                    ? 'bg-gradient-to-br from-cake-lavender to-cake-sky text-gray-900' 
                    : 'bg-gradient-to-br from-cake-peach to-cake-rose text-gray-900'
                }`}>
                  <p className="text-sm leading-relaxed font-medium">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Show Results Button */}
          {showResultsButton && (
            <div className="mt-8 text-center">
              <button
                onClick={goToResults}
                className="px-8 py-4 bg-gradient-to-br from-cake-mint to-cake-sky hover:scale-105 transition-transform shadow-xl rounded-full font-bold text-gray-800 text-lg"
              >
                See Your Results
              </button>
              <p className="text-sm text-gray-600 mt-2">We&apos;ve learned enough to build a useful profile.</p>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border-2 border-white/50 p-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isRecording && handleSendMessage()}
              placeholder={isRecording ? "Recording..." : isTranscribing ? "Transcribing..." : "Type or speak..."}
              disabled={isRecording || isTranscribing}
              className="flex-1 px-6 py-4 rounded-2xl bg-gray-50 border-2 border-gray-200 focus:border-cake-lavender focus:outline-none text-gray-800 placeholder-gray-400 disabled:opacity-50"
            />
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isTranscribing}
              className={`px-8 py-4 rounded-2xl transition-all shadow-lg disabled:opacity-50 ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                  : 'bg-gradient-to-br from-cake-peach to-cake-rose hover:scale-105'
              }`}
            >
              {isRecording ? (
                <StopCircle className="w-5 h-5 text-white" />
              ) : (
                <Mic className="w-5 h-5 text-white" />
              )}
            </button>
            <button
              onClick={() => handleSendMessage()}
              disabled={isRecording || isTranscribing}
              className="px-8 py-4 rounded-2xl bg-gradient-to-br from-cake-mint to-cake-sky hover:scale-105 transition-transform shadow-lg disabled:opacity-50"
            >
              <Send className="w-5 h-5 text-gray-700" />
            </button>
          </div>
          {isTranscribing && (
            <p className="text-sm text-gray-500 mt-2 text-center">Transcribing your voice...</p>
          )}
        </div>

      </div>
    </div>
  );
}
