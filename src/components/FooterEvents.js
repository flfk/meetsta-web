import styled from 'styled-components';

import COLORS from '../utils/Colors';
import MEDIA from '../utils/Media';

const FooterEvents = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 8px 0;
  background-color: white;
  border-top: 1px solid ${COLORS.greys.light};

  display: flex;
  justify-content: center;

  ${MEDIA.tablet} {
    flex-direction: column;
    // width: calc(100% -32px);
    position-left: 0;
  }
`;

export default FooterEvents;
