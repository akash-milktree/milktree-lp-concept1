import React from 'react';
import { Navbar } from './components/ui/Navbar';
import { Hero } from './sections/Hero';
import { Problem } from './sections/Problem';
import { WhatWeDo } from './sections/WhatWeDo';
import { HowItWorks } from './sections/HowItWorks';
import { WhyMilktree } from './sections/WhyMilktree';
import { Results } from './sections/Results';
import { Pricing } from './sections/Pricing';
import { TrustedBy } from './sections/TrustedBy';
import { FAQ } from './sections/FAQ';
import { FinalCTA } from './sections/FinalCTA';
import { Footer } from './sections/Footer';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <WhatWeDo />
        {/* <HowItWorks /> */}
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
};

export default App;
