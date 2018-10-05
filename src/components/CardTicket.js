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
    priceBase: '',
    isPremium: true,
    addOnsSelected: [],
    priceTotal: ''
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

  createTicket = () => {};

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
      isPremium
    } = this.state;

    const { addOns, onSelect, baseOptions } = this.props;

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

    const baseNonSelectableDiv = (
      <Content.Row>
        <Card.P>{lengthMins} minute one-on-one video call</Card.P>
        <Card.P>${priceBase}</Card.P>
      </Content.Row>
    );

    let baseOptionsDiv = null;
    if (baseOptions) {
      const baseOptionsList = baseOptions.map(option => {
        const isChecked = option === baseOptionSelected;
        return (
          <SelectableFeature
            key={option}
            name={option}
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
    }

    const ticketDescription = baseOptions ? baseOptionsDiv : baseNonSelectableDiv;

    if (baseOptions)
      return (
        <Card>
          <Card.H1>{name}</Card.H1>
          <TicketImage isPremium={isPremium} eventID={eventID} />
          <br />
          {ticketDescription}
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
