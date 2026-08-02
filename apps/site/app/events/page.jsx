import { CommunityCutsPage } from './community-cuts/CommunityCutsPage.jsx';

export const metadata = {
  title: 'Community Cuts for Kids | The Asc3nd Collective',
  description: 'Fresh Fade, Fresh Grade is a free back-to-school community event in Everett with haircuts, school supplies, food, and community support.',
};

export default async function EventsPage({ searchParams }) {
  const params = await searchParams;
  return <CommunityCutsPage locale="en" initialInterest={params?.intent} />;
}