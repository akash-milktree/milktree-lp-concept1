import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../sections/Footer';
import { Reveal } from '../components/animations/Reveal';

const sections = [
  {
    id: 'who-we-are',
    number: '01',
    title: 'Who we are',
    content: (
      <>
        <p>
          Milktree Agency is a digital marketing, branding and website agency. For the purpose of UK
          data protection law, Milktree Agency is responsible for how your personal information is
          collected and used.
        </p>
        <ul>
          <li>Email: <a href="mailto:hello@milktreeagency.com">hello@milktreeagency.com</a></li>
          <li>Website: <a href="https://www.milktreeagency.com" target="_blank" rel="noopener noreferrer">www.milktreeagency.com</a></li>
        </ul>
      </>
    ),
  },
  {
    id: 'what-we-collect',
    number: '02',
    title: 'What information we collect',
    content: (
      <>
        <p>We may collect personal information when you:</p>
        <ul>
          <li>Visit our website</li>
          <li>Submit a contact form</li>
          <li>Complete a lead form on Facebook, Instagram, LinkedIn, Google or another platform</li>
          <li>Book a call</li>
          <li>Request a proposal, quote, audit or consultation</li>
          <li>Download a resource</li>
          <li>Subscribe to updates</li>
          <li>Communicate with us by email, phone, message or social media</li>
          <li>Become a client or supplier</li>
        </ul>
        <p>The information we collect may include:</p>
        <ul>
          <li>Your name, email address, phone number</li>
          <li>Business name, job title or role</li>
          <li>Website URL and social media profiles or business pages</li>
          <li>Information about your business, website, brand, marketing activity or project</li>
          <li>Messages, enquiries and communication history</li>
          <li>Booking details and call notes</li>
          <li>Proposal, project and billing information</li>
          <li>Technical information such as IP address, browser type, device type, pages visited and how you interacted with our website or adverts</li>
        </ul>
        <p>We only collect information that is relevant to the reason you are engaging with us.</p>
      </>
    ),
  },
  {
    id: 'how-we-use',
    number: '03',
    title: 'How we use your information',
    content: (
      <>
        <p>We may use your personal information to:</p>
        <ul>
          <li>Respond to your enquiry</li>
          <li>Contact you about a service, audit, consultation, proposal or project</li>
          <li>Book and manage calls or meetings</li>
          <li>Review your website, brand, messaging or digital presence</li>
          <li>Prepare recommendations, proposals, reports or audit documents</li>
          <li>Provide our services to you</li>
          <li>Manage client relationships and project communication</li>
          <li>Send relevant follow-up emails or service information</li>
          <li>Improve our website, advertising, services and customer experience</li>
          <li>Measure the performance of our marketing campaigns</li>
          <li>Retarget website visitors or people who have interacted with our adverts</li>
          <li>Keep business, accounting and legal records</li>
          <li>Comply with legal or regulatory obligations</li>
        </ul>
        <p className="privacy-page__highlight">We do not sell your personal information.</p>
      </>
    ),
  },
  {
    id: 'lawful-basis',
    number: '04',
    title: 'Lawful basis for using your information',
    content: (
      <>
        <p>Under UK data protection law, we must have a lawful basis for using personal information. Depending on the situation, we may rely on:</p>
        <div className="privacy-page__basis-grid">
          <div className="privacy-page__basis-card">
            <h4>Consent</h4>
            <p>Where you have given permission, such as submitting a form, opting in to receive communication, or accepting certain cookies.</p>
          </div>
          <div className="privacy-page__basis-card">
            <h4>Legitimate interests</h4>
            <p>Where it is reasonable for us to use your information to respond to enquiries, follow up with potential clients, improve our services, manage our business, measure marketing performance, or promote relevant services.</p>
          </div>
          <div className="privacy-page__basis-card">
            <h4>Contract or pre-contract steps</h4>
            <p>Where we need to use your information to provide a quote, proposal, consultation, audit, service or project you have requested.</p>
          </div>
          <div className="privacy-page__basis-card">
            <h4>Legal obligation</h4>
            <p>Where we need to keep or share information to comply with legal, tax, accounting or regulatory requirements.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'lead-forms',
    number: '05',
    title: 'Lead forms, adverts and booking links',
    content: (
      <>
        <p>
          If you submit your details through an advert, lead form or booking link, we will use the
          information you provide to contact you about the relevant offer, enquiry, audit,
          consultation or service.
        </p>
        <p>This may include lead forms or adverts on platforms such as:</p>
        <ul>
          <li>Facebook</li>
          <li>Instagram</li>
          <li>LinkedIn</li>
          <li>Google</li>
          <li>TikTok</li>
          <li>Other advertising or marketing platforms</li>
        </ul>
        <p>
          These platforms may also process your information under their own privacy policies. Once
          we receive your information, we process it in line with this Privacy Policy.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    number: '06',
    title: 'Cookies, pixels and tracking',
    content: (
      <>
        <p>
          Our website may use cookies, pixels and similar technologies to understand how visitors
          use our website, improve our content, measure advertising performance and show relevant
          adverts.
        </p>
        <p>This may include tools such as:</p>
        <ul>
          <li>Google Analytics</li>
          <li>Google Ads tracking</li>
          <li>Meta Pixel</li>
          <li>LinkedIn Insight Tag</li>
          <li>CRM or form tracking tools</li>
          <li>Other analytics, advertising or performance tools</li>
        </ul>
        <p>
          These tools may collect information such as your IP address, device type, browser type,
          pages visited, form interactions and advert engagement. Where required, we will ask for
          your consent before using non-essential cookies or tracking technologies.
        </p>
      </>
    ),
  },
  {
    id: 'marketing',
    number: '07',
    title: 'Marketing communications',
    content: (
      <>
        <p>
          If you submit an enquiry, complete a lead form, book a call or become a client, we may
          contact you about your enquiry and relevant Milktree Agency services.
        </p>
        <p>
          You can ask us to stop sending marketing or follow-up communications at any time by
          emailing{' '}
          <a href="mailto:hello@milktreeagency.com">hello@milktreeagency.com</a>.
        </p>
        <p>We will not sell your details or share them with third parties for their own marketing.</p>
      </>
    ),
  },
  {
    id: 'sharing',
    number: '08',
    title: 'Who we share your information with',
    content: (
      <>
        <p>
          We may share personal information with trusted third-party service providers who help us
          operate our business and deliver our services. This may include:
        </p>
        <ul>
          <li>Website hosting providers</li>
          <li>CRM systems</li>
          <li>Form and lead capture tools</li>
          <li>Email marketing platforms</li>
          <li>Calendar booking tools</li>
          <li>Payment and accounting software</li>
          <li>Project management tools</li>
          <li>Analytics and advertising platforms</li>
          <li>Designers, developers, contractors or team members working on your project</li>
          <li>Professional advisers, such as accountants or legal advisers</li>
          <li>Regulators or authorities where required by law</li>
        </ul>
        <p>
          We only share information where necessary and expect third parties to handle it securely
          and lawfully.
        </p>
      </>
    ),
  },
  {
    id: 'international',
    number: '09',
    title: 'International transfers',
    content: (
      <p>
        Some of the tools and platforms we use may process or store data outside the UK. Where this
        happens, we take reasonable steps to ensure appropriate safeguards are in place, such as
        using providers with recognised data protection measures or contractual protections.
      </p>
    ),
  },
  {
    id: 'retention',
    number: '10',
    title: 'How long we keep your information',
    content: (
      <>
        <p>We only keep personal information for as long as necessary for the purpose it was collected. As a general guide:</p>
        <ul>
          <li>Enquiry and lead form data may be kept for up to 24 months</li>
          <li>Audit, proposal and consultation records may be kept for up to 24 months</li>
          <li>Client and project records may be kept for up to 6 years for legal, tax and business record purposes</li>
          <li>Marketing preferences may be kept until you unsubscribe or ask us to remove your details</li>
          <li>Website analytics data may be kept according to the settings of the relevant analytics platform</li>
        </ul>
        <p>When information is no longer needed, we will delete it, anonymise it or securely archive it.</p>
      </>
    ),
  },
  {
    id: 'security',
    number: '11',
    title: 'How we protect your information',
    content: (
      <p>
        We take reasonable steps to protect your personal information from loss, misuse,
        unauthorised access, disclosure, alteration or destruction. This includes using secure
        platforms where possible, limiting access to personal information, and only sharing
        information with people or providers who need it for legitimate business purposes.
      </p>
    ),
  },
  {
    id: 'your-rights',
    number: '12',
    title: 'Your rights',
    content: (
      <>
        <p>Under UK data protection law, you have rights over your personal information. These may include the right to:</p>
        <ul>
          <li>Access the personal information we hold about you</li>
          <li>Ask us to correct inaccurate or incomplete information</li>
          <li>Ask us to delete your information in certain circumstances</li>
          <li>Object to certain uses of your information</li>
          <li>Ask us to restrict how we use your information</li>
          <li>Withdraw consent where we rely on consent</li>
          <li>Ask for your information to be transferred where applicable</li>
          <li>Complain to the Information Commissioner's Office</li>
        </ul>
        <p>
          To exercise your rights, contact:{' '}
          <a href="mailto:hello@milktreeagency.com">hello@milktreeagency.com</a>
        </p>
      </>
    ),
  },
  {
    id: 'complaints',
    number: '13',
    title: 'Complaints',
    content: (
      <p>
        If you have a concern about how we use your personal information, please contact us first so
        we can try to resolve it. You also have the right to complain to the{' '}
        <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
          Information Commissioner's Office
        </a>
        , the UK regulator for data protection.
      </p>
    ),
  },
  {
    id: 'changes',
    number: '14',
    title: 'Changes to this Privacy Policy',
    content: (
      <p>
        We may update this Privacy Policy from time to time. The latest version will be published
        on our website with the updated date shown at the top of the page.
      </p>
    ),
  },
  {
    id: 'contact',
    number: '15',
    title: 'Contact us',
    content: (
      <>
        <p>If you have any questions about this Privacy Policy or how your personal information is used, contact:</p>
        <ul>
          <li><strong>Milktree Agency</strong></li>
          <li>Email: <a href="mailto:hello@milktreeagency.com">hello@milktreeagency.com</a></li>
          <li>Website: <a href="https://www.milktreeagency.com" target="_blank" rel="noopener noreferrer">www.milktreeagency.com</a></li>
        </ul>
      </>
    ),
  },
];

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Milktree Agency</title>
        <meta
          name="description"
          content="Milktree Agency's Privacy Policy — how we collect, use and protect your personal information."
        />
        <link rel="canonical" href="https://milktreeagency.com/privacy-policy" />
        <meta property="og:title" content="Privacy Policy | Milktree Agency" />
        <meta
          property="og:description"
          content="How Milktree Agency collects, uses and protects your personal information."
        />
        <meta property="og:url" content="https://milktreeagency.com/privacy-policy" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <Navbar />

      <main className="privacy-page">
        {/* ── Hero ── */}
        <section className="privacy-page__hero">
          <div className="privacy-page__container">
            <Reveal>
              <p className="privacy-page__label">Legal</p>
              <h1 className="privacy-page__heading">Privacy Policy</h1>
              <p className="privacy-page__meta">Last updated: 17 May 2026</p>
              <p className="privacy-page__intro">
                This Privacy Policy explains how Milktree Agency collects, uses, stores and protects
                personal information when you visit our website, submit a form, click on one of our
                adverts, book a call, contact us, or use our services. We are committed to handling
                your personal information responsibly, transparently and securely.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Table of contents ── */}
        <section className="privacy-page__toc-section">
          <div className="privacy-page__container">
            <Reveal>
              <nav className="privacy-page__toc" aria-label="Table of contents">
                <p className="privacy-page__toc-heading">Contents</p>
                <ol className="privacy-page__toc-list">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="privacy-page__toc-link">
                        <span className="privacy-page__toc-num">{s.number}</span>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </Reveal>
          </div>
        </section>

        {/* ── Content sections ── */}
        <section className="privacy-page__content">
          <div className="privacy-page__container">
            {sections.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.03}>
                <div id={s.id} className="privacy-page__section">
                  <div className="privacy-page__section-header">
                    <span className="privacy-page__section-num">{s.number}</span>
                    <h2 className="privacy-page__section-title">{s.title}</h2>
                  </div>
                  <div className="privacy-page__section-body">{s.content}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Contact CTA ── */}
        <section className="privacy-page__cta">
          <div className="privacy-page__container">
            <Reveal>
              <h2 className="privacy-page__cta-heading">Questions about your data?</h2>
              <p className="privacy-page__cta-sub">
                We're happy to help. Reach out any time.
              </p>
              <a href="mailto:hello@milktreeagency.com" className="privacy-page__cta-btn">
                hello@milktreeagency.com
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
