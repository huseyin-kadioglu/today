import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

/* Makale modülleri — yeni makale ekledikçe buraya ekle */
import article10Kasim from "./articles/10-kasim.js";

const ARTICLES = {
  "10-kasim": article10Kasim,
};

export const ALL_ARTICLES = Object.values(ARTICLES);

export default function ArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = ARTICLES[slug];

  useEffect(() => {
    if (!article) return;
    document.title = `${article.title} — ${article.subtitle} | Bugünün Tarihi`;
    document.dispatchEvent(new Event("app-rendered"));
  }, [article]);

  if (!article) {
    return (
      <div className="screen">
        <div className="terminal article-terminal">
          <Link to="/" className="qz-back">← ana sayfa</Link>
          <p className="no-data">Makale bulunamadı.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="terminal article-terminal">
        <div className="article-header">
          <Link to="/" className="qz-back">← ana sayfa</Link>
          <p className="article-meta">{formatDate(article.publishedAt)}</p>
          <h1 className="article-title">{article.title}</h1>
          <p className="article-subtitle">{article.subtitle}</p>
        </div>

        <div className="article-body">
          {article.sections.map((section, i) => (
            <Section key={i} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Section({ section }) {
  switch (section.type) {
    case "paragraph":
      return <p className="article-paragraph">{section.text}</p>;

    case "quote":
      return (
        <blockquote className="article-quote">
          <p>"{section.text}"</p>
          {section.attribution && (
            <cite>— {section.attribution}</cite>
          )}
        </blockquote>
      );

    case "fact":
      return (
        <div className="article-fact">
          <span className="fact-year">{section.year}</span>
          <span className="fact-text">{section.text}</span>
        </div>
      );

    case "divider":
      return <hr className="article-divider" />;

    case "image":
      return (
        <figure className="article-image">
          <img src={section.src} alt={section.alt || ""} loading="lazy" />
          {section.caption && <figcaption>{section.caption}</figcaption>}
        </figure>
      );

    default:
      return null;
  }
}

/* Makale listesi sayfası */
export function ArticleList() {
  useEffect(() => {
    document.title = "Makaleler | Bugünün Tarihi";
    document.dispatchEvent(new Event("app-rendered"));
  }, []);

  return (
    <div className="screen">
      <div className="terminal article-terminal">
        <div className="article-header">
          <Link to="/" className="qz-back">← ana sayfa</Link>
          <h1 className="article-title">Makaleler</h1>
          <p className="article-subtitle">Özel günler ve tarihi olaylar üzerine yazılar.</p>
        </div>

        <ul className="article-list">
          {ALL_ARTICLES.map((a) => (
            <li key={a.slug} className="article-list-item">
              <Link to={`/makale/${a.slug}`}>
                <span className="article-list-title">{a.title}</span>
                <span className="article-list-sub">{a.subtitle}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function formatDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  const months = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
  return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`;
}
