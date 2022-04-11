import styled from 'styled-components';
import List from './List';

const Kiosk = styled(List)`
    position: absolute;
    background: #f2f2f5;
    top: 75px;
    left: 0;
    bottom: 0;
    width: 115px;
    display: flex;
    flex-direction:column;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 2px 1px -1px rgb(0 0 0 / 12%);
`;

export default Kiosk;