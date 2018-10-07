import styled from 'styled-components';

import COLORS from '../utils/Colors';
import DARKEN from '../utils/Darken';

// Default is secondary, for primary button use <Btn primary></Btn>

const Btn = styled.button`
  flex: 1 0 1;
  width: ${props => (props.fill ? '100%' : '')};
  padding: 1em 1em;
  background-color: transparent;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  border: 1px solid ${COLORS.primary.red};
  background-color: ${props => (props.primary ? COLORS.primary.red : 'none')};
  color: ${props => (props.primary ? 'white' : COLORS.primary.red)};

  :hover {
    border-color: ${props => (props.primary ? DARKEN(COLORS.primary.red) : COLORS.primary.red)};
    background-color: ${props => (props.primary ? DARKEN(COLORS.primary.red) : COLORS.primary.red)};
    color: white;
  }

  :focus {
    outline: none;
  }

  // Animation for hover, source: Bootstrap 4
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const Tertiary = styled.button`
  padding: 1em 1em;
  font-size: 16px;
  font-weight: bold;
  background-color: transparent;
  border: none;
  color: ${COLORS.primary.red};
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
  }

  ${props => (props.noPadding ? 'padding: 0' : '')};
`;

const Inline = Tertiary.extend`
  font-size: 24px;
`;

const Full = Btn.extend`
  width: 100%;
  margin: 0;
`;

Btn.Tertiary = Tertiary;
Btn.Full = Full;
Btn.Inline = Inline;

export default Btn;
