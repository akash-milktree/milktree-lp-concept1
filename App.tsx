import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/ui/Navbar';
import { Hero } from './sections/Hero';
import { Problem } from './sections/Problem';
import { WhatWeDo } from './sections/WhatWeDo';
import { WhyMilktree } from './sections/WhyMilktree';
import { Results } from './sections/Results';
import { Pricing } from './sections/Pricing';
import { TrustedBy } from './sections/TrustedBy';
import { FAQ } from './sections/FAQ';
import { FinalCTA } from './sections/FinalCTA';
import { Footer } from './sections/Footer';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { CaseStudyDetailPage } from './pages/CaseStudyDetailPage';

const HomePage: React.FC = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <Problem />
      <WhatWeDo />
      <WhyMilktree />
      <Results />
      <Pricing />
      <TrustedBy />
      <FAQ />
      <FinalCTA />
    </main>
    <Footer />
  </>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<CaseStudiesPage />} />
        <Route path="/work/:slug" element={<CaseStudyDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
