import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Navigation from '@site/theme';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.title}>{siteConfig.title}</div>
        <p className={styles.subtitle}>{siteConfig.tagline}</p>
        <a href="https://www.settlemint.com/request-a-demo" target="_blank" rel="noopener noreferrer">
          <button className={styles.mainButton}>Request a Demo</button>
        </a>
        <a
          href="https://console.settlemint.com/documentation/docs/about-settlemint/intro/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className={styles.secondaryButton}>View the Docs</button>
        </a>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="The Blockchain Transformation platform for developers to rapidly build blockchain applications."
    >
      <Head>
        <script
          data-jsd-embedded
          data-key="5d7a0f9b-1691-4f56-9da7-95e3526950fb"
          data-base-url="https://jsd-widget.atlassian.com"
          src="https://jsd-widget.atlassian.com/assets/embed.js"
        />
      </Head>
      <HomepageHeader />
      <main />
      <Navigation />
    </Layout>
  );
}
