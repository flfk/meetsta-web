import PropTypes from 'prop-types';
import React from 'react';

import Btn from './Btn';
import Card from './Card';
import Content from './Content';
import { getTimeRange, getDate } from '../utils/helpers';
import PopupTime from '../containers/PopupTime';
import TicketImage from './TicketImage';
import SelectableFeature from './SelectableFeature';

const propTypes = {
  ticketID: PropTypes.string,
  eventID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  influencerName: PropTypes.string.isRequired,
  description: PropTypes.string,
  lengthMins: PropTypes.number.isRequired,
  priceBase: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  isPremium: PropTypes.bool.isRequired,
  baseOptions: PropTypes.array,
  addOns: PropTypes.array
};

const defaultProps = {
  ticketID: '',
  description: '',
  baseOptions: [],
  addOns: []
};

const DEFAULT_BASE_OPTION = 0;

class Ticket extends React.Component {
  state = {
    baseOptionSelected: '',
    ticketID: '',
    eventID: '',
    name: '',
    influencerName: '',
    lengthMins: '',
    priceBase: 0,
    isPremium: true,
    addOnsSelected: [],
    priceTotal: '',
    showPopupTime: false
  };

  componentDidMount() {
    this.loadTicketDate();
  }

  loadTicketDate = () => {
    const {
      name,
      influencerName,
      priceBase,
      ticketID,
      eventID,
      lengthMins,
      isPremium,
      addOns,
      baseOptions
    } = this.props;

    const baseOptionSelected = baseOptions ? baseOptions[DEFAULT_BASE_OPTION] : '';
    const state = {
      baseOptionSelected,
      ticketID: ticketID,
      eventID: eventID,
      name: name,
      influencerName,
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

  handleBaseOptionSelect = event => {
    const { name } = event.target;
    this.setState({ baseOptionSelected: name });
  };

  handleSelectTicket = () => {
    const { onSelect } = this.props;
    const { baseOptionSelected } = this.state;
    const ticket = { ...this.state };
    if (baseOptionSelected) {
      ticket.name = baseOptionSelected;
    }
    onSelect(ticket);
  };

  handleTimePopupOpen = () => this.setState({ showPopupTime: true });

  handleTimePopupClose = () => this.setState({ showPopupTime: false });

  render() {
    const {
      baseOptionSelected,
      ticketID,
      eventID,
      name,
      influencerName,
      lengthMins,
      priceBase,
      priceTotal,
      isPremium,
      showPopupTime
    } = this.state;

    const { addOns, onSelect, baseOptions, dateStart, dateEnd } = this.props;

    let addOnsDiv = null;
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

    let baseOptionsDiv = null;
    if (baseOptions.length > 0) {
      const baseOptionsList = baseOptions.map(option => {
        const isChecked = option === baseOptionSelected;
        return (
          <SelectableFeature
            key={option}
            name={option}
            price={priceBase}
            isBaseOption={true}
            isChecked={isChecked}
            handleSelect={this.handleBaseOptionSelect}
          />
        );
      });
      baseOptionsDiv = (
        <div>
          <Card.H3>What will you and {influencerName} do?</Card.H3>
          {baseOptionsList}
        </div>
      );
    } else {
      baseOptionsDiv = (
        <Content.Row>
          <Card.P>
            {name} on a {lengthMins} minute one-on-one video call
          </Card.P>
          <Card.P>${priceBase}</Card.P>
        </Content.Row>
      );
    }

    const eventTimeDiv = (
      <div>
        <Card.H3>Event date</Card.H3>
        <Card.P>{getTimeRange(dateStart, dateEnd)}</Card.P>
        <Card.P>{getDate(dateStart)}</Card.P>
        <Btn.Tertiary noPadding onClick={this.handleTimePopupOpen}>
          What time is that for me?
        </Btn.Tertiary>
      </div>
    );

    const popupTime = showPopupTime ? (
      <PopupTime handleClose={this.handleTimePopupClose} dateStart={dateStart} dateEnd={dateEnd} />
    ) : null;

    const ticketImg = (
      <TicketImage
        isPremium={isPremium}
        eventID={eventID}
        influencerName={influencerName}
        dateStart={dateStart}
        dateEnd={dateEnd}
      />
    );

    return (
      <Card>
        <Card.H1>Create Your Ticket</Card.H1>
        {ticketImg}
        <br />
        {eventTimeDiv}
        <Content.Seperator />
        {baseOptionsDiv}
        <Content.Seperator />
        <Card.H3> Optional Add-ons</Card.H3>
        {addOnsDiv}
        <Content.Seperator />
        <Content.Center>
          <Card.H2>$ {priceTotal}</Card.H2>
        </Content.Center>
        <div>
          <Btn.Full primary onClick={this.handleSelectTicket} id={ticketID}>
            Get Ticket
          </Btn.Full>
        </div>
        {popupTime}
      </Card>
    );
  }
}

Ticket.propTypes = propTypes;
Ticket.defaultProps = defaultProps;

export default Ticket;
