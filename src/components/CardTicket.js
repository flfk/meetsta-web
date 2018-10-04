import PropTypes from 'prop-types';
import React from 'react';

import Btn from './Btn';
import Card from './Card';
import Content from './Content';
import TicketImage from './TicketImage';
import SelectableFeature from './SelectableFeature';

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

    const ticketName =
      eventID === 'meet-mostly-luca-mini'
        ? 'Say hi to Luca and take a selfie together on a one-on-one video call'
        : `${lengthMins} minute one-on-one video call`;

    return (
      <Card>
        <Card.H1>{name}</Card.H1>
        <TicketImage isPremium={isPremium} eventID={eventID} />
        <br />
        <Content.Row>
          <Card.P>{ticketName}</Card.P>
          <Card.P>${priceBase}</Card.P>
        </Content.Row>
        <Content.Seperator />
        <Card.H3> Optional Add-ons</Card.H3>
        {addOnsDiv}
        <Content.Seperator />
        <Content.Center>
          <Card.H2>$ {priceTotal}</Card.H2>
        </Content.Center>
        <div>
          <Btn.Full primary onClick={() => onSelect({ ...this.state })} id={ticketID}>
            Get Ticket
          </Btn.Full>
        </div>
      </Card>
    );
  }
}

Ticket.propTypes = propTypes;
Ticket.defaultProps = defaultProps;

export default Ticket;
