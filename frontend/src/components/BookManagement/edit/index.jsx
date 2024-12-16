import axios from "axios";
import "./index.css";
import { useGlobalContext } from "../../../context";
import { useState } from "react";

const EditBook = () => {
  const { toggleEditButton, bookForEdit, fetchBooks } = useGlobalContext();
  const book = bookForEdit;
  const bookId = book.id;
  const authorId = book.authorId;
  const genreId = book.genreId;

  // Managing form data with a single useState
  const [formData, setFormData] = useState({
    title: book.title,
    authorName: book.authorName,
    coverUrl: book.cover,
    description: book.description,
    genreType: book.genreName,
    pages: book.Pages,
    publishedDate: book.first_publish_year,
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const getBack = () => {
    toggleEditButton(false);
  };

  const getSubmitBook = async (e) => {
    e.preventDefault();

    const newBook = {
      BookID: bookId,
      AuthorID: authorId,
      GenreID: genreId,
      AuthorName: formData.authorName,
      Title: formData.title,
      GenreName: formData.genreType,
      BookCoverDescription: formData.description,
      Pages: formData.pages,
      BookCoverURL: formData.coverUrl,
      PublishedDate: formData.publishedDate,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/books/${bookId}`,
        newBook,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.message === "Book updated successfully") {
        fetchBooks();
        getBack();
      } else {
        setErrorMsg(response.data.message);
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div>
      <div className="book-add-popup">
        <div className="book-add-form">
          <h2 className="text-black">Edit Book</h2>
          <form onSubmit={getSubmitBook}>
            <label>
              Book Name:
              <input
                type="text"
                placeholder="Enter book Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Author Name:
              <input
                type="text"
                placeholder="Enter Author Name"
                name="authorName"
                value={formData.authorName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={formData.description}
                placeholder="Enter Description"
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Cover URL:
              <input
                type="text"
                name="coverUrl"
                value={formData.coverUrl}
                placeholder="Enter Image URL"
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Genre Type:
              <input
                type="text"
                name="genreType"
                value={formData.genreType}
                placeholder="Enter Genre Type"
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Pages:
              <input
                type="number"
                name="pages"
                value={formData.pages}
                placeholder="Enter Pages"
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Published Date:
              <input
                type="text"
                name="publishedDate"
                value={formData.publishedDate}
                placeholder="Enter Published Date"
                onChange={handleChange}
                required
              />
            </label>
            <center>
              <p id="error-msg">{errorMsg}</p>
            </center>
            <div className="button-container">
              <button type="submit">Submit</button>
              <button type="button" onClick={getBack}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
