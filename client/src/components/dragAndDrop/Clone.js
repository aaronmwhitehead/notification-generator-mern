import styled from 'styled-components';
import Item from './Item';

const Clone = styled(Item)`
    ~ div {
        transform: none !important;
    }
`;

export default Clone;