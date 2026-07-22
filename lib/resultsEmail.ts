import { createHash } from 'crypto';
import type { AnimalResult, Strengths } from './workplaceAnimals';

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  }[character] || character));
}

function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export async function sendResultsEmail(email: string, results: AnimalResult) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESULTS_FROM_EMAIL;

  if (!apiKey || !from) {
    return 'not_configured' as const;
  }

  const topStrengths = (Object.entries(results.professionalStrengths) as Array<[keyof Strengths, number]>)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name]) => titleCase(name));
  const animalName = results.personalityType.split(' - ')[0];
  const idempotencyKey = createHash('sha256')
    .update(`${email}:${results.personalityType}:${results.workPersona}`)
    .digest('hex');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
      'User-Agent': 'Otto/1.0',
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: `Your work style: ${animalName}`,
      text: [
        `Your workplace animal is ${results.personalityType}.`,
        '',
        results.workPersona,
        '',
        `Top strengths: ${topStrengths.join(', ')}`,
        `You may work well with: ${results.workBesties.join(' and ')}`,
        '',
        'Thanks for chatting.',
      ].join('\n'),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#202522;line-height:1.6">
          <h1 style="font-size:24px;margin:0 0 8px">${escapeHtml(results.personalityType)}</h1>
          <p style="margin:0 0 24px;color:#52605a">Your work-style summary</p>
          <p>${escapeHtml(results.workPersona)}</p>
          <h2 style="font-size:16px;margin:24px 0 8px">Top strengths</h2>
          <p style="margin:0">${escapeHtml(topStrengths.join(' · '))}</p>
          <h2 style="font-size:16px;margin:24px 0 8px">People you may work well with</h2>
          <p style="margin:0">${escapeHtml(results.workBesties.join(' · '))}</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    console.error('Results email failed:', response.status, await response.text());
    return 'failed' as const;
  }

  return 'sent' as const;
}
