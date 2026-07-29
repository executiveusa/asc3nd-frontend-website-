import { PublicNav } from '../../../components/PublicNav';
import { tenantSite } from '../../../tenant.config';
import Link from 'next/link';

export default function BlogPageES() {
  const posts = [
    {
      id: 1,
      title: 'Construyendo Resiliencia en la Juventud de Seattle',
      excerpt: 'Cómo nuestros programas de mentoría están equipando a la próxima generación con las herramientas que necesitan para superar los desafíos y prosperar.',
      date: '15 de Junio, 2026',
      author: 'Equipo Asc3nd'
    },
    {
      id: 2,
      title: 'Lanzamiento de la Iniciativa de Apoyo Educativo de Verano',
      excerpt: 'Únase a nosotros en el inicio de nuestros programas académicos de verano destinados a prevenir el retroceso y preparar a los estudiantes para el año escolar.',
      date: '22 de Mayo, 2026',
      author: 'Equipo Asc3nd'
    },
    {
      id: 3,
      title: 'Enfoque Comunitario: Proyectos de Servicio Dirigidos por Jóvenes',
      excerpt: 'Destacando el increíble impacto que nuestros jóvenes líderes están logrando en el condado de King a través de sus proyectos de servicio comunitario.',
      date: '10 de Abril, 2026',
      author: 'Equipo Asc3nd'
    }
  ];

  return (
    <>
      <PublicNav />
      <main className="hp-section" style={{ backgroundColor: tenantSite.theme.black, color: tenantSite.theme.white }}>
        <div className="hp-container">
          <div className="hp-center-head" style={{ marginBottom: '40px' }}>
            <span className="hp-eyebrow hp-eyebrow-gold">ÚLTIMAS NOTICIAS</span>
            <h2>BLOG DE ASC3ND</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>Historias de impacto, próximos eventos y noticias de nuestra comunidad.</p>
          </div>
          
          <div style={{ display: 'grid', gap: '30px', maxWidth: '800px', margin: '0 auto' }}>
            {posts.map(post => (
              <article key={post.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '30px' }}>
                <span style={{ color: tenantSite.theme.gold, fontSize: '0.9rem', fontWeight: 'bold' }}>{post.date}</span>
                <h3 style={{ fontSize: '1.8rem', margin: '10px 0' }}>
                  <Link href={`/es/blog/${post.id}`} style={{ color: 'white', textDecoration: 'none' }}>
                    {post.title}
                  </Link>
                </h3>
                <p style={{ color: '#ccc', marginBottom: '15px' }}>{post.excerpt}</p>
                <Link href={`/es/blog/${post.id}`} style={{ color: tenantSite.theme.gold, textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  Leer Artículo <span>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}