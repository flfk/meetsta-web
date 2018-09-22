import styled from 'styled-components';

import COLORS from '../utils/Colors';
import FONTS from '../utils/Fonts';
import MEDIA from '../utils/Media';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 16px;
  padding-top: 0px;
  margin-bottom: 32px;

  ${MEDIA.tablet} {
    box-shadow: none;
    border: none;
    margin-bottom: 16px;
  }
`;

const H1 = FONTS.H1.extend`
  margin-top: 16px;
  margin-bottom: 8px;
`;

const H2 = FONTS.H2.extend`
  margin-top: 0;
  margin-bottom: 16px;
`;

const H3 = FONTS.H3.extend`
  margin-top: 0;
  margin-bottom: 16px;
`;

const P = FONTS.P.extend`
  margin: 8px 0;
`;

Card.H1 = H1;
Card.H2 = H2;
Card.H3 = H3;
Card.P = P;

export default Card;
