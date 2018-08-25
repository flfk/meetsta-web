import styled from 'styled-components';

import COLORS from '../utils/Colors';

const FooterSticky = styled.div`
  position: fixed;
  bottom: 0;
  padding: 8px 0;
  background-color: white;
  border-top: 1px solid ${COLORS.greys.supporting};
`;

export default FooterSticky;
