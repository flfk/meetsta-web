import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  lengthMins: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired
};

const defaultProps = {};

const Ticket = props => {
  const { name, description, lengthMins, price } = props;

  return (
    <div>
      Ticket, {name} {description} {lengthMins} {price}
    </div>
  );
};

Ticket.propTypes = propTypes;
Ticket.defaultProps = defaultProps;

export default Ticket;
