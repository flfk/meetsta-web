import React, { Component } from 'react';
import ReactGA from 'react-ga';
import styled from 'styled-components';

class EmailForm extends Component {
  constructor() {
    super();
    this.state = {
      emailFormText: '',
      betaRequested: false
    };
  }

  handleTextChange = event => {
    const input = event.target.value;
    this.setState({ emailFormText: input });
  };

  handleSubmit = event => {
    this.setState({ betaRequested: true });
    ReactGA.event({
      category: 'Beta requested',
      action: this.state.emailFormText
    });
  };

  render() {
    const btnSubmit = this.state.betaRequested ? (
      <BtnSubmitted>We'll be in touch!</BtnSubmitted>
    ) : (
      <BtnSubmit onClick={this.handleSubmit}>Get Early Access</BtnSubmit>
    );

    return (
      <Container>
        <Textfield
          type="text"
          value={this.state.emailFormText}
          placeholder="Enter email address"
          onChange={this.handleTextChange}
        />
        {btnSubmit}
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Textfield = styled.input`
  flex: 0 1 464px;
  padding: 1rem;
  background-color: white;
  border-radius: 5px;
  margin-right: 4px;

  border: none;
  outline: none;

  font-size: 20px;
  color: #495057;

  ::placeholder: {
    color: black;
    opacity: 0.54;
    font-weight: normal;
  }

  @media only screen and (max-width: 768px) {
    flex: 0 1 auto;
    // adjust for padding
    width: calc(100% - 2rem);
    margin-bottom: 4px;
    margin-right: 0px;
  }
`;

const BtnSubmit = styled.button`
  flex: 0 1 312px;

  background-color: #ff595e;
  border: none;
  color: white;
  padding: 1rem;
  border-radius: 5px;

  font-size: 20px;
  font-weight: bold;

  cursor: pointer;

  :focus {
    outline: none;
  }

  :hover {
    background-color: #ff7175;
  }

  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  @media only screen and (max-width: 768px) {
    flex: 0 1 auto;
    width: 100%;
  }
`;

const BtnSubmitted = BtnSubmit.extend`
  background-color: #ff7175;
`;

export default EmailForm;
