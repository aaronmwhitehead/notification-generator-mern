import React from 'react';
import { MdCopyAll } from 'react-icons/md';
import "../styles/css/App.css";
import { GrFormClose } from 'react-icons/gr'

const ShareModal = () => {
  const copyShareLink = () => {
    var value = document.querySelector('.share-link').value;
    navigator.clipboard.writeText(value);
    
    var copyConfirm = document.querySelector('.copy-confirm');
    copyConfirm.style.display = 'flex';

    setTimeout(() => {
      copyConfirm.style.display = 'none';
    }, 1500) 
  }
  return (
    <div className='container-share' >
      <div className='share-modal'>
        <div className='modal-header'>
          <h4>Share the template</h4>
          <GrFormClose className='close-modal'/>
        </div>
        <div className='share-input'>
          <input className='input share-link' readOnly type='text' value={window.location}></input>
          <MdCopyAll onClick={copyShareLink} className='copy' size={24}/>
        </div>
        <span className='copy-confirm' style={{display: 'none'}}>Link copied!</span>
      </div>
    </div>
  );
};

export default ShareModal;
