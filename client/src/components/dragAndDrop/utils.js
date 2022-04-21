import uuid from 'uuid/v4';
import axios from 'axios';

// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
/**
* Moves an item from one list to another list. (For multiple lists)
*/
export const copy = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];

  destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destClone;
};

export const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

// Helper to remove items from the list
export const remove = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const saveState = ((oldState, value) => {
  var result = Array.from([...Object.values(oldState)[0]]);
  var index = result.findIndex((x) => x.id === value.id);
  result.splice(index, 1);
  result.splice(index, 0, value);
  return result;
});

export const updateTemplate = ((data, newTemp) => {
  window.saved = true;
  var result = {
    id: newTemp === true ? uuid() : Object.keys(data)[0],
    content: Object.values(data)[0],
  }
  axios
    .post(`https://learnatcox-notification-generator.onrender.com/api/${result.id}`, result)
    // .post(`https://localhost:8082/api/${result.id}`, result)
    .then((res) => {
      document.querySelector('.banner-save').style.display = 'flex';
      setTimeout(() => {
        window.location.href = `https://learnatcox-notification-generator.onrender.com/${result.id}`;
        // window.location.href = `https://localhost:8082/${result.id}`;
      }, 2000)
    })
    .catch(err => {
      console.log("Error in post: ", err);
    })
});

const generateMarkup = ((list) => {
  var outputString = ``;

  list.forEach((child) => {
    if(child.text) {
      if(child.fontSize) {
        outputString += `<span style="font-size:${child.fontSize}">${child.text}</span>`; 
      } else {
        outputString += child.text;
      }
      
      if(child.bold) {
        outputString = `<strong>${outputString}</strong>`
      }
      if(child.underline) {
        outputString = `<u>${outputString}</u>`
      }
      if(child.italic) {
        outputString = `<em>${outputString}</em>`
      }
    }
    if(child.type === 'link') {
      outputString = `<a href="${child.href}">${generateMarkup(child.children)}</a>`
    }
    if(child.type === 'list-item') {
      outputString += `<li>${generateMarkup(child.children)}</li>`
    }
  })
  return outputString;
})

export const generateHTML = ((result) => {
  // var htmlBody = '';
  // var finalOutput = '';
  var outputContainer = document.querySelector('.html-textarea');

  outputContainer.value = `<!doctype html><html><head><meta charset="utf-8"></head><body width="620" style="margin: 0; padding: 0 !important; background: #f3f3f5; mso-line-height-rule: exactly;"><center style="width: 100%; background: #f3f3f5;"><div id="email" style="width:620px;margin: auto;background:#eee;"><table role="presentation" border="0" width="100%" cellspacing="0"><tr><td align="center" style="padding: 0"><table style="background: #fff;" role="presentation" align="center" border="0" width="620" cellspacing="0">`;
  // console.log(result);
  Object.values(result)[0].forEach((el) => {
    switch(el.content) {
      case 'Image':
        outputContainer.value += `<tr><td align="${el.fieldProps.align === 'flex-start' ? 'left' : el.fieldProps.align === 'center' ? 'center' : 'right'}" style="padding: 0"><img alt="${el.id}" src="${el.fieldProps.url}" width="${el.fieldProps.width}"></td></tr>`
        break;
      case 'Button':
        outputContainer.value += `<tr><td align="${el.fieldProps.align === 'flex-start' ? 'left' : el.fieldProps.align === 'center' ? 'center' : 'right'}" style="padding: 10px;"><table cellspacing="0" cellpadding="0"><tr><td style="border-radius: 2px" bgcolor="#071f4f"><a href="${el.fieldProps.url}" target="_blank" style="background: #071f4f; border: 1px solid #071f4f; box-shadow: inset 0 1px 0 0 rgba(0,0,0,0); font-family: arial, sans-serif; font-size: 17px; line-height: 17px; color: #ffffff; text-decoration: none; padding: 13px 17px; display: block; border-radius: 4px; white-space: nowrap;">${el.fieldProps.label}</a></td></tr></table></td></tr>`
        break;
      case 'Text':
        el.fieldProps.editor.forEach((element) => {
          console.log(element)
          switch(element.type) {
            case 'heading-one':
              outputContainer.value += `<tr><td style="padding:10px;color:#575757;text-align:${element.align}"><h1 style="font-family:arial,sans-serif;margin:0">${generateMarkup(element.children)}</h1></td></tr>`;
              break;
            case 'heading-two':
              outputContainer.value += `<tr><td style="padding:10px;color:#575757;text-align:${element.align}"><h2 style="font-family:arial,sans-serif;margin:0">${generateMarkup(element.children)}</h2></td></tr>`;
              break;
            case 'heading-three':
              outputContainer.value += `<tr><td style="padding:10px;color:#575757;text-align:${element.align}"><h3 style="font-family:arial,sans-serif;margin:0">${generateMarkup(element.children)}</h3></td></tr>`;
              break;
            case 'heading-four':
              outputContainer.value += `<tr><td style="padding:10px;color:#575757;text-align:${element.align}"><h4 style="font-family:arial,sans-serif;margin:0">${generateMarkup(element.children)}</h4></td></tr>`;
              break;
            case 'heading-five':
              outputContainer.value += `<tr><td style="padding:10px;color:#575757;text-align:${element.align}"><h5 style="font-family:arial,sans-serif;margin:0">${generateMarkup(element.children)}</h5></td></tr>`;
              break;
            case 'heading-six':
              outputContainer.value += `<tr><td style="padding:10px;color:#575757;text-align:${element.align}"><h6 style="font-family:arial,sans-serif;margin:0">${generateMarkup(element.children)}</h6></td></tr>`;
              break;
            case 'bulleted-list':
              outputContainer.value += `<tr><td style="padding:10px;color:#575757;text-align:${element.align}"><ul style="font-family:arial,sans-serif;margin:0">${generateMarkup(element.children)}</ul></td></tr>`;
              break;
            case 'numbered-list':
              outputContainer.value += `<tr><td style="padding:10px;color:#575757;text-align:${element.align}"><ol style="font-family:arial,sans-serif;margin:0">${generateMarkup(element.children)}</ol></td></tr>`;
              break;
            case 'paragraph':
              outputContainer.value += `<tr><td style="padding:10px;color:#575757;text-align:${element.align}"><p style="font-family:arial,sans-serif;margin:0">${generateMarkup(element.children)}</p></td></tr>`;
              break;
            default:
              break;
          }
        })
        break;
      default:
        break;
    }
  });

  outputContainer.value += `</table></td></tr></table></div></center></body></html>`;
  outputContainer.value = outputContainer.value.replace(/[\u2019]/g, "'");
  outputContainer.value = outputContainer.value.replace(/[^\x00-\x7F]/g, " ");
  outputContainer.value = outputContainer.value.replace("  ", " ");
  return outputContainer.value.length
  // document.querySelector('.html-textarea').value = finalOutput;
});