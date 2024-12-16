import axios from "axios";
import "./index.css";
import { useGlobalContext } from "../../../context";

const DeleteBook = ({ book }) => {
  const { getDeleteBookForm, fetchBooks } = useGlobalContext();

  const deleteBook = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/books/${book.id}`,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.message === "Book deleted successfully") {
        getDeleteBookForm(false);
        fetchBooks();
      } else {
        console.error("Error while deleting the book");
      }
    } catch (error) {
      console.error("Error while deleting:", error.message);
    }
  };

  return (
    <div>
      <div className="book-delete-popup">
        <div className="book-delete-form">
          <h2 className="text-black">Are you sure you want to delete this book?</h2>
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
