import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import loadingEarthImage from '../../assets/images/loadingEarth.svg';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [loadingPage, setLoadingPage] = useState(true);
  const itemsPerPage = 12;

  const fetchData = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 700));

      const url = `https://saurav.tech/NewsAPI/top-headlines/category/${selectedCategory}/in.json`;
      const response = await fetch(url);
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setLoadingPage(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory, currentPage]);

  useEffect(() => {
    setLoadingPage(true);
  }, []);

  const totalItems = articles.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = articles.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const changeCategory = (category) => {
    setLoadingPage(true);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const renderCategories = () => (
    <div className='flex justify-center mb-4'>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => changeCategory(category)}
          className={`text-base font-semibold px-3 py-2 rounded duration-300 mx-4 ${selectedCategory === category ? 'bg-[#EE4736] text-white hover:bg-[#CB3C2E]' : 'bg-gray-100 text-[#696969] hover:text-black hover:bg-gray-200'}`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );

  const renderNewsItems = () => (
    <>
      <h1 className='text-center text-4xl font-bold py-10'>
        Top Headlines About {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
      </h1>
      <div className='w-[80%] max-w-[400px] h-[1px] bg-gray-300 mx-auto mb-10'></div>

      <div className='grid grid-cols-4 gap-4'>
        {currentItems.map((element) => (
          <NewsItem
            key={element.url}
            imgUrl={element.urlToImage}
            title={element.title?.length > 45 ? element.title.slice(0, 45) + '...' : element.title}
            description={element.description?.length > 100 ? element.description.slice(0, 100) + '...' : element.description}
          />
        ))}
      </div>

      <div className='flex justify-center items-center py-10'>
        <button
          className={`min-w-[120px] bg-[#EE4736] hover:bg-[#CB3C2E] text-white text-base font-semibold px-3 py-2 rounded duration-300 ${currentPage === 1 ? 'cursor-not-allowed opacity-70' : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          &larr; Previous
        </button>

        <div className='flex space-x-2 mx-3'>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`text-base font-semibold px-3 py-2 rounded duration-300 ${currentPage === i + 1 ? 'bg-[#EE4736] text-white hover:bg-[#CB3C2E]' : 'bg-gray-100 text-[#696969] hover:text-black hover:bg-gray-200'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          className={`min-w-[120px] bg-[#EE4736] hover:bg-[#CB3C2E] text-white text-base font-semibold px-3 py-2 rounded duration-300 ${currentPage === totalPages ? 'cursor-not-allowed opacity-70' : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next &rarr;
        </button>
      </div>
      </>
  );

  const renderLoading = () => (
    <div className='w-full h-[80vh] flex items-center justify-center'>
      <img className='w-[100px] h-[100px] object-contain' src={loadingEarthImage} alt='Loading Earth' />
    </div>
  );

  const categories = ['general', 'technology', 'business', 'entertainment', 'health', 'science', 'sports'];

  return (
    <div className='container py-8'>
      {loadingPage && renderLoading()}
      {totalItems === 0 && !loadingPage && (
        <div className='w-full h-[80vh] flex items-center justify-center'>
          <p className='text-lg text-[#696969]'>No articles to display.</p>
        </div>
      )}
      {totalItems > 0 && !loadingPage && (
        <div>
          {renderCategories()}
          {renderNewsItems()}
        </div>
      )}
    </div>
  );
};

export default News;