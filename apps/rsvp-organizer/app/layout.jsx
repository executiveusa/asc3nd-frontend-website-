import './globals.css';

export const metadata = {
  title: 'ASC3ND RSVP Organizer',
  description: 'Private event operations prototype for Community Cuts.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
