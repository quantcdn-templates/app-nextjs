import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js SSR on Quant Cloud',
  description: 'A Next.js server-rendered application on Quant Cloud',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
