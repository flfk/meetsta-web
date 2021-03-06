import React, { Component } from 'react';
import ReactGA from 'react-ga';
import mixpanel from 'mixpanel-browser';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { StripeProvider } from 'react-stripe-elements';

import Auth from './containers/Auth';
import Checkout from './containers/Checkout';
import ContactUs from './containers/ContactUs';
import Dashboard from './containers/Dashboard';
import EventSales from './containers/EventSales';
import LandingPage from './containers/LandingPage';
import Leaderboard from './containers/Leaderboard';
import Sales from './containers/Sales';
import SalesTotalAdmin from './containers/SalesTotalAdmin';
import Schedule from './containers/Schedule';
import NavBar from './containers/NavBar';

import TicketOptions from './containers/TicketOptions';
import StoreMerch from './containers/StoreMerch';
import StorePoints from './containers/StorePoints';
import PolicyTermsConditions from './containers/PolicyTermsConditions';
import PolicyCookies from './containers/PolicyCookies';
import PolicyPrivacy from './containers/PolicyPrivacy';
import OrderConfirmation from './containers/OrderConfirmation';

class App extends Component {
  constructor(props) {
    super(props);
    this.initAnalaytics();
  }

  initAnalaytics = () => {
    if (process.env.NODE_ENV === 'development') {
      mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN_DEV);
    } else {
      this.initGoogleAnalytics(process.env.REACT_APP_GOOGLE_ANALYTICS_TOKEN);
      mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN_PROD);
    }
  };

  initGoogleAnalytics = token => {
    ReactGA.initialize(token);
    ReactGA.pageview(window.location.pathname + window.location.search);
  };

  render() {
    return (
      // TODO - STRIPE PROVIDER API KEY XX
      <StripeProvider apiKey="null">
        <BrowserRouter>
          <div>
            <NavBar />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/auth" component={Auth} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/confirmation" component={OrderConfirmation} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/eventSales" component={EventSales} />
              <Route path="/top" component={Leaderboard} />
              <Route path="/sales" component={Sales} />
              <Route path="/sales-total-admin" component={SalesTotalAdmin} />
              <Route path="/schedule" component={Schedule} />
              <Route path="/options" component={TicketOptions} />
              <Route path="/termsConditions" component={PolicyTermsConditions} />
              <Route path="/get-points" component={StorePoints} />
              <Route path="/get-merch" component={StoreMerch} />
              <Route path="/privacyPolicy" component={PolicyPrivacy} />
              <Route path="/cookiesPolicy" component={PolicyCookies} />
              <Route path="/contactus" component={ContactUs} />
            </Switch>
          </div>
        </BrowserRouter>
      </StripeProvider>
    );
  }
}

export default App;
