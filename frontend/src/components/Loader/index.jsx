import React from 'react';
import LoaderImg from "../../images/loader.svg"; 
import "./index.css";

const Loader = () => {
  return (
    <div className='loader'>
      <img src={LoaderImg} alt="Loading, please wait" />
    </div>
  );
}

export default Loader;
