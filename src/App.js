import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { StripeProvider } from 'react-stripe-elements';

import Checkout from './containers/Checkout';
import ContactUs from './containers/ContactUs';
import EventSales from './containers/EventSales';
import LandingPage from './containers/LandingPage';
import Sales from './containers/Sales';
import SalesTotalAdmin from './containers/SalesTotalAdmin';
import Schedule from './containers/Schedule';
import NavBar from './containers/NavBar';
import TermsConditions from './containers/TermsConditions';
import TicketOptions from './containers/TicketOptions';
import PrivacyPolicy from './containers/PrivacyPolicy';
import OrderConfirmation from './containers/OrderConfirmation';

import LeaderboardAlistarbruback from './containers/leaderboards/Alistarbruback';
import LeaderboardJacksonnfelt from './containers/leaderboards/Jacksonnfelt';
import LeaderboardSocookiecutters from './containers/leaderboards/Socookiecutters';

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
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/confirmation" component={OrderConfirmation} />
              <Route path="/eventSales" component={EventSales} />
              <Route path="/sales" component={Sales} />
              <Route path="/sales-total-admin" component={SalesTotalAdmin} />
              <Route path="/schedule" component={Schedule} />
              <Route path="/options" component={TicketOptions} />
              <Route path="/termsConditions" component={TermsConditions} />
              <Route path="/privacyPolicy" component={PrivacyPolicy} />
              <Route path="/contactus" component={ContactUs} />

              <Route path="/alistarbrubacktop100" component={LeaderboardAlistarbruback} />
              <Route path="/top100-jacksonfelt" component={LeaderboardJacksonnfelt} />
              <Route path="/socookiecutterstop100" component={LeaderboardSocookiecutters} />
            </Switch>
          </div>
        </BrowserRouter>
      </StripeProvider>
    );
  }
}

export default App;
