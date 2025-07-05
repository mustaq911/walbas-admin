import type { Metadata } from "next";
import { Lexend} from "next/font/google";
import "./globals.css";
import "../styles/full-calendar.css"
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ['latin'],    
  display: 'swap',
});


export const metadata: Metadata = {
  title: "Walbase Admin",
  description: "Auction Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body
          className={`${lexend.variable} antialiased font-[family-name:var(--font-lexend)]`}
        >
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </body>
      </html>
    </ReactQueryProvider>
  );
}
