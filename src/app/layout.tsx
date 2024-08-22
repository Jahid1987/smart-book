import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/ui/fonts";
import { dbConnect } from "@/db/dbConnect";


export const metadata: Metadata = {
  title: "Smart Book",
  description: "This is Smart Book Site",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await dbConnect()
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}  className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
