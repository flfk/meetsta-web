import styled from 'styled-components';

import Fonts from '../utils/Fonts';
import Media from '../utils/Media';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  // padding: 16px;
  padding-top: 0px;
  margin-bottom: 32px;

  ${Media.tablet} {
    box-shadow: none;
    border: none;
    margin-bottom: 16px;
    max-width: 95%;
  }
`;

const H1 = Fonts.H1.extend`
  margin-top: 16px;
  margin-bottom: 8px;
`;

const H2 = Fonts.H2.extend`
  margin-top: 0;
  margin-bottom: 16px;
`;

const H3 = Fonts.H3.extend`
  margin-top: 0;
  margin-bottom: 16px;
`;

const P = Fonts.P.extend`
  margin: 8px 0;
`;

Card.H1 = H1;
Card.H2 = H2;
Card.H3 = H3;
Card.P = P;

export default Card;
