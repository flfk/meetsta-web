import PropTypes from 'prop-types';
import React from 'react';

import Btn from './Btn';
import Card from './Card';
import Content from './Content';
import EVENT_IMAGE_MACKENZIE from '../assets/eventImages/EventImageMackenzieSol2.png';
import EVENT_IMAGE_WILL from '../assets/eventImages/EventImageWillSimmons.png';
import EVENT_IMAGE_DENJIEL from '../assets/eventImages/EventImageDenjiel2.png';
import EVENT_IMAGE_DYLAN from '../assets/eventImages/EventImageDylanHartman.png';
import EVENT_IMAGE_LUIGI from '../assets/eventImages/EventImageLuigiCastillo.png';
import EVENT_IMAGE_JON from '../assets/eventImages/EventImageJonKlaasen.png';
import EVENT_IMAGE_LUCA from '../assets/eventImages/EventImageMostlyLuca.png';
import SelectableFeature from './SelectableFeature';
import TicketImage from './TicketImage';
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

  handleSelectTicket = () => {
    const { onSelect } = this.props;
    const ticket = this.createTicket();
    onSelect(ticket);
  };

  render() {
    const {
      ticketID,
      eventID,
      name,
      lengthMins,
      priceBase,
      addOns,
      onSelect,
      influencerName,
      isPremium,
      dateStart,
      dateEnd
    } = this.props;

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

    let eventImg = null;
    switch (eventID) {
      case 'meet-will-simmons':
        eventImg = <img src={EVENT_IMAGE_WILL} alt="Will Simmons Online Meet & Greet" />;
        break;
      case 'meet-mackenzie-sol-2':
        eventImg = <img src={EVENT_IMAGE_MACKENZIE} alt="Mackenzie Sol Online Meet & Greet" />;
        break;
      case 'meet-denjiel-2':
        eventImg = <img src={EVENT_IMAGE_DENJIEL} alt="Denjiel Online Meet & Greet" />;
        break;
      case 'meet-dylan-hartman':
        eventImg = <img src={EVENT_IMAGE_DYLAN} alt="Dylan Hartman Online Meet & Greet" />;
        break;
      case 'meet-luigi-castillo':
        eventImg = <img src={EVENT_IMAGE_LUIGI} alt="Luigi Castillo Online Meet & Greet" />;
        break;
      case 'meet-jon-klaasen':
        eventImg = <img src={EVENT_IMAGE_JON} alt="Jon Klaasen Online Meet & Greet" />;
        break;
      case 'meet-mostly-luca':
        eventImg = <img src={EVENT_IMAGE_LUCA} alt="Mostly Luca Online Meet & Greet" />;
        break;
      default:
        eventImg = null;
    }

    const ticketSelected = this.createTicket();

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
