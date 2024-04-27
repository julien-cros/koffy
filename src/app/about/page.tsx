"use client";

import Center from "@/components/center";
import GetStarted from "@/components/howItWorks";

export default function HomePage() {
  return (
    <section className="w-full h-full ">
      <section id="section-0">
        <Center />
      </section>
      <section id="section-1">
        <GetStarted />
      </section>
    </section>
  );
}
