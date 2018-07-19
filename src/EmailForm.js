import React, { Component } from 'react';
import styled from 'styled-components';

class EmailForm extends Component {
  constructor() {
    super();
    this.state = {
      emailFormText: "",
    };
  }

  handleTextChange = (event) => {
    const input = event.target.value;
    console.log(input);
    this.setState({ emailFormText: input });
  }

  render() {
    return (
        <Container>
          <Textfield
            type="text"
            value={this.state.emailFormText}
            placeholder="Enter email address"
            onChange={this.handleTextChange}
          />
          <BtnSubmit>Get Early Access</BtnSubmit>
        </Container>
    );
  }
}

const Container = styled.div`
  // margin-top: 42px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Textfield = styled.input`
  height: 48px;
  width: 464px;
  background-color: white;
  border-radius: 5px;
  margin-right: 4px;

  border: 1px solid white;

  font-size: 24px;

  ::placeholder: {
    color: black;
    opacity: 0.54;
    font-weight: normal;
  }

`;

const BtnSubmit = styled.button`
  background-color: #FF595E;
  border: none;
  color: white;
  height: 48px;
  width: 312px;
  border-radius: 5px;

  font-size: 24px;
  font-weight: bold;

  :focus {
    outline: none;
  }

  :hover {
    background-color: #FF7175;
  }


`;

export default EmailForm;
