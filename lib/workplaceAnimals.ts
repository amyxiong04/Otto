export type Strengths = {
  focused: number;
  independent: number;
  social: number;
  structured: number;
  analytical: number;
  creative: number;
  collaborative: number;
};

export type AnimalResult = {
  personalityType: string;
  workPersona: string;
  professionalStrengths: Strengths;
  workBesties: string[];
  colleagues: string[];
};

type Animal = {
  label: string;
  strengths: Strengths;
  rationale: string;
  besties: string[];
  different: string[];
};

const animals: Record<string, Animal> = {
  bear: {
    label: 'Bear - Independent Anchor',
    strengths: { focused: 5, independent: 5, social: 1, structured: 3, analytical: 3, creative: 2, collaborative: 2 },
    rationale: 'You like having room to focus, make decisions, and take ownership of your work.',
    besties: ['Beaver - Reliable Builder', 'Elephant - Steady Supporter'],
    different: ['Dolphin - People Connector', 'Bee - Team Energizer'],
  },
  dolphin: {
    label: 'Dolphin - People Connector',
    strengths: { focused: 3, independent: 1, social: 5, structured: 2, analytical: 2, creative: 4, collaborative: 5 },
    rationale: 'You like sharing ideas and working closely with other people.',
    besties: ['Owl - Thoughtful Analyst', 'Beaver - Reliable Builder'],
    different: ['Bear - Independent Anchor', 'Cat - Flexible Creator'],
  },
  owl: {
    label: 'Owl - Thoughtful Analyst',
    strengths: { focused: 5, independent: 4, social: 2, structured: 3, analytical: 5, creative: 2, collaborative: 2 },
    rationale: 'You prefer to understand a problem properly before deciding what to do.',
    besties: ['Dolphin - People Connector', 'Elephant - Steady Supporter'],
    different: ['Bee - Team Energizer', 'Fox - Adaptive Strategist'],
  },
  beaver: {
    label: 'Beaver - Reliable Builder',
    strengths: { focused: 4, independent: 3, social: 2, structured: 5, analytical: 4, creative: 2, collaborative: 4 },
    rationale: 'You do your best work with a clear plan and enjoy making things run smoothly.',
    besties: ['Fox - Adaptive Strategist', 'Dolphin - People Connector'],
    different: ['Cat - Flexible Creator', 'Bee - Team Energizer'],
  },
  fox: {
    label: 'Fox - Adaptive Strategist',
    strengths: { focused: 3, independent: 4, social: 3, structured: 2, analytical: 4, creative: 5, collaborative: 3 },
    rationale: 'You are comfortable adjusting as you go and finding a smart way through unclear problems.',
    besties: ['Beaver - Reliable Builder', 'Elephant - Steady Supporter'],
    different: ['Owl - Thoughtful Analyst', 'Bear - Independent Anchor'],
  },
  bee: {
    label: 'Bee - Team Energizer',
    strengths: { focused: 4, independent: 2, social: 4, structured: 4, analytical: 2, creative: 3, collaborative: 5 },
    rationale: 'You like being useful, staying involved, and helping a team keep moving.',
    besties: ['Owl - Thoughtful Analyst', 'Elephant - Steady Supporter'],
    different: ['Cat - Flexible Creator', 'Bear - Independent Anchor'],
  },
  cat: {
    label: 'Cat - Flexible Creator',
    strengths: { focused: 4, independent: 5, social: 2, structured: 1, analytical: 3, creative: 5, collaborative: 2 },
    rationale: 'You value trust and flexibility, especially when you have space to approach work in your own way.',
    besties: ['Dolphin - People Connector', 'Beaver - Reliable Builder'],
    different: ['Bee - Team Energizer', 'Elephant - Steady Supporter'],
  },
  elephant: {
    label: 'Elephant - Steady Supporter',
    strengths: { focused: 4, independent: 2, social: 4, structured: 4, analytical: 4, creative: 2, collaborative: 5 },
    rationale: 'You are patient, dependable, and good at keeping track of the bigger picture.',
    besties: ['Fox - Adaptive Strategist', 'Cat - Flexible Creator'],
    different: ['Bear - Independent Anchor', 'Owl - Thoughtful Analyst'],
  },
};

const strengthKeys = Object.keys(animals.bear.strengths) as Array<keyof Strengths>;

function normalizeStrengths(strengths: Strengths): Strengths {
  return Object.fromEntries(
    strengthKeys.map((key) => [key, Math.max(1, Math.min(5, Math.round(Number(strengths[key]) || 3)))])
  ) as Strengths;
}

export function buildAnimalResult(strengths: Strengths, personalSummary: string): AnimalResult {
  const normalized = normalizeStrengths(strengths);
  const match = Object.values(animals).reduce((best, animal) => {
    const distance = strengthKeys.reduce((total, key) => {
      const difference = normalized[key] - animal.strengths[key];
      return total + difference * difference;
    }, 0);

    return distance < best.distance ? { animal, distance } : best;
  }, { animal: animals.bear, distance: Number.POSITIVE_INFINITY }).animal;

  const cleanSummary = personalSummary.trim().replace(/\s+/g, ' ');

  return {
    personalityType: match.label,
    workPersona: cleanSummary ? `${match.rationale} ${cleanSummary}` : match.rationale,
    professionalStrengths: normalized,
    workBesties: match.besties,
    colleagues: match.different,
  };
}

export const demoResult: AnimalResult = buildAnimalResult(
  { focused: 3, independent: 2, social: 5, structured: 2, analytical: 3, creative: 4, collaborative: 5 },
  'You like talking ideas through with a team, but you also want some freedom to try things your own way.'
);
