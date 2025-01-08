import React from 'react';
import { Hero } from '../components/home/Hero';
import { AstrologerIntro } from '../components/home/AstrologerIntro';
import { ExpertiseAreas } from '../components/home/ExpertiseAreas';
import { Services } from '../components/home/Services';
import { BlogList } from '../components/blog/BlogList';
import { Testimonials } from '../components/home/Testimonials';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AstrologerIntro />
      <ExpertiseAreas />
      <Services />
      <BlogList />
      <Testimonials />
    </>
  );
}