import styled from 'styled-components';

import COLORS from '../utils/Colors';
import DARKEN from '../utils/Darken';

// Default is secondary, for primary button use <Btn primary></Btn>

const Btn = styled.button`
  width: 100%;
  margin: 8px;
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
  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
  }
`;

Btn.Tertiary = Tertiary;

export default Btn;
