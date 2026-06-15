"use client";

import { usePathname } from "next/navigation";
import { Header } from "./landing/Header";
import { Footer } from "./landing/Footer";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname === "/studio";

  return (
    <>
      {!isStudio && <Header />}
      {children}
      {!isStudio && <Footer />}
    </>
  );
}
