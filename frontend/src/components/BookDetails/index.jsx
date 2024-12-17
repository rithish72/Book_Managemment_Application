import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from "../Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./index.css";
import { FaArrowLeft } from "react-icons/fa";
import { useGlobalContext } from '../../context';

const BookDetails = () => {
  const { id } = useParams();
  const { books } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  const fetchBookDetails = () => {
    const selectedBook = books.find((book) => book.id === parseInt(id));
    if (selectedBook) {
      setBook(selectedBook);
    } else {
      setBook(null);
    }
    setLoading(false); 
  };

  useEffect(() => {
    fetchBookDetails();
  }, [id, books]);

  if (loading) return <Loading />;

  if (!book) return <div className="no-book-found">No book found</div>;

  return (
    <section className="book-details">
      <div className="container">
        <button
          type="button"
          className="back-btn flex flex-c"
          onClick={() => navigate("/book")}
          aria-label="Go back to book list" 
        >
          <FaArrowLeft size={22} />
          <span className="fs-18 fw-6">Go Back</span>
        </button>

        <div className="book-details-content grid">
          <div className="book-details-img">
            <img 
              src={book.cover && book.cover !== "" ? book.cover : coverImg}
              alt={`Cover of the book titled "${book.title}"`}
            />
          </div>

          <div className="book-details-info">
            <div className="book-details-item title">
              <h2 className="fw-6 fs-24">{book.title}</h2>
            </div>
            <div className="book-details-item description">
              <strong className="text-capitalize fw-7">Description: </strong>
              <p>{book.description}</p>
            </div>
            <div className="book-details-item author fs-15">
              <strong className="text-capitalize fw-7">Author: </strong>
              <span>{book.authorName}</span>
            </div>
            <div className="book-details-item genre fs-15">
              <strong className="text-capitalize fw-7">Genre: </strong>
              <span>{book.genreName}</span>
            </div>
            <div className="book-details-item pages fs-15">
              <strong className="text-capitalize fw-7">Total Pages: </strong>
              <span>{book.Pages}</span>
            </div>
            <div className="book-details-item publish-year fs-15">
              <strong className="text-capitalize fw-7">First Published Year: </strong>
              <span>{book.first_publish_year}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
