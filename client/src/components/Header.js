import React from 'react';
import "../styles/css/App.css";
import { saveTemplate, generateHTML, updateTemplate } from './dragAndDrop/utils';

const Header = (props) => {
  const handleSaveNew = (state) => {
    props.onSaveNew(state);
  }

  const openDropdown = (e) => {
    e.preventDefault();
    var dropdown = e.target.closest('.save-dropdown').querySelector('.dropdown-content');
    dropdown.style.display = dropdown.style.display === 'none' ? 'flex' : 'none';
  }

  return (
    <div className="page-header" >
      <span className="header-title">Learn@Cox Notification Template Generator</span>
      <div className='button-block'>
        <div className="save-dropdown" onClick={(e) => openDropdown(e)}>
          <div className='button button-save'>
            <div className='save'>Save</div>
            <div className='dropdown-arrow'></div>
          </div>
          <div className="dropdown-content" style={{display: 'none'}}>
            <div className='dropdown-option option-new' onClick={() => handleSaveNew(props.state)} style={props.showUpdate ? {marginBottom: '4px'} : {marginBottom: '0'}}>Save As New Template</div>
            <div className='dropdown-option option-update' onClick={() => updateTemplate(props.state)} style={props.showUpdate ? {display: 'none'} : {display: 'flex'}}>Update Current Template</div>
          </div>
        </div>
        <div onClick={() => generateHTML(props.state)} className='button button-generate'>Generate HTML</div>
      </div>
    </div>
  );
};

export default Header;
