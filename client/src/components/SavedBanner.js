import React from 'react';
import "../styles/css/App.css";

const SavedBanner = (props) => {
  return (
    <div style={{display: 'none'}} className="banner-save" >
      <span className='banner-save-text'>The template is saving...</span>
      <div className='loader'></div>
    </div>
  );
};

export default SavedBanner;
