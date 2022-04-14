import styled from 'styled-components';

const ListItem = styled.div`
    display: flex;
    align-items: center;
    user-select: none;
    line-height: 1.5;
    border-radius: 3px;

    &:focus-within {
      .drag-handle, .delete-block {
        visibility: visible;
      }
    }
`;

export default ListItem;