import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = {
 title: 'Hitesh Vishwakarma | Product, Business & Technology',
 description: 'Product & Business Operations | Product Strategy | Analytics. I connect product strategy, business operations and technology.',
 metadataBase: new URL('https://hiteshv.in'),
 openGraph: { title: 'Hitesh Vishwakarma | Product, Business & Technology', description: 'I connect product strategy, business operations and technology.', url: 'https://hiteshv.in', siteName: 'Hitesh Vishwakarma', type: 'website', images: ['/social-preview.svg'] },
 twitter: { card: 'summary_large_image', title: 'Hitesh Vishwakarma | Product, Business & Technology', description: 'Product & Business Operations | Product Strategy | Analytics.' },
};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
