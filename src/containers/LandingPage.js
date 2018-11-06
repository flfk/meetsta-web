import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class LandingPage extends Component {
  render() {
    return (
      <Redirect
        push
        to={{
          pathname: '/dashboard',
          search: `?i=jon_klaasen`,
        }}
      />
    );

    // return <div>Meetsta Landing Page</div>;
  }
}

export default LandingPage;
