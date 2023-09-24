import Center from "@/components/Center";
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <section className="">
      <section id="section-0">
        <Center />
      </section>
      <section id="section-1">
        <GetStarted />
      </section>
      <section id="section-2">
        <Footer />
      </section>
    </section>
  );
}
