import React, { Component } from "react";
import { CgTrash } from "react-icons/cg";
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import Tooltip from './Tooltip';


class JoyRide extends Component{
  state = {
    run: window.localStorage.getItem('tutorialFlag') === null ? true : false,
      steps: [
      {
        target: 'body',
        content: 'Welcome!',
        disableBeacon: true,
        placement: 'center',
        styles: {options: {
          width: 500,
        }}
      },
      {
        target: '.sc-bZQynM',
        content: <Tooltip title='Drag and Drop Elements!' body={'Drag template elements from here into editor.'}/>,
        placement: 'right-start',
        spotlightClicks: true,
        disableOverlay: true,
      },
      {
        target: '.text-input',
        content: <Tooltip title='Fully Customizable!' body={'Click to customize the elements of your template.'}/>,
        placement: 'right',
        spotlightClicks: true,
        disableOverlayClose: true,
        disableOverlay: true,
      },
      {
        target: '.HgaYi',
        content: <Tooltip title='Drag and Drop Editor!' body={'Drag and drop elements using the arrow and delete by clicking the trash icon.'}/>,
        placement: 'right',
        spotlightClicks: true,
        disableOverlayClose: true,
        disableOverlay: true,
      },
      {
        target: '.button-generate',
        content: <Tooltip title='Generate HTML' body={'Click here to generate the HTML for your template.'}/>,
        placement: 'bottom',
        spotlightClicks: true,
        disableOverlayClose: true,
        disableOverlay: true,
      },
      {
        target: '.button-save',
        content: <Tooltip title='Save and Share!' body={'Save a new template, or update the existing template. This will generate a shareable link!'}/>,
        placement: 'left',
        spotlightClicks: true,
        disableOverlayClose: true,
        disableOverlay: true,
      }
    ],
    stepIndex: 0, // a controlled tour
  };

  handleJoyrideCallback = data => {
    const { action, index, status, type } = data;
    
    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      this.setState({ stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) });
    }
    if ([EVENTS.STEP_BEFORE, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      if(index === 3) {
        document.querySelector('.drag-handle').style.visibility = 'visible';
        document.querySelector('.delete-block').style.visibility = 'visible';
      }
      else {
        document.querySelectorAll('.drag-handle').forEach((el) => {
          el.style.visibility = null;
        });
        document.querySelectorAll('.delete-block').forEach((el) => {
          el.style.visibility = null;
        })
      }
    }
    else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      this.setState({ run: false });
      window.localStorage.setItem('tutorialFlag', true);
    }

    console.groupCollapsed(type);
    console.log(data); //eslint-disable-line no-console
    console.groupEnd();
  };

  render () {
    const { run, stepIndex, steps } = this.state;

    return (
      <div className="app">
        <Joyride
          callback={this.handleJoyrideCallback}
          run={run}
          stepIndex={stepIndex}
          steps={steps}
          continuous
          hideBackButton
          styles={{
            options: {  
              primaryColor: '#a9413a',
            }
          }}
        />
      </div>
    );
  }
}

export default JoyRide;