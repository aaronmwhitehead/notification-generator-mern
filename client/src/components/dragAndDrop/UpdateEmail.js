import React, { Component } from 'react';
import "../../styles/css/App.css";
import Element from "../element/Element";
import Field from '../fields/Field';
import uuid from 'uuid/v4';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { reorder, copy, move, remove, saveState, saveTemplate } from './utils';
import Content from './Content';
import Item from './Item';
import ListItem from './ListItem';
import Clone from './Clone';
import Handle from './Handle';
import Kiosk from './Kiosk';
import Container from './Container';
import Notice from './Notice';
import Header from '../Header';
import {RiDragMove2Fill} from 'react-icons/ri'
import Delete from './Delete';
import { CgTrash } from 'react-icons/cg';
import axios from 'axios';

const ITEMS = [
    {
        id: uuid(),
        content: 'Text',
        fieldProps: {
          url: null,
          align: null,
          width: null,
          height: null,
          label: null,
          editor: [{
            type: "parahraph",
            children: [{ text: 'A line of text in a paragraph.' }],
          }]
        }
    },
    {
        id: uuid(),
        content: 'Image',
        fieldProps: {
          url: '../assets/default-banner.png',
          align: "center",
          width: "45",
          height: "40",
          label: null,
          editor: []
        }
    },
    {
        id: uuid(),
        content: 'Button',
        fieldProps: {
          url: 'https://cox.sumtotal.host',
          align: "center",
          width: null,
          height: null,
          label: "Button",
          editor: []
        }
    }
];

class UpdateEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("Print id: " + this.props.match.params.id);
    axios
      .get(`http://localhost:8082/api/${this.props.match.params.id}`)
      .then(result => {
        console.log(result);
        this.setState({
          [this.props.match.params.id]: JSON.parse(result.data.content)
        }, () => {console.log(this.state)})
      })
      .catch(err => {
        console.log("Error from UpdateEmailInfo: ", err);
      })
  };

  updateState = ((value) => {
    this.setState({
      [Object.keys(this.state)[0]]: saveState(this.state, value)
    });
  });

  onSaveNew = ((data) => {
    console.log('old state: ', this.state);
    this.setState({[Object.keys(this.state)[0]]: Object.values(data)[0]}
      , () => saveTemplate(this.state));
  })

  onDeleteSection = ((result) => {
    const objId = result.target.closest('.delete-block').getAttribute("data-uuid");
    let currentState = Object.values(this.state)[0];
    const indexOfObject = currentState.findIndex(object => {
      return object.id === objId;
    });
    currentState.splice(indexOfObject, 1);
    this.setState(this.state);
  });

  onDragStart = (() => {
    document.querySelectorAll('.slate-toolbar').forEach((el) => {
      el.style.display = 'none';
    });

    document.querySelectorAll('.content-editor').forEach((el) => {
      el.style.display = 'none';
    });
  });
  onDragEnd = result => {
      const { source, destination } = result;

      // dropped outside the list
      if (!destination) {
          return;
      }

      switch (source.droppableId) {
          case destination.droppableId:
              this.setState({
                  [destination.droppableId]: reorder(
                      this.state[source.droppableId],
                      source.index,
                      destination.index
                  )
              });
              break;
          case 'ITEMS':
              this.setState({
                  [destination.droppableId]: copy(
                      ITEMS,
                      this.state[destination.droppableId],
                      source,
                      destination
                  )
              });
              break;
          default:
            console.log('default drag')
              this.setState(
                  move(
                      this.state[source.droppableId],
                      this.state[destination.droppableId],
                      source,
                      destination
                  )
              );
              break;
      }
      
      document.querySelectorAll('.slate-toolbar').forEach((el) => {
        el.style.display = null;
      });
      document.querySelectorAll('.content-editor').forEach((el) => {
        el.style.display = null;
      });
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <div>
        <Header onSaveNew={(data) => {this.onSaveNew(data)}} state={this.state}/>
        <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
            <Droppable droppableId="ITEMS" isDropDisabled={true}>
                {(provided, snapshot) => (
                    <Kiosk
                        innerRef={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}>
                        {ITEMS.map((item, index) => (
                            <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}>
                                {(provided, snapshot) => (
                                    <React.Fragment>
                                        <Item
                                            innerRef={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            isDragging={snapshot.isDragging}
                                            >
                                            <Element name={item.content} class={item.class}/>
                                        </Item>
                                        {snapshot.isDragging && (
                                            <Clone><Element name={item.content} class={item.class}/></Clone>
                                        )}
                                    </React.Fragment>
                                )}
                            </Draggable>
                        ))}
                    </Kiosk>
                )}
            </Droppable>
            <Content>
                {Object.keys(this.state).map((list, i) => (
                    <Droppable key={list} droppableId={list}>
                        {(provided, snapshot) => (
                            <Container
                                innerRef={provided.innerRef}
                                isDraggingOver={snapshot.isDraggingOver}>
                                {this.state[list].length
                                    ? this.state[list].map(
                                          (item, index) => (
                                              <Draggable
                                                  key={item.id}
                                                  draggableId={item.id}
                                                  index={index}>
                                                  {(provided, snapshot) => (
                                                      <ListItem
                                                          innerRef={
                                                              provided.innerRef
                                                          }
                                                          {...provided.draggableProps}
                                                          isDragging={
                                                              snapshot.isDragging
                                                          }
                                                          style={
                                                              provided
                                                                  .draggableProps
                                                                  .style
                                                          }>
                                                          <div tabIndex={0} className='action-icon drag-handle'>
                                                            <Handle
                                                                {...provided.dragHandleProps}>
                                                                <RiDragMove2Fill size={24}/>
                                                            </Handle>
                                                          </div>
                                                          <div tabIndex={0} data-uuid={item.id} onClick={this.onDeleteSection} className='action-icon delete-block'>
                                                            <Delete>
                                                              <CgTrash size={18}/>
                                                            </Delete>
                                                          </div>
                                                          <Field item={item} type={item.content} onStateChange={(value) => {this.updateState(value)}}></Field>
                                                      </ListItem>
                                                    )
                                                  }
                                              </Draggable>
                                          )
                                      )
                                    : !provided.placeholder && (
                                          <Notice>Drop items here</Notice>
                                      )}
                                {provided.placeholder}
                            </Container>
                        )}
                    </Droppable>
                ))}
            </Content>
        </DragDropContext>
      </div>
    );
  }
}

// Put the things into the DOM!
export default UpdateEmail;
