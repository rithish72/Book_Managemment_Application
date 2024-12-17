import React from 'react';
import { useGlobalContext } from '../../context';
import Book from './Book';
import Loading from '../Loader';
import EditBook from '../BookManagement/edit';
import './index.css';

const BookList = () => {
  const {
    renderedBooks,
    loading,
    resultTitle,
    currentPage,
    setPages,
    showEditCard,
    books,
  } = useGlobalContext();

  if (loading) return <Loading />;

  // Determine if Next and Previous should be enabled
  const totalPages = Math.ceil(books.length / 15);
  const disableNext = currentPage >= totalPages;
  const disablePrev = currentPage === 1;

  return (
    <section className="booklist">
      <div className="container">
        <div className="section-title">
          <h2>{resultTitle}</h2>
        </div>
        <div className="booklist-content grid">
          {renderedBooks.map((item) => (
            <Book key={item.id} {...item} />
          ))}
        </div>
      </div>
      <div className="pagination-card">
        <button
          className="pagination-button"
          onClick={() => setPages(false)}
          disabled={disablePrev}
        >
          Previous
        </button>
        <div>{currentPage}</div>
        <button
          className="pagination-button"
          onClick={() => setPages(true)}
          disabled={disableNext}
        >
          Next
        </button>
      </div>
      {showEditCard && <EditBook />}
    </section>
  );
};

export default BookList;
