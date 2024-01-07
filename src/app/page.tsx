import Banner from "@/components/Banner";
import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import Newest from "@/components/Newest";

export default function Home() {
  return (
    <main>
      <Hero />
      <Newest />
      <Banner />
      <Featured />
    </main>
  );
}
