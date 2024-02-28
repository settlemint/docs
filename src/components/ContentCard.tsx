import clsx from 'clsx';
import { Children, PropsWithChildren, useState } from 'react';
import styles from './ContentCard.module.css';

export interface ContentCardProps {
  page: string;
  title: string;
  description: string;
  image?: string;
}

const ContentCard = (props: PropsWithChildren<ContentCardProps>) => {
  const [displayLong, setDisplayLong] = useState(false);

  return (
    <a href={props.page} className={styles.riContainer}>
      <div className={styles.riDescriptionShort}>
        <div className={styles.riIcon}>
          {props.image && <img src={props.image} alt={props.title} className={styles.riImage} />}

          <span className="fe fe-zap" />
        </div>
        <div className={styles.riDetail}>
          <div className={styles.riTitle}>{props.title}</div>
          <div className={styles.riDescription}>
            {props.description}
            {Children.count(props.children) > 0 && (
              <span
                className={clsx(styles.riMore, 'fe', 'fe-more-horizontal')}
                onClick={() => setDisplayLong(!displayLong)}
              />
            )}
          </div>
        </div>
      </div>
    </a>
  );
};

export default ContentCard;
