import React, { useState } from 'react';
import "../styles/css/App.css";
import { generateHTML, updateTemplate } from './dragAndDrop/utils';
import { BiPencil } from 'react-icons/bi'
import { useEffect } from 'react';


const Header = (props) => {
  const [value, setValue] = useState(
    {
      title: "New Notification Template (Click to Edit)"
    }
  )

  const handleSaveNew = (state) => {
    props.onSaveNew(state);
  }

  const openDropdown = (e) => {
    e.preventDefault();
    var dropdown = e.target.closest('.save-dropdown').querySelector('.dropdown-content');
    dropdown.style.display = dropdown.style.display === 'none' ? 'flex' : 'none';
  }

  const openShareDialog = (e) => {
    e.preventDefault();
    var shareModal = document.querySelector('.container-share');
    shareModal.style.display = 'flex';
  }

  const openGenerateDialog = (e, data) => {
    e.preventDefault()
    var generateModal = document.querySelector('.container-generate');
    generateModal.style.display = 'flex';

    generateHTML(data);
  }

  const confirmDelete = () => {
    var msg = 'This will remove all elements, resulting in a blank template.\nWould you like to continue?'
    if(window.confirm(msg)) {
      props.onDeleteTemplate()
    }
  }

  // const editTitle = () => {
  //   document.querySelector('.template-title').focus()
  // }

  const handleChange = (e) => {
    setValue({
      title: e.target.value
    })
  }

  return (
    <div className="page-header" >
      <span className="header-title">Learn@Cox Notification Template Generator</span>
      <div className="edit-title">
        {/* <BiPencil cursor="pointer" onClick={editTitle} size={14}/> */}
        <input onChange={(e) => handleChange(e)} className="template-title" defaultValue={value.title}></input>
      </div>
      <div className='button-block'>
        <div onClick={confirmDelete} className='button button-delete'>Clear Template</div>
        <div className="save-dropdown" onClick={(e) => openDropdown(e)}>
          <div className='button button-save'>
            <div className='save'>Save</div>
            <div className='dropdown-arrow'></div>
          </div>
          <div className="dropdown-content" style={{display: 'none'}}>
            <div className='dropdown-option option-new' onClick={() => handleSaveNew(props.state)} style={props.showUpdate ? {marginBottom: '4px'} : {marginBottom: '0'}}>Save As New Template</div>
            <div className='dropdown-option option-update' onClick={() => updateTemplate(props.state, false)} style={props.showUpdate ? {display: 'none'} : {display: 'flex'}}>Update Current Template</div>
          </div>
        </div>
        <div onClick={openShareDialog} className='button button-share' style={props.showUpdate ? {display: 'none'} : {display: 'flex'}}>Share Template</div>
        <div onClick={(e) => openGenerateDialog(e, props.state)} className='button button-generate'>Generate HTML</div>
      </div>
    </div>
  );
};

export default Header;
