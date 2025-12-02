'use client';

import React from 'react';
import { Box, GlobalStyles } from '@mui/material';
import { HeroSection, FeatureSection } from '@/components/home';
import { featureSections } from '@/data/homepage';
import { animationStyles } from '@/utils/animations';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const { t } = useTranslation('home');

  return (
    <Box sx={{ position: 'relative' }}>
      <GlobalStyles styles={animationStyles} />
      <HeroSection />
      {featureSections.map((section, index) => {
        const benefitKeys = Object.keys(
          t(`features.${section.id}.benefits`, { returnObjects: true }) as object
        );

        const previewTags = t(`features.${section.id}.previewTags`, {
          returnObjects: true,
        });

        return (
          <FeatureSection
            key={section.id}
            section={{
              ...section,
              badge: t(`features.${section.id}.badge`),
              title: t(`features.${section.id}.title`),
              description: t(`features.${section.id}.description`),
              previewDescription: t(`features.${section.id}.previewDescription`),
              benefits: section.benefits.map((benefit, i) => ({
                ...benefit,
                title: t(`features.${section.id}.benefits.${benefitKeys[i]}.title`),
                desc: t(`features.${section.id}.benefits.${benefitKeys[i]}.desc`),
              })),
              previewTags: Array.isArray(previewTags) ? previewTags : section.previewTags,
            }}
            index={index}
          />
        );
      })}
    </Box>
  );
}
