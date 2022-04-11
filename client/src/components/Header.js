import React from 'react';
import "../styles/css/App.css";
import { saveTemplate, generateHTML, updateTemplate } from './dragAndDrop/utils';

const Header = (props) => {
  const handleSaveNew = (state) => {
    props.onSaveNew(state);
  }

  return (
    <div className="page-header" >
      <span className="header-title">Learn@Cox Notification Template Generator</span>
      <div className='button-block'>
        <div className="save-dropdown">
          <div className='button button-save'>
            <div className='save'>Save</div>
            <div className='dropdown-arrow'></div>
          </div>
          <div className="dropdown-content">
            <div className='dropdown-option option-new' onClick={() => handleSaveNew(props.state)}>Save As New</div>
            <div className='dropdown-option option-update' onClick={() => updateTemplate(props.state)}>Update Template</div>
          </div>
        </div>
        <div onClick={() => generateHTML(props.state)} className='button button-generate'>Generate HTML</div>
      </div>
    </div>
  );
};

export default Header;
