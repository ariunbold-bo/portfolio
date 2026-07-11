import { SiteBackground } from "./components/site-background";
import { NavRail } from "./components/nav-rail";
import { ScrollProgress } from "./components/scroll-progress";

import { Hero } from "./components/sections/hero";
import { About } from "./components/sections/about";
import { Stack } from "./components/sections/stack";
import { Journey } from "./components/sections/journey";
import { Hardware } from "./components/sections/hardware";
import { Projects } from "./components/sections/projects";
import { Beyond } from "./components/sections/beyond";
import { Contact } from "./components/sections/contact";

export default function LandingZone() {
  return (
    <>
      <SiteBackground />
      <ScrollProgress />
      <NavRail />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col px-4 pt-10 pb-28 sm:px-6 sm:pt-12 md:px-12 md:pt-24 lg:pl-32 lg:pr-12">
        <div className="flex w-full flex-col space-y-28 sm:space-y-36 md:space-y-56">
          <Hero />
          <About />
          <Stack />
          <Journey />
          <Hardware />
          <Projects />
          <Beyond />
          <Contact />
        </div>
      </main>
    </>
  );
}
