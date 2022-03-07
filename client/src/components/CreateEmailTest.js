import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "../App.css";
import Element from "./element/Element";
import Field from './fields/Field';
import uuid from 'uuid/v4';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
/**
 * Moves an item from one list to another list.
 */
const copy = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];

    destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
    return destClone;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const Content = styled.div`
    margin-right: 200px;
`;

const Item = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    line-height: 1.5;
    border-radius: 3px;
    height: 5em;
    width: 10em;
    margin: 5px 0;
`;

const ListItem = styled.div`
    display: flex;
    align-items: center;
    user-select: none;
    line-height: 1.5;
    border-radius: 3px;
    width: 70%;
`;

const Clone = styled(Item)`
    ~ div {
        transform: none !important;
    }
`;

const Handle = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    user-select: none;
    padding: 6px;
    border-radius: 3px 0 0 3px;
`;

const List = styled.div`
    border: 1px
        ${props => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
    background: #fff;
    padding: 0.5rem 0.5rem 0;
    border-radius: 3px;
    flex: 0 0 150px;
    font-family: sans-serif;
    min-height: 60px;
`;

const Kiosk = styled(List)`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 200px;
`;

const Container = styled.div`
    margin: 0.5rem 0.5rem 1.5rem;
    border: 1px
        ${props => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
    background: #fff;
    padding: 1em;
    border-radius: 3px;
    flex: 0 0 150px;
    font-family: sans-serif;
    min-height: 300px;
    max-height: 98vh;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Notice = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    padding: 0.5rem;
    margin: 0 0.5rem 0.5rem;
    border: 1px solid transparent;
    line-height: 1.5;
    color: #aaa;
`;

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
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
      return (
          <DragDropContext onDragEnd={this.onDragEnd}>
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
                                                            {/* This needs to be in it's own component */}
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
