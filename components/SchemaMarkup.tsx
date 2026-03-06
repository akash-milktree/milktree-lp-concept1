import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SchemaMarkupProps {
  schema: Record<string, unknown> | Record<string, unknown>[];
}

export const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ schema }) => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  </Helmet>
);

// Homepage schemas: Organization + WebSite + FAQPage + Service
export const HomepageSchema: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://milktreeagency.com/#organization',
        name: 'Milktree Agency',
        url: 'https://milktreeagency.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://milktreeagency.com/logos/favicon.svg',
        },
        sameAs: [
          'https://www.instagram.com/milktreeagency/',
          'https://www.linkedin.com/company/milktreeagency/',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'levi@milktreeagency.com',
          contactType: 'sales',
        },
        description: 'We build brand identities that make businesses clear, trusted, and the obvious choice. 200+ brands built across 15+ industries.',
        knowsAbout: [
          'Brand Identity',
          'Brand Positioning',
          'Visual Identity',
          'Brand Guidelines',
          'Messaging Framework',
          'Creative Direction',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://milktreeagency.com/#website',
        url: 'https://milktreeagency.com',
        name: 'Milktree Agency',
        publisher: { '@id': 'https://milktreeagency.com/#organization' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How long does a brand build take?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most brand builds take 4 to 6 weeks from kickoff to final delivery. We work in focused sprints with clear milestones so you always know where we are and what is coming next.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do you work with businesses at any stage?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We work best with established businesses that have market traction but feel their brand does not yet reflect how good they actually are. We also work with founders launching for the first time who want to get it right from day one.',
            },
          },
          {
            '@type': 'Question',
            name: 'What do I actually get at the end?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You receive a complete brand system: positioning strategy, messaging framework, visual identity (logo, colour, typography), and a brand guidelines document your whole team can use.',
            },
          },
          {
            '@type': 'Question',
            name: 'How involved do I need to be?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We run a structured discovery session at the start, then present work for your feedback at defined review points. We do not need daily input, but we do need clear decisions when we ask for them.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can you help with just one part, like the logo or the messaging?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In most cases, no. Brand elements work because they are connected. A new logo without a positioning strategy looks different but does not perform differently. We build complete systems because that is what actually moves the needle.',
            },
          },
          {
            '@type': 'Question',
            name: 'What if I already have a brand and just need it refreshed?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We start with a brand audit regardless. Sometimes a refresh is all that is needed. Other times, the audit surfaces a positioning or messaging problem that a coat of paint will not fix. We will tell you honestly which one you have.',
            },
          },
          {
            '@type': 'Question',
            name: 'What happens after the brand is delivered?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We offer a 60-day post-launch support period where we answer questions and make small refinements as you roll out. If you need ongoing strategic support, our monthly retainer keeps Milktree in your corner as a brand partner.',
            },
          },
          {
            '@type': 'Question',
            name: 'How much does a brand build cost?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Our Brand Build projects typically start from around £1,000 and scale based on scope and complexity. Every project is scoped individually after an initial audit call. We offer fixed pricing with no hidden fees so you know exactly what you are paying before we start.',
            },
          },
          {
            '@type': 'Question',
            name: 'How is working with Milktree different from hiring a freelance designer?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A freelance designer typically delivers visual assets like a logo and colour palette. We build a complete brand system: positioning strategy, messaging framework, visual identity, and guidelines. The difference is that our clients see measurable business results like increased enquiries and higher-quality leads, not just a prettier logo.',
            },
          },
        ],
      },
      {
        '@type': 'Service',
        serviceType: 'Brand Identity Design',
        provider: { '@id': 'https://milktreeagency.com/#organization' },
        areaServed: {
          '@type': 'Country',
          name: 'United Kingdom',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Brand Identity Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Brand Build',
                description: 'One-off brand identity project including positioning, messaging, visual identity, guidelines, and creative direction with 60-day post-launch support.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Brand Partner',
                description: 'Monthly retainer for ongoing brand strategy, creative direction, campaign support, and quarterly brand performance review.',
              },
            },
          ],
        },
      },
    ],
  };

  return <SchemaMarkup schema={schema} />;
};

// Case study page schema
interface CaseStudySchemaProps {
  title: string;
  headline: string;
  description: string;
  slug: string;
  coverImage: string;
  tags: string[];
}

export const CaseStudySchema: React.FC<CaseStudySchemaProps> = ({
  title, headline, description, slug, coverImage, tags,
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: `${title}: ${headline}`,
        description,
        image: `https://milktreeagency.com${coverImage}`,
        author: { '@id': 'https://milktreeagency.com/#organization' },
        publisher: { '@id': 'https://milktreeagency.com/#organization' },
        mainEntityOfPage: `https://milktreeagency.com/work/${slug}`,
        keywords: tags.join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://milktreeagency.com' },
          { '@type': 'ListItem', position: 2, name: 'Work', item: 'https://milktreeagency.com/work' },
          { '@type': 'ListItem', position: 3, name: title },
        ],
      },
    ],
  };

  return <SchemaMarkup schema={schema} />;
};
