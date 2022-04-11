import styled from 'styled-components';

const Delete = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  user-select: none;
  padding: 6px;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  color: #d9251f;
  border: 1px solid #eee;
  
  &:hover {
    box-shadow: 0 1px 5px rgb(0 0 0 / 15%);
  }
`;

export default Delete;