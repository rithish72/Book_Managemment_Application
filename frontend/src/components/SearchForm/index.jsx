import React, { useRef, useEffect, useState } from 'react';
import { FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import "./index.css";

const SearchForm = () => {
  const { setSearchTerm, setResultTitle } = useGlobalContext();
  const searchText = useRef('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    searchText.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempSearchTerm = searchText.current.value.trim();
    if ((tempSearchTerm.replace(/[^\w\s]/gi, "")).length === 0) {
      setSearchTerm("");
      setResultTitle("Please Enter Something ...");
    } else {
      setSearchTerm(searchQuery);
    }
    navigate("/book");
  };

  const handleClear = () => {
    setSearchQuery('');
    setSearchTerm('');
    setResultTitle('Please Enter Something ...');
    searchText.current.focus();
  };

  return (
    <div className='search-form'>
      <div className='container'>
        <div className='search-form-content'>
          <form className='search-form' onSubmit={handleSubmit}>
            <div className='search-form-elem'>
              <input
                type="text"
                className='form-control'
                placeholder='Search for books ...'
                ref={searchText}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search books"
              />
              <button type="submit" aria-label="Search">
                <FaSearch className='text-purple' size={32} />
              </button>
              {searchQuery && (
                <button type="button" className="clear-btn" onClick={handleClear} aria-label="Clear search">
                  <FaTimes size={24} />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
