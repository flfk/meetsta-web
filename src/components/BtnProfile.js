import styled from 'styled-components';
import COLORS from '../utils/Colors';

const BtnProfile = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: none;
  font-size: 16px;
  color: ${COLORS.primary.red};
  cursor: pointer;
  :focus {
    outline: none;
  }
`;

export default BtnProfile;
