import axios from "axios";
import "./index.css";
import { useGlobalContext } from "../../../context";
import { useState } from "react";

const DeleteBook = ({ book }) => {
  const { getDeleteBookForm, fetchBooks } = useGlobalContext();
  const [errorMsg, setErrorMsg] = useState(""); // State for handling errors

  const deleteBook = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/books/${book.id}`,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.message === "Book deleted successfully") {
        getDeleteBookForm(false); // Close the delete form
        fetchBooks(); // Refresh book list
      } else {
        setErrorMsg("Failed to delete the book."); // Set error message
      }
    } catch (error) {
      setErrorMsg("An error occurred while deleting the book."); // Handle error
      console.error("Error while deleting:", error.message);
    }
  };

  return (
    <div>
      <div className="book-delete-popup">
        <div className="book-delete-form">
          <h2>Are you sure you want to delete this book?</h2>
          {errorMsg && <p id="error-msg">{errorMsg}</p>} {/* Display error message */}
          <div className="button-container">
            <button type="submit" onClick={deleteBook}>
              Yes
            </button>
            <button type="button" onClick={() => getDeleteBookForm(false)}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
