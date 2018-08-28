import styled from 'styled-components';

import COLORS from '../utils/Colors';

const FooterEvents = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 8px 0;
  background-color: white;
  border-top: 1px solid ${COLORS.greys.light};

  display: flex;
  justify-content: center;
`;

export default FooterEvents;
