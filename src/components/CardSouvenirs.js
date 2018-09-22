import PropTypes from 'prop-types';
import React from 'react';

import Btn from './Btn';
import Card from './Card';
import Content from './Content';
import EVENT_IMAGE_MACKENZIE from '../assets/eventImages/EventImageMackenzieSol2.png';
import EVENT_IMAGE_WILL from '../assets/eventImages/EventImageWillSimmons.png';
import SelectableFeature from './SelectableFeature';
import Wrapper from './Wrapper';

const NAME_SOUVENIRS = 'Souvenirs';

const propTypes = {
  ticketID: PropTypes.string,
  eventID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  lengthMins: PropTypes.number.isRequired,
  priceBase: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  addOns: PropTypes.array
};

const defaultProps = {
  ticketID: '',
  addOns: []
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
      const addOnRemoved = addOns.filter(addOn => addOn.name === name)[0];
      addOnsSelectedUpdated = addOnsSelected.filter(addOn => addOn.name !== name);
    }

    const priceTotal = this.getTotalPrice(addOnsSelectedUpdated);
    this.setState({ addOnsSelected: addOnsSelectedUpdated, priceTotal });
  };

  render() {
    const { ticketID, eventID, name, lengthMins, priceBase, addOns, onSelect } = this.props;

    const { priceTotal } = this.state;

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

    let eventImg = null;
    switch (eventID) {
      case 'meet-will-simmons':
        eventImg = <img src={EVENT_IMAGE_WILL} alt="Will Simmons Online Meet & Greet" />;
        break;
      case 'meet-mackenzie-sol-2':
        eventImg = <img src={EVENT_IMAGE_MACKENZIE} alt="Mackenzie Sol Online Meet & Greet" />;
        break;
      default:
        eventImg = null;
    }

    const ticketSelected = this.createTicket();

    return (
      <Card>
        <Card.H1>Souvenirs</Card.H1>
        <Wrapper.EventImage>{eventImg}</Wrapper.EventImage>
        <br />
        <Content.Seperator />
        {addOnsDiv}
        <Content.Seperator />
        <Content.Center>
          <Card.H2>$ {priceTotal}</Card.H2>
        </Content.Center>
        <div>
          <Btn.Full primary onClick={() => onSelect(ticketSelected)} id={ticketID}>
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
