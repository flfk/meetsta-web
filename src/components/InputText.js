import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import COLORS from '../utils/Colors';

const propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

const defaultProps = {
  placeholder: ''
};

const Label = styled.label`
  color: ${COLORS.greys.secondary};
  margin-bottom: 8px;
  display: inline-block;
`;

const Input = styled.input`
  width: 100%;
  padding: 1em 1em;
  border-radius: 3px;
  margin-bottom: 16px;
  border: 1px solid ${COLORS.greys.light};
  font-size: 16px;
  color: ${COLORS.greys.primary};

  ::placeholder {
    color: ${COLORS.greys.supporting};
  }

  :focus {
    border: 1px solid ${COLORS.primary.green};
    outline: none;
  }
`;

const InputText = props => {
  return (
    <div>
      <Label>{props.label}</Label>
      <Input type="text" onChange={props.onChange} placeholder={props.placeholder} />
    </div>
  );
};

InputText.propTypes = propTypes;
InputText.defaultProps = defaultProps;

export default InputText;
