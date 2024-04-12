import type { Metadata } from "next";
import Sidebar from "@/components/sidebar/Sidebar";

export const metadata: Metadata = {
  title: "Nidu",
  description: "Organiza tus finanzas",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <main className="ml-[64px]">{children}</main>
    </>
  );
}
