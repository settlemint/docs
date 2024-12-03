import "@fontsource/figtree";
import "@fontsource/figtree/300.css";
import "@fontsource/figtree/400.css";
import "@fontsource/figtree/700.css";
import "@fontsource/figtree/900.css";
import aikidoIcon from "../static/img/about-settlemint/aikido-icon.png";
import platformImage from "../static/img/about-settlemint/platformModelBlue.png";
import platformScreenshot from "../static/img/about-settlemint/platformScreenshot.webp";
import supportIcon from "../static/img/about-settlemint/support-icon.png";
import styles from "./styles.module.css";

function context() {
  const { siteConfig } = context;
  const { themeConfig } = siteConfig;
  const { hotjar } = themeConfig || {};

  if (!hotjar) {
    throw new Error(
      `Create a 'hotjar' object containing a 'siteId' property in 'themeConfig'.`
    );
  }

  const { siteId } = hotjar;

  if (!siteId) {
    throw new Error(
      "Error in `themeConfig`. `hotjar` object found but `siteId` prop is missing."
    );
  }

  return {
    name: "docusaurus-plugin-hotjar",

    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "script",
            innerHTML: `
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:2683117,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          },
        ],
      };
    },
  };
}

function Navigation() {
  return (
    <main id="main-content">
      <div className={styles.container}>
        <div className={styles.twoColumn}>
          <div className={styles.twoColumnImage}>
            <div>
              <img src={platformImage} alt="SettleMint Platform" />
            </div>
          </div>
          <div className={styles.twoColumnText}>
            <h2>
              Build on
              <br />
              The SettleMint Platform
            </h2>
            <p>
              The SettleMint platform solves the problem of the <br />{" "}
              fragmented blockchain tooling ecosystem.
            </p>
            <p>
              {" "}
              It offers a unified developer experience for building blockchain
              applications <br />
              through a combination of familiar and custom tools.{" "}
            </p>
            <p>
              You can host the platform on a managed cloud, your own cloud, or
              on-premises <br /> to meet your performance and security needs.
            </p>
            <p>
              Get started on your blockchain transformation by building your
              first application:
            </p>
            <a href="https://console.settlemint.com/documentation/docs/launch-platform/managed-cloud-deployment/quickstart/">
              <button className={styles.secondaryButton}>
                Build a "Hello World" Application
              </button>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.twoColumn}>
          <div className={styles.twoColumnImage}>
            <img src={platformScreenshot} alt="SettleMint Platform" />
          </div>
          <div className={styles.twoColumnText}>
            <div>
              <h2>
                Explore
                <br />
                The SettleMint Platform
              </h2>
              <p> </p>
              <p>
                The SettleMint Platform enables the developers to execute
                faster. <br /> Directly from the platform you can deploy:
              </p>
              <ul>
                <li>
                  Blockchain Networks including Hyperledger Besu, <br /> Polygon
                  Edge and Ethereum
                </li>
                <li>
                  Custom smart contracts or templates <br /> like ERC-20 and
                  ERC-721
                </li>
                <li>Middleware including The Graph</li>
                <li>Storage solutions including IPFS and S3-compatible</li>
                <li>Integrations to existing business logic </li>
              </ul>
              <a href="https://console.settlemint.com/documentation/docs/about-settlemint/intro/">
                <button className={styles.secondaryButton}>
                  Platform Overview
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container} style={{ marginBottom: "80px", display: "flex", justifyContent: "center" }}>
        <div className="row justify-content-center align-items-center">
          <div className="col-12">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "40px",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <h2>We're here to help</h2>
                <p>
                  We are here to help you on your Blockchain Transformation
                  Journey
                  <br />
                  Our team of experts are here to answer your blockchain
                  questions both large and small!
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "40px",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <img
                  className={styles.icons}
                  src={supportIcon}
                  alt="SettleMint Platform"
                  style={{ width: "30%" }}
                />
                <h3 className={styles.contactSupport}>Contact Support</h3>
                <p>
                  Have a question or need assistance?
                  <br />
                  Email us at <a href="mailto:support@settlemint.com">support@settlemint.com</a>
                </p>
              </div>

              <div style={{ textAlign: "center" }}>
                <img
                  className={styles.icons}
                  src={aikidoIcon}
                  alt="SettleMint Platform"
                  style={{ width: "30%" }}
                />
                <h3 style={{ marginTop: "0px" }}>Aikido Security</h3>
                <p>Aikido Security Audit Report</p>
                <a
                  className={styles.btnLink}
                  href="https://app.aikido.dev/audit-report/external/ifiVHdPo7XlO1kmSjOoPtofe/request"
                >
                  Request Security Report
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Navigation;