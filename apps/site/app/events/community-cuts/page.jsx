import { CommunityCutsPage } from './CommunityCutsPage.jsx';

export const metadata = {
  title: 'Community Cuts for Kids | The Asc3nd Collective',
  description: 'Fresh Fade, Fresh Grade is a free back-to-school community event in Everett with haircuts, school supplies, food, and community support.',
  alternates: { canonical: '/', languages: { en: '/', es: '/es' } },
  openGraph: {
    title: 'Community Cuts for Kids | The Asc3nd Collective',
    description: 'A free back-to-school community event designed to help students start the school year with confidence.',
    url: '/',
  },
  twitter: {
    card: 'summary',
    title: 'Community Cuts for Kids | The Asc3nd Collective',
    description: 'A free back-to-school community event designed to help students start the school year with confidence.',
  },
};

export default async function CommunityCutsForKidsPage({ searchParams }) {
  const params = await searchParams;
  return <CommunityCutsPage locale="en" initialInterest={params?.intent} />;
}
