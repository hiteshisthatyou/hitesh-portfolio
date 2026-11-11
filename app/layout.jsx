import "./globals.css";

export const metadata = {
  title: "Hitesh Vishwakarma | Product Operations",
  description: "A cinematic portfolio of Hitesh Vishwakarma, product operations professional in fintech."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
