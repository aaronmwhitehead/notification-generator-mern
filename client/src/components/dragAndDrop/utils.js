import uuid from 'uuid/v4';
import axios from 'axios';
import fetch from 'node-fetch';

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

export const saveTemplate = ((data) => {
  var result = {
    id: uuid(),
    content: Object.values(data)[0],
  }
  axios
    .post(`http://localhost:8082/api/${result.id}`, result)
    .then(() => {
      alert('Saved new template')
      window.location.href = `http://localhost:8082/${result.id}`;
    })
    .catch(err => {
      console.log("Error in post: ", err);
    })
});

export const updateTemplate = ((data) => {
  var result = {
    id: Object.keys(data)[0],
    content: Object.values(data)[0],
  }
  axios
    .post(`http://localhost:8082/api/${result.id}`, result)
    .then((res) => {
      alert('Updated current template')
      window.location.href = `http://localhost:8082/${result.id}`;
    })
    .catch(err => {
      console.log("Error in post: ", err);
    })
});

export const generateHTML = ((result) => {
  console.log('from generate: ', result);
});