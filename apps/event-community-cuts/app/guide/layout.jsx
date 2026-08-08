export const metadata = {
  title: 'ASC3ND Instagram Playbook | First Month',
  description: 'ASC3ND’s first-month Instagram guide: Monday identity, Wednesday story Reels, Friday community action, plus the four-week calendar and visual system.',
  alternates: { canonical: '/guide' },
  openGraph: {
    title: 'ASC3ND Instagram Playbook | First Month',
    description: 'Three posts a week. One story people can relate to.',
    url: '/guide',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'ASC3ND Instagram Playbook | First Month',
    description: 'Three posts a week. One story people can relate to.',
  },
  robots: { index: false, follow: false },
};

export default function GuideLayout({ children }) {
  return children;
}
