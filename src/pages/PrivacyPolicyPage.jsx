import React from "react";
import Navbar from "../components/Navbar";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-10 leading-relaxed">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="mb-6">
          <strong>Last updated:</strong> 1/27/25
        </p>

        <p className="mb-10">
          nbashotcharts.net (“we,” “our,” or “the website”) is a free
          informational website that allows users to search for NBA players and
          view generated shot charts. We respect your privacy and are committed
          to keeping data collection to a minimum.
        </p>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            We do <strong>not</strong> collect personal information such as
            names, email addresses, or account details. Users do not create
            accounts or submit personal data to use this website.
          </p>
          <p className="mb-4">
            Like most websites, certain information is collected automatically
            when you visit the site. This may include:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device and operating system</li>
            <li>Pages visited and request timestamps</li>
          </ul>
          <p>
            This information is collected automatically by our hosting provider,
            <strong> Vercel</strong>, as part of standard server logs and
            analytics.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">2. How Information Is Used</h2>
          <p className="mb-4">
            Automatically collected information is used only to:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Serve and maintain the website</li>
            <li>Monitor performance and reliability</li>
            <li>Detect and prevent abuse or technical issues</li>
          </ul>
          <p>We do not use this information to personally identify users.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">3. Cookies</h2>
          <p className="mb-4">
            nbashotcharts.net does not set cookies directly. However,
            <strong> Vercel may use cookies or similar technologies</strong> as
            part of its infrastructure, analytics, or security features.
          </p>
          <p>
            You can control or disable cookies through your browser settings.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">4. Third-Party Services</h2>
          <p className="mb-4">
            This website is hosted on <strong>Vercel</strong>. Vercel may
            collect and process data in accordance with its own Privacy Policy:
          </p>
          <p className="mb-4">
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              Vercel Privacy Policy
            </a>
          </p>
          <p>
            We do not control how Vercel collects or processes data, but we only
            use their services to host and deliver this website.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">5. Data Sharing</h2>
          <p className="mb-4">
            We do not sell, trade, or share personal information with third
            parties.
          </p>
          <p>
            Information may be disclosed only if required by law or to protect
            the security and integrity of the website.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">6. Data Security</h2>
          <p>
            We rely on Vercel’s security infrastructure and take reasonable
            steps to protect the website. While we strive to use commercially
            acceptable means to protect information, no method of transmission
            over the internet is completely secure.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">7. Children’s Privacy</h2>
          <p>
            This website is not intended for children under the age of 13, and
            we do not knowingly collect personal information from children.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">9. Contact</h2>
          <p className="mb-2">
            If you have questions about this Privacy Policy, you may contact us
            at:
          </p>
          <p>
            <strong>Email:</strong> contact@nbashotcharts.net
          </p>
        </section>
      </main>
    </>
  );
}
