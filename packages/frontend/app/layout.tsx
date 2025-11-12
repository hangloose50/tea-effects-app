import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tea Effects - AI-Powered Tea Recommendations',
  description: 'Get personalized tea recommendations based on your desired mental and physical effects',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
