import PropTypes from 'prop-types';
import React from 'react';

import Btn from './Btn';
import Card from './Card';
import Content from './Content';
import SelectableFeature from './SelectableFeature';
import TicketImage from './TicketImage';

const NAME_SOUVENIRS = 'Souvenirs';

const propTypes = {
  ticketID: PropTypes.string,
  eventID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  lengthMins: PropTypes.number.isRequired,
  priceBase: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  addOns: PropTypes.array,
  dateStart: PropTypes.number,
  dateEnd: PropTypes.number
};

const defaultProps = {
  ticketID: '',
  addOns: [],
  dateStart: 0,
  dateEnd: 0
};

class Ticket extends React.Component {
  state = {
    addOnsSelected: [],
    priceTotal: 0
  };

  createTicket = () => {
    const { priceBase, lengthMins } = this.props;
    const { priceTotal, addOnsSelected } = this.state;
    const ticketSelected = {
      name: NAME_SOUVENIRS,
      priceTotal,
      priceBase,
      lengthMins,
      addOnsSelected
    };
    return ticketSelected;
  };

  getTotalPrice = addOnsSelected => {
    const { priceBase } = this.props;
    const priceAddOns = addOnsSelected.reduce((total, addOn) => (total += addOn.price), 0);
    return priceAddOns + priceBase;
  };

  handleAddOnSelect = event => {
    const { name, checked } = event.target;
    const { addOnsSelected } = this.state;
    const { addOns } = this.props;
    let addOnsSelectedUpdated = [];
    // handle add
    if (checked) {
      const addOn = addOns.filter(addOn => addOn.name === name)[0];
      addOnsSelectedUpdated = [...addOnsSelected, addOn];
    } else {
      // handle remove
      addOnsSelectedUpdated = addOnsSelected.filter(addOn => addOn.name !== name);
    }

    const priceTotal = this.getTotalPrice(addOnsSelectedUpdated);
    this.setState({ addOnsSelected: addOnsSelectedUpdated, priceTotal });
  };

  handleSelectTicket = () => {
    const { onSelect } = this.props;
    const ticket = this.createTicket();
    onSelect(ticket);
  };

  render() {
    const { ticketID, eventID, addOns, dateStart, dateEnd, influencerName } = this.props;

    const { priceTotal } = this.state;

    let addOnsDiv = <div />;
    if (addOns) {
      const addOnsSorted = addOns.sort((a, b) => b.price - a.price);
      addOnsDiv = addOnsSorted.map(addOn => (
        <SelectableFeature
          key={addOn.name}
          name={addOn.name}
          price={addOn.price}
          handleSelect={this.handleAddOnSelect}
        />
      ));
    }

    const ticketImg = (
      <TicketImage
        isPremium
        eventID={eventID}
        influencerName={influencerName}
        dateStart={dateStart}
        dateEnd={dateEnd}
      />
    );

    return (
      <Card>
        <Card.H1>Souvenirs</Card.H1>
        {ticketImg}
        <br />
        <Content.Seperator />
        {addOnsDiv}
        <Content.Seperator />
        <Content.Center>
          <Card.H2>$ {priceTotal}</Card.H2>
        </Content.Center>
        <div>
          <Btn.Full primary onClick={this.handleSelectTicket} id={ticketID}>
            Get Souvenirs
          </Btn.Full>
        </div>
      </Card>
    );
  }
}

Ticket.propTypes = propTypes;
Ticket.defaultProps = defaultProps;

export default Ticket;
