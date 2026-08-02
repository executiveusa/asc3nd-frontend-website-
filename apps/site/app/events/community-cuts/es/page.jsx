import { CommunityCutsPage } from '../CommunityCutsPage.jsx';

export const metadata = {
  title: 'Community Cuts for Kids | The Asc3nd Collective',
  description: 'Fresh Fade, Fresh Grade es un evento comunitario gratuito de regreso a clases en Everett con cortes de cabello, útiles escolares, comida y apoyo comunitario.',
  alternates: { canonical: '/es', languages: { en: '/', es: '/es' } },
  openGraph: {
    title: 'Community Cuts for Kids | The Asc3nd Collective',
    description: 'Un evento comunitario gratuito de regreso a clases diseñado para ayudar a los estudiantes a comenzar el año escolar con confianza.',
    url: '/es',
  },
  twitter: {
    card: 'summary',
    title: 'Community Cuts for Kids | The Asc3nd Collective',
    description: 'Un evento comunitario gratuito de regreso a clases diseñado para ayudar a los estudiantes a comenzar el año escolar con confianza.',
  },
};

export default async function PaginaCommunityCuts({ searchParams }) {
  const params = await searchParams;
  return <CommunityCutsPage locale="es" initialInterest={params?.intent} />;
}
