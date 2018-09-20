import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { StripeProvider } from 'react-stripe-elements';

import Checkout from './containers/Checkout';
import CheckoutVIP from './containers/CheckoutVIP';
import ContactUs from './containers/ContactUs';
import Events from './containers/Events';
import EventSales from './containers/EventSales';
import LandingPage from './containers/LandingPage';
import Register from './containers/Register';
import Status from './containers/Status';
import Schedule from './containers/Schedule';
import Main from './components/Main';
import NavBar from './containers/NavBar';
import TermsConditions from './containers/TermsConditions';
import PrivacyPolicy from './containers/PrivacyPolicy';
import OrderConfirmation from './containers/OrderConfirmation';
import WinnerCountdown from './containers/WinnerCountdown';

class App extends Component {
  constructor(props) {
    super(props);
    ReactGA.initialize('UA-122667442-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    return (
      // TODO - STRIPE PROVIDER API KEY XX
      <StripeProvider apiKey="null">
        <BrowserRouter>
          <div>
            <NavBar />
            <Main>
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route path="/event" component={Events} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/checkout-vip" component={CheckoutVIP} />
                <Route path="/confirmation" component={OrderConfirmation} />
                <Route path="/eventSales" component={EventSales} />
                <Route path="/status" component={Status} />
                <Route path="/schedule" component={Schedule} />
                <Route path="/register" component={Register} />
                <Route path="/termsConditions" component={TermsConditions} />
                <Route path="/privacyPolicy" component={PrivacyPolicy} />
                <Route path="/contactus" component={ContactUs} />
                <Route path="/countdown" component={WinnerCountdown} />
              </Switch>
            </Main>
          </div>
        </BrowserRouter>
      </StripeProvider>
    );
  }
}

export default App;
