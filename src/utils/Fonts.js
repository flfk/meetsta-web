import styled from 'styled-components';
import 'typeface-roboto';

import COLORS from './Colors';

const FONT_FAMILY = {
  logo: 'LeckerliOne, sans-serif',
  header: 'Roboto, sans-serif',
  body: 'Roboto, sans-serif'
};

const FONT_SIZES = {
  logo: '32px',
  h1: '32px',
  h2: '24px',
  p: '16px'
};

const LOGO = styled.span`
  font-size: ${FONT_SIZES.logo};
  font-family: ${FONT_FAMILY.logo};
  font-weight: 400;
`;

const H1 = styled.h1`
  font-size: ${FONT_SIZES.h1};
  font-family: ${FONT_FAMILY.header};
  color: ${COLORS.greys.primary};
  font-weight: 400;
`;

const H2 = styled.h2`
  font-size: ${FONT_SIZES.h2};
  font-family: ${FONT_FAMILY.header};
  color: ${COLORS.greys.primary};
  font-weight: 400;
`;

const P = styled.span`
  font-size: ${FONT_SIZES.p};
  font-family: ${FONT_FAMILY.body};
  font-weight: 300;
  color: ${COLORS.greys.secondary};
  margin: 8px 0;
`;

const A = styled.a`
  font-size: ${FONT_SIZES.p};
  text-decoration: none;
  color: ${COLORS.primary.red};

  :hover {
    text-decoration: underline;
  }
`;

const FONTS = {};
FONTS.family = FONT_FAMILY;
FONTS.sizes = FONT_SIZES;
FONTS.LOGO = LOGO;
FONTS.H1 = H1;
FONTS.H2 = H2;
FONTS.P = P;
FONTS.A = A;

export default FONTS;
