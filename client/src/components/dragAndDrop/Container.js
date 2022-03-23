import styled from 'styled-components';

const Container = styled.div`
    margin: 0.5rem 0.5rem 1.5rem;
    border: 1px
        ${props => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
    background: #fff;
    padding: 3em 1em;
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

export default Container;