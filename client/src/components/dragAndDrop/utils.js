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
  // // // console.log('from save: ', Object.values(result)[0]);
  // // const doc = new Email({
  // //   id: Object.keys(result)[0],
  // //   content: Object.values(result)[0]
  // // });
  
  // // doc.save((err, doc) => {
  // //   if(err) return console.log(err)
  // //   console.log(doc)
  // // });
  // var result = {
  //   id: uuid(),
  //   content: Object.values(data)[0],
  // }
  // axios
  //   .post(`http://localhost:8082/`, result)
  //   .then((res) => {
  //     console.log(res)
  //   })
  //   .catch(err => {
  //     console.log("Error in post: ", err);
  //   })
  console.log('current state: ',data)
});

export const updateTemplate = ((data) => {
  var result = {
    id: Object.keys(data)[0],
    content: Object.values(data)[0],
  }
  axios
    .post(`https://notification-generator-mern.herokuapp.com/${result.id}`, result)
    .then((res) => {
      console.log(res)
    })
    .catch(err => {
      console.log("Error in post: ", err);
    })
});

export const generateHTML = ((result) => {
  console.log('from generate: ', result);
});