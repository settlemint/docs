import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Quickstart',
    image: '/img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        Get your blockchain network, nodes and smart contract sets up and running in no time.{' '}
        <a href={'/documentation/docs/launch-platform/managed-cloud-deployment/quickstart/'}>Follow our quickstart</a>
      </>
    ),
  },
  {
    title: 'Feature overview',
    image: '/img/undraw_docusaurus_tree.svg',
    description: (
      <>
        View a summary of SettleMint features and ready-to-use tools, and how to use them.{' '}
        <a href={'/documentation/docs/about-settlemint/intro/'}>Discover features</a>
      </>
    ),
  }
];

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
