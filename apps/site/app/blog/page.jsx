import { PublicNav } from '../../components/PublicNav';
import { tenantSite } from '../../tenant.config';
import Link from 'next/link';

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: 'Building Resilience in Seattle Youth',
      excerpt: 'How our mentorship programs are equipping the next generation with the tools they need to overcome challenges and thrive in today\'s world.',
      date: 'June 15, 2026',
      author: 'Asc3nd Team'
    },
    {
      id: 2,
      title: 'Summer Education Support Initiative Launches',
      excerpt: 'Join us as we kick off our summer academic programs aimed at preventing the summer slide and preparing students for the upcoming school year.',
      date: 'May 22, 2026',
      author: 'Asc3nd Team'
    },
    {
      id: 3,
      title: 'Community Spotlight: Youth Led Service Projects',
      excerpt: 'Highlighting the incredible impact our young leaders are making in King County through their dedicated community service projects this spring.',
      date: 'April 10, 2026',
      author: 'Asc3nd Team'
    }
  ];

  return (
    <>
      <PublicNav />
      <main className="hp-section" style={{ backgroundColor: tenantSite.theme.black, color: tenantSite.theme.white }}>
        <div className="hp-container">
          <div className="hp-center-head" style={{ marginBottom: '40px' }}>
            <span className="hp-eyebrow hp-eyebrow-gold">LATEST UPDATES</span>
            <h2>ASC3ND BLOG</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>Stories of impact, upcoming events, and news from our community.</p>
          </div>
          
          <div style={{ display: 'grid', gap: '30px', maxWidth: '800px', margin: '0 auto' }}>
            {posts.map(post => (
              <article key={post.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '30px' }}>
                <span style={{ color: tenantSite.theme.gold, fontSize: '0.9rem', fontWeight: 'bold' }}>{post.date}</span>
                <h3 style={{ fontSize: '1.8rem', margin: '10px 0' }}>
                  <Link href={`/blog/${post.id}`} style={{ color: 'white', textDecoration: 'none' }}>
                    {post.title}
                  </Link>
                </h3>
                <p style={{ color: '#ccc', marginBottom: '15px' }}>{post.excerpt}</p>
                <Link href={`/blog/${post.id}`} style={{ color: tenantSite.theme.gold, textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  Read Article <span>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}