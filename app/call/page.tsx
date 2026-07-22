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
  const [isResponding, setIsResponding] = useState(false);
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
    setIsResponding(true);

    // Get AI response from Otto
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          conversationHistory: messages,
          profileContext: {
            role: localStorage.getItem('otto_role') || undefined,
            experience: localStorage.getItem('otto_experience') || undefined,
          },
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
    } finally {
      setIsResponding(false);
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
    sessionStorage.setItem('otto_conversation', JSON.stringify(messages));
    router.push('/results');
  };

  return (
    <main className="h-screen bg-[#eef2ef] p-3 sm:p-5 lg:p-7">
      <div className="mx-auto flex h-full max-w-6xl flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <header className="flex min-h-16 items-center justify-between border-b border-gray-200 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-[#e7f0eb]">
              <Phone className="h-5 w-5 text-emerald-800" />
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">Conversation</h1>
              <p className="text-xs text-gray-500">{isResponding ? 'Thinking...' : `In progress · ${formatTime(callDuration)}`}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-gray-500 sm:block">{messages.filter(message => message.role === 'user').length} of {MIN_USER_MESSAGES_FOR_RESULTS} responses</span>
            <Link href="/" aria-label="Leave conversation" className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-600">
              <X className="h-5 w-5" />
            </Link>
          </div>
        </header>

        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-[#4d8b76] transition-all duration-500"
            style={{ width: `${Math.min((messages.filter(message => message.role === 'user').length / MIN_USER_MESSAGES_FOR_RESULTS) * 100, 100)}%` }}
          />
        </div>

        <section className="flex-1 overflow-y-auto bg-[#fafbfa] px-4 py-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl space-y-5">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-end gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {message.role === 'otto' && (
                  <div className="hidden h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#e7f0eb] sm:flex">
                    <OttoMascot size={39} expression="happy" />
                  </div>
                )}
                <div className={`max-w-[88%] rounded-lg px-4 py-3 sm:max-w-[72%] sm:px-5 ${
                  message.role === 'otto'
                    ? 'border border-gray-200 bg-white text-gray-800 shadow-sm'
                    : 'bg-[#235c4b] text-white'
                }`}>
                  <p className="text-sm leading-6 sm:text-base">{message.text}</p>
                </div>
              </div>
            ))}
            {isResponding && (
              <div className="flex items-end gap-3">
                <div className="hidden h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#e7f0eb] sm:flex">
                  <OttoMascot size={39} expression="thinking" />
                </div>
                <div className="flex gap-1 rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm" aria-label="Reply in progress">
                  {[0, 1, 2].map((dot) => <span key={dot} className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: `${dot * 0.1}s` }} />)}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />

          {showResultsButton && !isResponding && (
            <div className="mt-8 flex flex-col items-center rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-center sm:flex-row sm:justify-between sm:text-left">
              <div className="mb-4 sm:mb-0">
                <p className="font-semibold text-gray-900">Your work-style profile is ready</p>
                <p className="mt-1 text-sm text-gray-600">You can keep chatting or see your summary now.</p>
              </div>
              <button
                onClick={goToResults}
                className="min-h-11 rounded-lg bg-[#235c4b] px-5 py-2 font-semibold text-white transition hover:bg-[#194b3d]"
              >
                See your results
              </button>
            </div>
          )}
          </div>
        </section>

        <footer className="border-t border-gray-200 bg-white p-3 sm:p-5">
          <div className="mx-auto flex max-w-4xl items-center gap-2 sm:gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isRecording && !isResponding && handleSendMessage()}
              placeholder={isRecording ? "Recording..." : isTranscribing ? "Transcribing..." : "Type or speak..."}
              disabled={isRecording || isTranscribing || isResponding}
              className="min-h-12 min-w-0 flex-1 rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-emerald-700 focus:bg-white focus:outline-none disabled:opacity-60 sm:px-5"
            />
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isTranscribing}
              aria-label={isRecording ? 'Stop recording' : 'Start voice input'}
              className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg transition disabled:opacity-50 ${
                isRecording
                  ? 'animate-pulse bg-red-600 text-white hover:bg-red-700'
                  : 'border border-gray-300 bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {isRecording ? (
                <StopCircle className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => handleSendMessage()}
              disabled={isRecording || isTranscribing || isResponding || !inputValue.trim()}
              aria-label="Send message"
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#235c4b] text-white transition hover:bg-[#194b3d] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 sm:w-14"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          {isTranscribing && (
            <p className="mt-2 text-center text-sm text-gray-500">Transcribing your voice...</p>
          )}
        </footer>
      </div>
    </main>
  );
}
