import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

const propTypes = {};

const defaultProps = {};

// class PayPalCheckout extends React.Component {
//   state = {
//     showButton = false;
//   }

//   render() {
//     return <div />;
//   }
// }

// PayPalCheckout.propTypes = propTypes;
// PayPalCheckout.defaultProps = defaultProps;

// export default PayPalCheckout;

let PayPalButton = paypal.Button.driver('react', { React, ReactDOM });

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      env: 'sandbox',
      client: {
        sandbox: 'AWi18rxt26-hrueMoPZ0tpGEOJnNT4QkiMQst9pYgaQNAfS1FLFxkxQuiaqRBj1vV5PmgHX_jA_c1ncL',
        production: '<insert production client id>'
      },
      commit: true
    };
  }
  payment(data, actions) {
    return actions.payment.create({
      transactions: [
        {
          amount: { total: '0.01', currency: 'USD' }
        }
      ]
    });
  }
  onAuthorize(data, actions) {
    return actions.payment.execute().then(function(paymentData) {
      // Show a success page to the buyer
    });
  }
  render() {
    return (
      <PayPalButton
        commit={this.state.commit}
        env={this.state.env}
        client={this.state.client}
        payment={(data, actions) => this.payment(data, actions)}
        onAuthorize={(data, actions) => this.onAuthorize(data, actions)}
      />
    );
  }
}
