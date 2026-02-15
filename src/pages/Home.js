import { Link } from 'react-router-dom';
import './Home.css';

const tools = [
  {
    name: 'Age Calculator',
    description: 'Calculate your exact age in years, months, days, hours, and minutes.',
    path: '/age-calculator',
  },
  {
    name: 'Percentage Calculator',
    description: 'Calculate percentages, increases, decreases, and differences easily.',
    path: '/percentage-calculator',
  },
  {
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and estimate reading time.',
    path: '/word-counter',
  },
];

function Home() {
  return (
    <div>
      <h1>Free Online Calculators & Tools</h1>
      <p className="subtitle">Fast, free, and easy-to-use tools for everyday calculations.</p>

      <div className="tools-grid">
        {tools.map((tool) => (
          <Link to={tool.path} key={tool.path} className="tool-card">
            <h2>{tool.name}</h2>
            <p>{tool.description}</p>
            <span className="tool-link">Use tool &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
