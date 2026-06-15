"use client";

import dynamic from "next/dynamic";

const StudioPage = dynamic(() => import("./StudioPage"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-bg-dark">
      <div className="text-text-secondary text-lg">Loading QR Studio...</div>
    </div>
  ),
});

export default function StudioRoute() {
  return <StudioPage />;
}
