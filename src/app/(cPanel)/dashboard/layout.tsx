import SideNav from "@/components/dashboard/sidenav";
export const experimental_ppr = true;

import type { Metadata } from "next";

import "../../globals.css";
import { inter } from "@/ui/fonts";


export const metadata: Metadata = {
  title: "Smart Book",
  description: "This is Smart Book Site",
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={`${inter.className} antialiased`}>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav/>
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
      </body>
    </html>
  );
}

