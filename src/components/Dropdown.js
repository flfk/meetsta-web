import styled from 'styled-components';

import COLORS from '../utils/Colors';
import FONTS from '../utils/Fonts';

const Dropdown = styled.div`
  background-color: white;
  padding-left: 16px;
  padding-right: 16px;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const Row = FONTS.H3.extend`
  background-color: white;
  margin: 0;
  padding: 8px;
  cursor: pointer;
  font-size: ${FONTS.sizes.p};
`;
const RowActive = Row.extend`
  background-color: ${COLORS.greys.light};
`;

Dropdown.Row = Row;
Dropdown.RowActive = RowActive;

export default Dropdown;
