import React, { Component } from 'react';
import "../../styles/css/App.css";
import Element from "../element/Element";
import Field from '../fields/Field';
import uuid from 'uuid/v4';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { reorder, copy, move } from './utils';
import Content from './Content';
import Item from './Item';
import ListItem from './ListItem';
import Clone from './Clone';
import Handle from './Handle';
import Kiosk from './Kiosk';
import Container from './Container';
import Notice from './Notice';

const ITEMS = [
    {
        id: uuid(),
        content: 'Text',
        class: 'fas fa-align-justify'
    },
    {
        id: uuid(),
        content: 'Image',
        class: 'far fa-image'
    },
    {
        id: uuid(),
        content: 'Button',
        class: 'i-button'
    }
];

class CreateEmailTest extends Component {
    state = {
        [uuid()]: []
    };
    onDragStart = (() => {
      document.querySelectorAll('.slate-toolbar').forEach((el) => {
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
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
      return (
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
                                                            <Handle
                                                                {...provided.dragHandleProps}>
                                                                <svg
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24">
                                                                    <path
                                                                        fill="#ddd"
                                                                        d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
                                                                    />
                                                                </svg>
                                                            </Handle>
                                                            <Field type={item.content}/>
                                                        </ListItem>
                                                    )}
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
      );
    }
}

// Put the things into the DOM!
export default CreateEmailTest;
