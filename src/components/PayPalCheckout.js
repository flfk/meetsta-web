import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';
import paypal from 'paypal-checkout';

const propTypes = {};

const defaultProps = {};

class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButton: true
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      this.setState({ showButton: true });
    }
  }

  componentWillRecieveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const isLoadedPreviouslyWasnt =
      !this.state.showButton && this.props.isScriptLoaded && isScriptLoaded;

    if (isLoadedPreviouslyWasnt && isScriptLoadSucceed) {
      this.setState({ showButton: true });
    }
  }

  render() {
    const { total, currency, env, commit, client, onSuccess, onError, onCancel } = this.props;

    const { showButton } = this.state;

    let PayPalButton = paypal.Button.driver('react', { React, ReactDOM });

    const payment = () =>
      paypal.rest.payment.create(env, client, {
        transactions: [
          {
            amount: {
              total,
              currency
            }
          }
        ]
      });

    const onAuthorize = (data, actions) =>
      actions.payment.execute().then(() => {
        const payment = {
          paid: true,
          cancelled: false,
          payerID: data.payerID,
          paymentID: data.paymentID,
          paymentToken: data.paymentToken,
          returnUrl: data.returnUrl
        };

        onSuccess(payment);
      });

    return (
      <div>
        {showButton && (
          <PayPalButton
            env={env}
            client={client}
            commit={commit}
            payment={payment}
            onAuthorize={onAuthorize}
            onCancel={onCancel}
            onError={onError}
            style={{ size: 'responsive' }}
          />
        )}
      </div>
    );
  }
}

PaypalButton.propTypes = propTypes;
PaypalButton.defaultProps = defaultProps;

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PaypalButton);

// let PayPalButton = paypal.Button.driver('react', { React, ReactDOM });

// class Main extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       env: 'sandbox',
//       client: {
//         sandbox: 'AWi18rxt26-hrueMoPZ0tpGEOJnNT4QkiMQst9pYgaQNAfS1FLFxkxQuiaqRBj1vV5PmgHX_jA_c1ncL',
//         production: '<insert production client id>'
//       },
//       commit: true
//     };
//   }
//   payment(data, actions) {
//     return actions.payment.create({
//       transactions: [
//         {
//           amount: { total: '0.01', currency: 'USD' }
//         }
//       ]
//     });
//   }
//   onAuthorize(data, actions) {
//     return actions.payment.execute().then(function(paymentData) {
//       // Show a success page to the buyer
//     });
//   }
//   render() {
//     return (
//       <PayPalButton
//         commit={this.state.commit}
//         env={this.state.env}
//         client={this.state.client}
//         payment={(data, actions) => this.payment(data, actions)}
//         onAuthorize={(data, actions) => this.onAuthorize(data, actions)}
//       />
//     );
//   }
// }
