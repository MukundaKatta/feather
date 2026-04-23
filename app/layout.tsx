import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Feather — The CRM built for a team of one.",
  description:
    "Freelancers, consultants, solo founders. Track clients, deals, and follow-ups without Salesforce-level pain.",
  openGraph: {
    title: "Feather — The CRM built for a team of one.",
    description:
      "Freelancers, consultants, solo founders. Track clients, deals, and follow-ups without Salesforce-level pain.",
    images: [
      {
        url: "https://waitlist-api-sigma.vercel.app/api/og?title=Feather&accent=slate&category=Productivity",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://waitlist-api-sigma.vercel.app/api/og?title=Feather&accent=slate&category=Productivity",
    ],
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2032%2032'%3E%3Ccircle%20cx%3D'16'%20cy%3D'16'%20r%3D'14'%20fill%3D'%2364748b'%2F%3E%3C%2Fsvg%3E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-neutral-900 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
