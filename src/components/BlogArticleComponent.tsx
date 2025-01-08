export function ArticleCard({
  icon,
  title,
  description,
  articleLink
}: {
  icon?: string;
  title: string;
  description: string;
  articleLink: string;
}) {
  return (
    <a href={articleLink}>
      <div className="blog-article-container">
        <div className="blog-article-card">
          <div className="blog-article-card-header">
            <img src={icon} alt={title} />
            <h2>{title}</h2>
          </div>
          <div className="blog-article-card-body">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </a>
  );
}
