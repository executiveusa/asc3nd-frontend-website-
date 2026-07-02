import { PublicNav } from '../../components/PublicNav';
import { tenantSite } from '../../tenant.config';

export default function StorePage() {
  const products = [
    { id: 1, name: 'Asc3nd Classic Logo Tee', price: '$25', image: '/images/asc3nd-site-reference.jpg' },
    { id: 2, name: 'Elevate Youth Hoodie', price: '$45', image: '/images/asc3nd-site-reference.jpg' },
    { id: 3, name: 'Asc3nd Collective Snapback', price: '$30', image: '/images/asc3nd-site-reference.jpg' },
    { id: 4, name: 'Empowerment Tote Bag', price: '$20', image: '/images/asc3nd-site-reference.jpg' },
    { id: 5, name: 'Future Leaders Mug', price: '$15', image: '/images/asc3nd-site-reference.jpg' },
    { id: 6, name: 'Community Builder Poster', price: '$18', image: '/images/asc3nd-site-reference.jpg' },
    { id: 7, name: 'Asc3nd Vinyl Sticker Pack', price: '$10', image: '/images/asc3nd-site-reference.jpg' },
  ];

  return (
    <>
      <PublicNav />
      <main className="hp-section" style={{ backgroundColor: tenantSite.theme.black, color: tenantSite.theme.white }}>
        <div className="hp-container">
          <div className="hp-center-head" style={{ marginBottom: '40px' }}>
            <span className="hp-eyebrow hp-eyebrow-gold">OFFICIAL MERCH</span>
            <h2>SUPPORT THE MISSION</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>Every purchase directly funds our youth programs in Seattle and King County. Wear your support with pride.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
            {products.map(product => (
              <div key={product.id} style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ height: '250px', backgroundColor: '#111', marginBottom: '20px', borderRadius: '4px', overflow: 'hidden' }}>
                  {/* Using the flyer reference image as a placeholder for products */}
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{product.name}</h3>
                <p style={{ color: tenantSite.theme.gold, fontWeight: 'bold', marginBottom: '20px' }}>{product.price}</p>
                <button className="hp-btn-outline" style={{ width: '100%' }}>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}