import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class LandingPage extends Component {
  render() {
    return (
      <Redirect
        push
        to={{
          pathname: '/top100-jacksonfelt',
          search: ``
        }}
      />
    );

    // return <div>Meetsta Landing Page</div>;
  }
}

export default LandingPage;
