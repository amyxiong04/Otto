import { NextRequest, NextResponse } from 'next/server';

type GitHubUser = {
  login: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
};

type GitHubRepository = {
  name: string;
  description: string | null;
  language: string | null;
  topics: string[];
  fork: boolean;
  archived: boolean;
};

function parseUsername(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return null;

  let username = trimmed.replace(/^@/, '');
  if (/^https?:\/\//i.test(username) || username.toLowerCase().includes('github.com/')) {
    try {
      const url = new URL(/^https?:\/\//i.test(username) ? username : `https://${username}`);
      if (!['github.com', 'www.github.com'].includes(url.hostname.toLowerCase())) return null;
      username = url.pathname.split('/').filter(Boolean)[0] || '';
    } catch {
      return null;
    }
  }

  return /^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(username) ? username : null;
}

function githubHeaders() {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2026-03-10',
    'User-Agent': 'Otto-work-style',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

export async function POST(request: NextRequest) {
  try {
    const { github } = await request.json() as { github?: string };
    const username = parseUsername(github || '');

    if (!username) {
      return NextResponse.json({ error: 'Enter a valid GitHub username or profile URL.' }, { status: 400 });
    }

    const headers = githubHeaders();
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?type=owner&sort=pushed&direction=desc&per_page=30`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (userResponse.status === 404) {
      return NextResponse.json({ error: 'We could not find that public GitHub profile.' }, { status: 404 });
    }

    if (!userResponse.ok || !reposResponse.ok) {
      console.error('GitHub lookup failed:', userResponse.status, reposResponse.status);
      return NextResponse.json({ error: 'GitHub could not be reached right now. You can continue without it.' }, { status: 503 });
    }

    const user = await userResponse.json() as GitHubUser;
    const repositories = (await reposResponse.json() as GitHubRepository[])
      .filter((repo) => !repo.fork && !repo.archived);

    const languageCounts = new Map<string, number>();
    const topicCounts = new Map<string, number>();
    repositories.forEach((repo) => {
      if (repo.language) languageCounts.set(repo.language, (languageCounts.get(repo.language) || 0) + 1);
      repo.topics.forEach((topic) => topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1));
    });

    const topLanguages = Array.from(languageCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([language]) => language);
    const topTopics = Array.from(topicCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([topic]) => topic);
    const projects = repositories
      .filter((repo) => repo.description || repo.language || repo.topics.length)
      .slice(0, 8)
      .map((repo) => ({
        name: repo.name.slice(0, 100),
        description: repo.description?.slice(0, 240) || '',
        language: repo.language || '',
        topics: repo.topics.slice(0, 5),
      }));

    const context = [
      `GitHub profile: @${user.login}${user.name ? ` (${user.name})` : ''}.`,
      user.bio ? `Public bio: ${user.bio.slice(0, 240)}.` : '',
      topLanguages.length ? `Common repository languages: ${topLanguages.join(', ')}.` : '',
      topTopics.length ? `Common project topics: ${topTopics.join(', ')}.` : '',
      projects.length
        ? `Recent original public projects: ${projects.map((project) => `${project.name}${project.description ? ` - ${project.description}` : ''}${project.language ? ` [${project.language}]` : ''}`).join('; ')}.`
        : '',
    ].filter(Boolean).join('\n').slice(0, 2400);

    return NextResponse.json({
      username: user.login,
      projectCount: repositories.length,
      topLanguages,
      topTopics,
      context,
    });
  } catch (error) {
    console.error('GitHub extraction error:', error);
    return NextResponse.json({ error: 'We could not read that GitHub profile right now.' }, { status: 500 });
  }
}
