'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, ArrowLeft, ArrowRight, Github, LoaderCircle, Mail, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

type GithubStatus = 'idle' | 'loading' | 'error';

export default function InfoPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [github, setGithub] = useState('');
  const [githubStatus, setGithubStatus] = useState<GithubStatus>('idle');
  const [githubError, setGithubError] = useState('');
  const cleanEmail = email.trim().toLowerCase();
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);

  useEffect(() => {
    setEmail(localStorage.getItem('otto_email') || '');
    setGithub(localStorage.getItem('otto_github_handle') || '');
  }, []);

  const continueToPreferences = (useGithub: boolean) => {
    localStorage.setItem('otto_email', cleanEmail);
    if (!useGithub) {
      localStorage.removeItem('otto_github_context');
      localStorage.removeItem('otto_github_handle');
    }
    router.push('/preferences');
  };

  const handleContinue = async () => {
    if (!emailIsValid || githubStatus === 'loading') return;

    if (!github.trim()) {
      continueToPreferences(false);
      return;
    }

    setGithubStatus('loading');
    setGithubError('');

    try {
      const response = await fetch('/api/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ github }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'We could not read that GitHub profile.');
      }

      localStorage.setItem('otto_github_context', data.context);
      localStorage.setItem('otto_github_handle', data.username);
      localStorage.setItem('otto_email', cleanEmail);
      router.push('/preferences');
    } catch (error) {
      setGithubStatus('error');
      setGithubError(error instanceof Error ? error.message : 'We could not read that GitHub profile.');
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
              A little context helps.
            </h1>
            <p className="mt-5 max-w-md leading-7 text-gray-600">
              We&apos;ll email your results when you&apos;re done. A GitHub profile is optional and can help make the conversation more relevant.
            </p>
          </div>

          <div className="flex min-w-0 items-center p-7 sm:p-10 lg:p-14">
            <div className="w-full space-y-6">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-800">Email address</label>
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

              <div>
                <label htmlFor="github" className="mb-2 block text-sm font-semibold text-gray-800">
                  GitHub profile <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <div className="relative">
                  <Github className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="github"
                    type="text"
                    value={github}
                    onChange={(event) => {
                      setGithub(event.target.value);
                      setGithubStatus('idle');
                      setGithubError('');
                    }}
                    placeholder="github.com/username"
                    className="min-h-12 min-w-0 w-full rounded-lg border border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-900 transition placeholder:text-gray-400 hover:border-gray-400 focus:border-emerald-700 focus:outline-none"
                  />
                </div>
                <p className="mt-2 text-sm leading-5 text-gray-500">We&apos;ll only look at public languages, topics, and project descriptions.</p>
              </div>

              {githubStatus === 'error' && (
                <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-gray-700">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-700" />
                  <div>
                    <p>{githubError}</p>
                    <button type="button" onClick={() => continueToPreferences(false)} className="mt-1 font-semibold text-amber-800 hover:underline">
                      Continue without GitHub
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3 text-sm leading-6 text-gray-500">
                <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-700" />
                <p>Your email is only used for your result. GitHub context is only used to tailor the conversation.</p>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <Link href="/" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-gray-900">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Link>
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={!emailIsValid || githubStatus === 'loading'}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#235c4b] px-6 font-semibold text-white transition hover:bg-[#194b3d] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                >
                  {githubStatus === 'loading' ? (
                    <>
                      <LoaderCircle className="h-5 w-5 animate-spin" />
                      Reading GitHub...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
