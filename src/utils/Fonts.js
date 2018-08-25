import styled from 'styled-components';
import 'typeface-roboto';

import COLORS from './Colors';

const FONT_FAMILY = {
  logo: 'LeckerliOne',
  header: 'Roboto',
  body: 'Roboto'
};

const LOGO = styled.span`
  font-size: 32px;
  font-family: ${FONT_FAMILY.logo};
  color: ${COLORS.primary.red};
`;

const H1 = styled.h1`
  font-size: 32px;
  font-family: ${FONT_FAMILY.header};
  color: ${COLORS.greys.primary};
  font-weight: 400;
`;

const P = styled.span`
  font-size: 16px;
  font-family: ${FONT_FAMILY.body};
  color: ${COLORS.greys.secondary};
  margin: 8px 0;
`;

const A = styled.a`
  text-decoration: none;
  font-weight: bold;
  color: ${COLORS.primary.red};

  :hover {
    text-decoration: underline;
  }
`;

const FONTS = {};
FONTS.LOGO = LOGO;
FONTS.H1 = H1;
FONTS.P = P;
FONTS.A = A;

export default FONTS;
