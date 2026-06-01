"use client";

import dynamic from 'next/dynamic';
import { Header } from "@/components/Header";
import { Intro } from "@/components/IntroPage";

const AboutMePage = dynamic(() => import('@/components/AboutMe').then(mod => mod.AboutMePage));
const Timeline = dynamic(() => import('@/components/Timeline').then(mod => mod.Timeline));
const ProjectShowcase = dynamic(() => import('@/components/projectShowcase').then(mod => mod.ProjectShowcase));
const CreativeEngineering = dynamic(() => import('@/components/CreativeEngineering').then(mod => mod.CreativeEngineering));
const ContactList = dynamic(() => import('@/components/ContactList').then(mod => mod.ContactList));

export default function App() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <Intro />
      <ProjectShowcase />
      <CreativeEngineering />
      <AboutMePage />
      <Timeline />
      <ContactList />
    </main>
  );
}
