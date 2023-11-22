import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import loadingEarthImage from '../../assets/images/loadingEarth.svg';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url =
          'https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json';
        const response = await fetch(url);
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalItems = articles ? articles.length : 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = articles && articles.slice(indexOfFirstItem, indexOfLastItem);

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
    scrollToTop();
  };

  const nextPage = () => {
    const totalPages = Math.ceil((articles && articles.length) / itemsPerPage);
    setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1));
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='container py-8'>
      {loading && (
        <div className='w-full h-[80vh] flex items-center justify-center'>
          <img src={loadingEarthImage} alt='Loading Earth' />
        </div>
      )}
      {totalItems === 0 && !loading && (
        <div className='w-full h-[80vh] flex items-center justify-center'>
          <p className='text-lg text-[#696969]'>No articles to display.</p>
        </div>
      )}
      {totalItems > 0 && (
        <div>
          <h1 className='text-center text-4xl font-bold py-10 mb-10'>Top Headlines About Technology</h1>
          <div className='grid grid-cols-4 gap-4'>
            {currentItems && currentItems.map((element) => (
              <NewsItem
                key={element.url}
                imgUrl={element.urlToImage}
                title={element.title?.length > 45 ? element.title.slice(0, 45) + '...' : element.title}
                description={element.description?.length > 100 ? element.description.slice(0, 100) + '...' : element.description}
              />
            ))}
          </div>

          <div className='flex justify-between py-10'>
            <button
              className={`min-w-[120px] bg-[#EE4736] hover:bg-[#CB3C2E] text-white text-base font-semibold px-3 py-2 rounded duration-300 ${currentPage === 1 ? 'cursor-not-allowed opacity-70' : ''}`}
              onClick={prevPage}
            >
              &larr; Previous
            </button>
            <button
              className={`min-w-[120px] bg-[#EE4736] hover:bg-[#CB3C2E] text-white text-base font-semibold px-3 py-2 rounded duration-300 ${currentPage === totalPages ? 'cursor-not-allowed opacity-70' : ''}`}
              onClick={nextPage}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
