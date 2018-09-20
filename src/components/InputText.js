import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Content from './Content';
import COLORS from '../utils/Colors';

const propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  errMsg: PropTypes.string,
  noMargin: PropTypes.bool
};

const defaultProps = {
  label: '',
  placeholder: '',
  errMsg: '',
  noMargin: false
};

const Label = styled.label`
  color: ${COLORS.greys.secondary};
  margin-bottom: 8px;
  display: inline-block;
`;

const Input = styled.input`
  padding: 1em 1em;
  border-radius: 3px;
  margin-bottom: ${props => (props.noMargin ? '0' : '16px')};
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

const ErrLabel = Label.extend`
  color: ${COLORS.error.primary};
  margin-bottom: 16px;
  font-weight: bold;
`;

const ErrInput = Input.extend`
  border: 1px solid ${COLORS.error.primary};
  background-color: ${COLORS.error.light};
  margin-bottom: 8px;
`;

const InputText = props => {
  const { value, label, onChange, placeholder, errMsg, noMargin } = props;

  const errLabel = errMsg ? <ErrLabel>{errMsg}</ErrLabel> : null;

  const input = noMargin ? (
    <Input type="text" onChange={onChange} placeholder={placeholder} value={value} noMargin />
  ) : (
    <Input type="text" onChange={onChange} placeholder={placeholder} value={value} />
  );

  return (
    <Content.NoPadding>
      <Label>{label}</Label>
      {input}
      {errLabel}
    </Content.NoPadding>
  );
};

InputText.ErrLabel = ErrLabel;

InputText.propTypes = propTypes;
InputText.defaultProps = defaultProps;

export default InputText;
