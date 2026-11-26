import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
 title: 'Hitesh Vishwakarma | Product, Business & Technology',
 description: 'Product & Business Operations | Product Strategy | Analytics. I connect product strategy, business operations and technology.',
 metadataBase: new URL('https://hiteshv.in'),
 openGraph: { title: 'Hitesh Vishwakarma | Product, Business & Technology', description: 'I connect product strategy, business operations and technology.', url: 'https://hiteshv.in', siteName: 'Hitesh Vishwakarma', type: 'website', images: ['/social-preview.svg'] },
 twitter: { card: 'summary_large_image', title: 'Hitesh Vishwakarma | Product, Business & Technology', description: 'Product & Business Operations | Product Strategy | Analytics.' },
};

export default function RootLayout({children}:{children:React.ReactNode}) {
 return (
  <html lang="en">
   <body>
    {children}
    <Script id="google-tag-manager" strategy="afterInteractive">
     {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!=='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PDNXX2RC');`}
    </Script>
    <noscript>
     <iframe
      src="https://www.googletagmanager.com/ns.html?id=GTM-PDNXX2RC"
      height="0"
      width="0"
      style={{ display: 'none', visibility: 'hidden' }}
      title="Google Tag Manager"
     />
    </noscript>
   </body>
  </html>
 );
}
