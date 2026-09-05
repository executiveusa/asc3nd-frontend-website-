import { CommunityCutsPage } from '../CommunityCutsPage.jsx';

export const metadata = {
  title: 'Community Cuts for Kids | ASC3ND Collective',
  description: 'Community Cuts for Kids — ASC3ND Collective community event page.',
  alternates: { canonical: '/community-cuts' },
};

export default function CommunityCutsArchivePage() {
  return <CommunityCutsPage locale="en" initialInterest="attend" />;
}
