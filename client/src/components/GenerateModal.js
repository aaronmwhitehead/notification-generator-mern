import React from 'react';
import { MdCopyAll } from 'react-icons/md';
import "../styles/css/App.css";
import { GrFormClose } from 'react-icons/gr'

const GenerateModal = (props) => {
  const copyHTML = () => {
    var value = document.querySelector('.html-textarea').value;
    navigator.clipboard.writeText(value);
    
    var copyConfirm = document.querySelector('.copy-confirm-html');
    copyConfirm.style.display = 'flex';

    setTimeout(() => {
      copyConfirm.style.display = 'none';
    }, 1500) 
  }

  return (
    <div className='container-generate' >
      <div className='generate-modal'>
        <div className='modal-header'>
          <h4>Copy the Generated HTML</h4>
          <GrFormClose className='close-modal'/>
        </div>
        <div className='generate-input'>
          <textarea className='html-textarea' readOnly></textarea>
          <MdCopyAll onClick={copyHTML} className='copy' size={24}/>
        </div>
        <span className='copy-confirm-html' style={{display: 'none'}}>HTML copied!</span>
      </div>
    </div>
  );
};

export default GenerateModal;
