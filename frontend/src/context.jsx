import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [books, setBooks] = useState([]);
    const [upperPagesRange, setUpperPagesRange] = useState(15);
    const [lowerPagesRange, setLowerPagesRange] = useState(0);
    const [renderedBooks, setRenderedBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [resultTitle, setResultTitle] = useState("Books");
    const [isAddButtonClicked, setIsAddButtonClicked] = useState(false);
    const [showEditCard, setShowEditCard] = useState(false);
    const [bookForEdit, setBookForEdit] = useState({});
    const [shownDeleteForm, setShownDeleteForm] = useState(false);
    const URL = 'http://localhost:5000/books';

    const getBookForEdit = (value) => {
        setBookForEdit(value);
    };

    const getDeleteBookForm = (value) => {
        setShownDeleteForm(value);
    };

    const toggleEditButton = (value) => {
        setShowEditCard(value);
    };

    const setPages = (value) => {
        const totalPages = Math.ceil(books.length / 15);
        if (value) {
            if (currentPage < totalPages) {
                setCurrentPage((prev) => prev + 1);
                setLowerPagesRange((prev) => prev + 15);
                setUpperPagesRange((prev) => prev + 15);
            }
        } else {
            if (currentPage > 1) {
                setCurrentPage((prev) => prev - 1);
                setLowerPagesRange((prev) => prev - 15);
                setUpperPagesRange((prev) => prev - 15);
            }
        }
    };

    const toggleAddBook = (value) => {
        setIsAddButtonClicked(value);
    };

    const fetchBooks = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(searchTerm ? `${URL}?searchTerm=${searchTerm}` : URL);
            const data = await response.json();

            if (data) {
                const newBooks = data.map((bookSingle) => {
                    const { BookID, AuthorID, GenreID, BookCoverDescription, BookCoverURL, Title, PublishedDate, Pages, AuthorName, GenreName } = bookSingle;

                    return {
                        id: BookID,
                        authorId: AuthorID,
                        genreId: GenreID,
                        description: BookCoverDescription,
                        cover: BookCoverURL,
                        Pages: Pages,
                        first_publish_year: PublishedDate,
                        title: Title,
                        authorName: AuthorName,
                        genreName: GenreName
                    };
                });

                setBooks(newBooks);
                setResultTitle(newBooks.length > 1 ? "Your Search Result" : "No Search Result Found!");

                // Update rendered books for pagination
                setRenderedBooks(newBooks.slice(lowerPagesRange, upperPagesRange + 1));
            } else {
                setBooks([]);
                setResultTitle("No Search Result Found!");
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }, [searchTerm, lowerPagesRange, upperPagesRange]);

    // Fetch books when search term changes
    useEffect(() => {
        fetchBooks();
    }, [searchTerm, fetchBooks]);

    // Update rendered books whenever books or pagination range changes
    useEffect(() => {
        const booksForRender = books.slice(lowerPagesRange, upperPagesRange + 1);
        setRenderedBooks(booksForRender);
    }, [books, upperPagesRange, lowerPagesRange]);

    return (
        <AppContext.Provider value={{
            loading,
            books,
            setSearchTerm,
            resultTitle,
            setResultTitle,
            isAddButtonClicked,
            toggleAddBook,
            renderedBooks,
            setPages,
            currentPage,
            showEditCard,
            toggleEditButton,
            getBookForEdit,
            bookForEdit,
            fetchBooks,
            shownDeleteForm,
            getDeleteBookForm
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
