import { PublicNav } from '../../../components/PublicNav';

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
}