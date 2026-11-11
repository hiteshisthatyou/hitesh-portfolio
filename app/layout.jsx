import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://hiteshv.in"),
  title: "Hitesh Vishwakarma | Fintech Product Operations",
  description: "Portfolio of Hitesh Vishwakarma: fintech product operations, payments, fixed income, analytics, workflow automation and business execution.",
  applicationName: "Hitesh Vishwakarma Portfolio",
  keywords: ["Hitesh Vishwakarma", "Product Operations", "Fintech", "Business Operations", "Payments", "Fixed Income", "SQL", "Automation"],
  openGraph: { title: "Hitesh Vishwakarma | Fintech Product Operations", description: "Turning complex fintech operations into scalable product systems.", url: "https://hiteshv.in", siteName: "Hitesh Vishwakarma", type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image", title: "Hitesh Vishwakarma | Fintech Product Operations", description: "Turning complex fintech operations into scalable product systems." },
  alternates: { canonical: "https://hiteshv.in" }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
