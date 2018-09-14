import styled from 'styled-components';
import COLORS from '../utils/Colors';

const BtnProfile = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: none;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  color: ${COLORS.primary.red};
  cursor: pointer;
  :focus {
    outline: none;
  }
`;

export default BtnProfile;
