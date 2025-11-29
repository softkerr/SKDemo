'use client';

import React from 'react';
import { Box, GlobalStyles } from '@mui/material';
import { HeroSection, FeatureSection, TechStackSection, CTASection } from '@/components/home';
import { featureSections } from '@/data/homepage';
import { animationStyles } from '@/utils/animations';

export default function HomePage() {
  return (
    <Box>
      <GlobalStyles styles={animationStyles} />

      <HeroSection />

      {/* Feature Sections */}
      {featureSections.map((section, index) => (
        <FeatureSection key={section.id} section={section} index={index} />
      ))}

      <TechStackSection />

      <CTASection />
    </Box>
  );
}
