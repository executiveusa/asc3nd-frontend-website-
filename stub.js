const fs = require('fs');
const path = require('path');

const routes = [
  'about', 'mission', 'programs', 'get-involved', 'events', 
  'stories', 'donate', 'contact', 'privacy', 'terms', 
  'es/programas', 'es/sumate', 'es/contacto', 'blog', 
  'es/blog', 'store'
];

const stubContent = (rel) => `import { PublicNav } from '${rel}components/PublicNav';

export default function StubPage() {
  return (
    <>
      <PublicNav />
      <main className="hp-section">
        <div className="hp-container">
          <h1 style={{color: '#F5A617', margin: '100px 0 20px'}}>PAGE UNDER CONSTRUCTION</h1>
          <p style={{color: '#fff'}}>This route is being updated. Please check back later.</p>
          <a href="/" className="hp-btn-outline" style={{marginTop: '20px', display: 'inline-block'}}>RETURN HOME</a>
        </div>
      </main>
    </>
  );
}`;

routes.forEach(r => {
  const p = path.join('apps/site/app', r);
  fs.mkdirSync(p, {recursive: true});
  const rel = r.startsWith('es/') ? '../../../' : '../../';
  fs.writeFileSync(path.join(p, 'page.jsx'), stubContent(rel));
});
