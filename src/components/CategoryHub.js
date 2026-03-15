import { Link } from 'react-router-dom';
import Seo from './Seo';
import '../pages/Home.css';

function CategoryHub({ title, description, intro, tools, faqs, children }) {
  return (
    <div>
      <Seo title={title} description={description} faqs={faqs} />
      <h1>{title}</h1>
      <p className="subtitle">{intro}</p>

      <div className="tools-grid">
        {tools.map((tool) => (
          <Link to={tool.path} key={tool.path} className="tool-card">
            <h3>{tool.name}</h3>
            <p>{tool.description}</p>
            <span className="tool-link">Use tool &rarr;</span>
          </Link>
        ))}
      </div>

      {children}
    </div>
  );
}

export default CategoryHub;
