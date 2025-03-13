import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Helmet>
        <title>Polityka prywatności - SWT Labs</title>
        <meta name="description" content="Poznaj nasze zasady dotyczące prywatności i ochrony danych osobowych. Dowiedz się, jak SWT Labs przetwarza i chroni Twoje dane." />
        <meta property="og:title" content="Polityka Prywatności - SWT Labs" />
        <meta property="og:description" content="Szczegółowe informacje o zasadach przetwarzania danych osobowych przez SWT Labs zgodnie z RODO." />
        <meta property="og:image" content="https://swtlabs.pl/og-image.jpg" />
        <meta property="og:image" content="https://swtlabs.pl/@social-share-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://swtlabs.pl/privacy-policy" />
      </Helmet>
      
      <Header />
      
      <main className="flex-1 container mx-auto px-4 pt-32 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto bg-black/20 p-8 rounded-xl backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>
          
          <div className="space-y-8 text-neutral-300">
            {/* Last Updated Section */}
            <div className="text-sm text-neutral-400">
              Last Updated: {new Date().toLocaleDateString()}
            </div>

            {/* Introduction */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Introduction</h2>
              <p className="mb-4">
                At SWTLabs Int ("we," "our," or "us"), we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p>
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Personal Information</h3>
                  <p>We may collect personal information that you voluntarily provide to us when you:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Register on our website</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Request information or support</li>
                    <li>Participate in our services</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Automatically Collected Information</h3>
                  <p>When you visit our website, we automatically collect certain information about your device, including:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>IP address</li>
                    <li>Usage patterns and preferences</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Provide, operate, and maintain our website and services</li>
                <li>Improve and personalize your experience</li>
                <li>Understand and analyze usage trends</li>
                <li>Communicate with you about our services</li>
                <li>Prevent fraudulent activities and enhance security</li>
              </ul>
            </section>

            {/* Data Protection */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Data Protection</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information. However, please note that no method of transmission over the internet or electronic storage is 100% secure.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to our processing of your data</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            {/* Changes to Privacy Policy */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Changes to This Privacy Policy</h2>
              <p>
                We reserve the right to update this privacy policy at any time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-2 p-4 bg-white/5 rounded-lg">
                <p>SWTLabs Int</p>
                <p>Email: privacy@swtlabs.com</p>
                <p>Address: [Your Business Address]</p>
              </div>
            </section>

            {/* Cookie Policy Link */}
            <section className="border-t border-neutral-700 pt-8">
              <p className="text-sm">
                For more information about how we use cookies, please see our{' '}
                <a href="/cookie-policy" className="text-[#da7786] hover:text-white transition-colors">
                  Cookie Policy
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy; 