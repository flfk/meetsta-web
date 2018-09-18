import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Content from './Content';
import FONTS from '../utils/Fonts';

const propTypes = {};

const defaultProps = {};

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

class SelectableFeature extends React.Component {
  state = {
    isChecked: false
  };

  handleChange = () => {
    this.setState(prevState => ({ isChecked: !prevState.isChecked }));
  };

  render() {
    const { isChecked } = this.state;
    const { feature } = this.props;

    return (
      <Container>
        <Item>
          <Checkbox>
            <input type="checkbox" checked={isChecked} onChange={this.handleChange} />
          </Checkbox>
          <div>
            <FONTS.P>{feature}</FONTS.P>
          </div>
        </Item>
        <Price>$5</Price>
      </Container>
    );
  }
}

SelectableFeature.propTypes = propTypes;
SelectableFeature.defaultProps = defaultProps;

export default SelectableFeature;
