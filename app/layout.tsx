import type { Metadata } from "next";
import { Alfa_Slab_One, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import { getCurrentUser } from "@/lib/session";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const alfaSlab = Alfa_Slab_One({
  weight: "400",
  variable: "--font-slab",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ink-Board",
  description: "Die Pinnwand für gemeinsame Aktionen von Tattoo-Artists",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();

  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} ${alfaSlab.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav user={user} />
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
