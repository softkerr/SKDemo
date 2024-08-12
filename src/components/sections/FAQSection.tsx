'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ExpandMore } from '@mui/icons-material';

const faqs = [
  { key: 'question1' },
  { key: 'question2' },
  { key: 'question3' },
  { key: 'question4' },
  { key: 'question5' },
  { key: 'question6' },
];

export function FAQSection() {
  const { t } = useTranslation('home');
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | false>('question1');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      component="section"
      data-section="faq"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: theme.palette.mode === 'dark'
          ? 'background.paper'
          : 'background.default',
      }}
    >
      <Container maxWidth="md">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip
            label={t('faq.badge')}
            color="primary"
            variant="outlined"
            sx={{ mb: 2, fontWeight: 500 }}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
              fontWeight: 700,
              mb: 2,
            }}
          >
            {t('faq.title')}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
            }}
          >
            {t('faq.description')}
          </Typography>
        </Box>

        {/* FAQ Accordions */}
        <Box>
          {faqs.map(({ key }) => (
            <Accordion
              key={key}
              expanded={expanded === key}
              onChange={handleChange(key)}
              elevation={0}
              sx={{
                mb: 2,
                border: 1,
                borderColor: theme.palette.mode === 'dark'
                  ? 'grey.800'
                  : 'grey.200',
                borderRadius: '8px !important',
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  borderColor: 'primary.main',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  px: 3,
                  py: 2,
                  '& .MuiAccordionSummary-content': {
                    my: 1,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                  }}
                >
                  {t(`faq.${key}.question`)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  px: 3,
                  pb: 3,
                  pt: 0,
                }}
              >
                <Typography
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.7,
                    fontSize: '1rem',
                  }}
                >
                  {t(`faq.${key}.answer`)}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
