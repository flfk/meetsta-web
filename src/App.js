import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { StripeProvider } from 'react-stripe-elements';

import Checkout from './containers/Checkout';
import ContactUs from './containers/ContactUs';
import Events from './containers/Events';
import EventSales from './containers/EventSales';
import LandingPage from './containers/LandingPage';
import Register from './containers/Register';
import Sales from './containers/Sales';
import SalesTotalAdmin from './containers/SalesTotalAdmin';
import Status from './containers/Status';
import Schedule from './containers/Schedule';
import Main from './components/Main';
import NavBar from './containers/NavBar';
import TermsConditions from './containers/TermsConditions';
import TicketOptions from './containers/TicketOptions';
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
                <Route path="/confirmation" component={OrderConfirmation} />
                <Route path="/eventSales" component={EventSales} />
                <Route path="/sales" component={Sales} />
                <Route path="/sales-total-admin" component={SalesTotalAdmin} />
                <Route path="/status" component={Status} />
                <Route path="/schedule" component={Schedule} />
                <Route path="/register" component={Register} />
                <Route path="/options" component={TicketOptions} />
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
