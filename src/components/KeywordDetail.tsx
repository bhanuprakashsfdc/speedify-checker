import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const KeywordDetail: React.FC = () => {
  const { keyword } = useParams<{ keyword: string }>();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <section className="pt-32 pb-20 px-4 md:px-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-4">Keyword: {keyword}</h1>
          <p>Details about the keyword "{keyword}" will be displayed here.</p>
        </div>
      </section>
      <div className="flex-grow" />
      <Footer />
    </div>
  );
};

export default KeywordDetail;
