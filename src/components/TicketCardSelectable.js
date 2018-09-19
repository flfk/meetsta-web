import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Btn from './Btn';
import COLORS from '../utils/Colors';
import Content from './Content';
import FONTS from '../utils/Fonts';
import TicketImage from './TicketImage';
import SelectableFeature from './SelectableFeature';
import MEDIA from '../utils/Media';

const propTypes = {
  ticketID: PropTypes.string,
  eventID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  lengthMins: PropTypes.number.isRequired,
  priceBase: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  isPremium: PropTypes.bool.isRequired,
  addOns: PropTypes.array
};

const defaultProps = {
  ticketID: '',
  description: '',
  addOns: []
};

class Ticket extends React.Component {
  state = {
    ticketID: '',
    eventID: '',
    name: '',
    lengthMins: '',
    priceBase: '',
    isPremium: true,
    addOnsSelected: [],
    priceTotal: ''
  };

  componentDidMount() {
    this.loadTicketDate();
  }

  loadTicketDate = () => {
    const { name, priceBase, ticketID, eventID, lengthMins, isPremium, addOns } = this.props;
    const state = {
      ticketID: ticketID,
      eventID: eventID,
      name: name,
      lengthMins: lengthMins,
      priceBase: priceBase,
      isPremium: isPremium,
      priceTotal: priceBase
    };
    this.setState(state);
  };

  handleAddOnSelect = event => {
    const { name, checked } = event.target;
    const { addOnsSelected, priceTotal } = this.state;
    const { addOns } = this.props;
    let addOnsSelectedUpdated = [];
    let priceTotalUpdated = priceTotal;
    // handle add
    if (checked) {
      const addOn = addOns.filter(addOn => addOn.name === name)[0];
      priceTotalUpdated += addOn.price;
      addOnsSelectedUpdated = [...addOnsSelected, addOn];
    } else {
      // handle remove
      const addOnRemoved = addOns.filter(addOn => addOn.name === name)[0];
      priceTotalUpdated -= addOnRemoved.price;
      addOnsSelectedUpdated = addOnsSelected.filter(addOn => addOn.name !== name);
    }
    this.setState({ addOnsSelected: addOnsSelectedUpdated, priceTotal: priceTotalUpdated });
  };

  createTicket = () => {};

  render() {
    const { ticketID, eventID, name, lengthMins, priceBase, priceTotal, isPremium } = this.state;

    const { addOns, onSelect } = this.props;

    let addOnsDiv = <div />;
    if (addOns) {
      const addOnsSorted = addOns.sort((a, b) => b.price - a.price);
      addOnsDiv = addOnsSorted.map(addOn => (
        <SelectableFeature
          key={addOn.name}
          name={addOn.name}
          price={addOn.price}
          handleAddOnSelect={this.handleAddOnSelect}
        />
      ));
    }

    return (
      <Container>
        <H1>{name}</H1>
        <TicketImage isPremium={isPremium} eventID={eventID} />
        <br />
        <Content.Row>
          <P>✓ {lengthMins} minute one-on-one video call</P>
          <P>${priceBase}</P>
        </Content.Row>
        <Content.Seperator />
        <H3> Optional Add-ons</H3>
        {addOnsDiv}
        <Content.Seperator />
        <Content.Center>
          <H2>$ {priceTotal}</H2>
        </Content.Center>
        <div>
          <Btn.Full primary onClick={() => onSelect({ ...this.state })} id={ticketID}>
            Get Ticket
          </Btn.Full>
        </div>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  // max-width: 342px;
  border: 1px solid ${COLORS.greys.light};
  border-radius: 5px;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
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

Ticket.propTypes = propTypes;
Ticket.defaultProps = defaultProps;

export default Ticket;
