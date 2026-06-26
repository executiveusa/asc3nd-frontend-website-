import './globals.css';

export const metadata = {
  title: 'Asc3nd Collective | Seattle Youth Development Nonprofit',
  description: 'Asc3nd Collective empowers Seattle youth through mentorship, education support, leadership development, community engagement, and life skills wellness.',
  metadataBase: new URL(process.env.PUBLIC_SITE_URL || 'http://localhost:3000')
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
