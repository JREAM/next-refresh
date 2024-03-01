import '@/app/ui/global.css';
import { inter } from '@/app/ui/shared/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'App for cool things.',
  metadataBase: new URL('https://notsureyet.com'),
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
