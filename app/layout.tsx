import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Sidebar from "@/components/navigation/Sidebar";

export const metadata: Metadata = {
  title: "Wine Shop Admin",
  description: "Admin for Wine Shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="flex h-full">
          {}
          <Sidebar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
