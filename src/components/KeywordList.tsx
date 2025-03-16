import React from 'react';
import { Link } from 'react-router-dom';
import keywords from '@/data/keywords';

const KeywordList: React.FC = () => {
  return (
    <section id="keywords" className="py-16 px-4 md:px-6 bg-secondary/30">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Keywords</h2>
        <ul className="list-disc pl-5">
          {keywords.map((keyword, index) => (
            <li key={index} className="mb-2">
              <Link to={`/keyword/${encodeURIComponent(keyword)}`} className="text-blue-500 hover:underline">
                {keyword}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default KeywordList;
