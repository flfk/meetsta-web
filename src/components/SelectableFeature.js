import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Content from './Content';
import FONTS from '../utils/Fonts';

const propTypes = {
  handleSelect: PropTypes.func,
  isBaseOption: PropTypes.bool,
  isChecked: PropTypes.bool,
  name: PropTypes.string,
  price: PropTypes.number
};

const defaultProps = {
  handleSelect: () => true,
  isBaseOption: false,
  isChecked: false,
  name: '',
  price: 0
};

class SelectableFeature extends React.Component {
  state = {
    isChecked: false
  };

  handleChange = event => {
    const { handleSelect } = this.props;
    handleSelect(event);
    this.setState(prevState => ({ isChecked: !prevState.isChecked }));
  };

  render() {
    const { isBaseOption, name, price } = this.props;

    const priceDiv = price ? <Price>${price}</Price> : null;

    let isChecked = this.state.isChecked;
    if (isBaseOption) {
      isChecked = this.props.isChecked;
    }

    return (
      <Container>
        <Item>
          <Checkbox>
            <input type="checkbox" checked={isChecked} onChange={this.handleChange} name={name} />
          </Checkbox>
          <div>
            <FONTS.P>{name}</FONTS.P>
          </div>
        </Item>
        {priceDiv}
      </Container>
    );
  }
}

SelectableFeature.propTypes = propTypes;
SelectableFeature.defaultProps = defaultProps;

const Container = styled.div`
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Checkbox = styled.span`
  margin-right: 8px;
`;

const Price = FONTS.P.extend`
  margin: 0;
`;

export default SelectableFeature;
