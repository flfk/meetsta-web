import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { StripeProvider } from 'react-stripe-elements';

import Checkout from './containers/Checkout';
import Events from './containers/Events';
import Main from './components/Main';
import NavBar from './containers/NavBar';

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
                <Route exact path="/" component={Events} />
                <Route path="/event" component={Events} />
                <Route path="/checkout" component={Checkout} />
              </Switch>
            </Main>
          </div>
        </BrowserRouter>
      </StripeProvider>
    );
  }
}

export default App;
