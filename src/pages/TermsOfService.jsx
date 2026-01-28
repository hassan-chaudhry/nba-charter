import Navbar from "../components/Navbar";

export default function TermsOfService() {
  return (
    <>
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-10 leading-relaxed">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="mb-6">
          <strong>Last updated:</strong> 1/27/25
        </p>

        <p className="mb-10">
          nbashotcharts.net is a personal, non-commercial project created for
          educational and portfolio purposes. By accessing or using this
          website, you agree to these Terms of Service. If you do not agree,
          please do not use the website.
        </p>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">1. Use of the Website</h2>
          <p>
            This website provides NBA shot chart visualizations for
            informational and educational purposes only. The website is not
            intended for commercial use, and no guarantees are made regarding
            accuracy, completeness, or reliability of the information presented.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">2. Intellectual Property</h2>
          <p className="mb-4">
            This website includes a combination of original work and third-party
            resources. Original code, layout, and functionality were created as
            part of a personal project.
          </p>
          <p>
            Certain assets such as fonts, icons, graphics, and logos may be
            sourced from third parties and are used for demonstration and
            educational purposes only.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">3. NBA Disclaimer</h2>
          <p>
            NBA team names, player names, logos, and related trademarks are the
            property of their respective owners. This website is not affiliated
            with, endorsed by, or sponsored by the National Basketball
            Association or any NBA team.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">4. Disclaimer</h2>
          <p>
            This website is provided “as is” and “as available” with no
            warranties of any kind. Use of the website is at your own risk.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">5. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, the creator of
            nbashotcharts.net shall not be liable for any damages arising from
            the use of this website.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">6. Changes to These Terms</h2>
          <p>
            These Terms of Service may be updated at any time. Continued use of
            the website constitutes acceptance of the current terms.
          </p>
        </section>
      </main>
    </>
  );
}
