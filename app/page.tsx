import { Hero } from "@/components/sections/hero";
import { Facts } from "@/components/sections/facts";
import { About } from "@/components/sections/about";
import { Work } from "@/components/sections/work";
import { Stack } from "@/components/sections/stack";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";

/**
 * Seven sections, seven distinct layout families: split hero, facts strip,
 * portrait plus prose, featured case with a card grid, tile grid, rail
 * timeline, closing split.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Facts />
      <About />
      <Work />
      <Stack />
      <Experience />
      <Contact />
    </>
  );
}
