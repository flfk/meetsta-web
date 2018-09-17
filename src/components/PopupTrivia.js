import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Btn from './Btn';
import Content from './Content';
import FONTS from '../utils/Fonts';
import InputText from './InputText';
import Popup from './Popup';

const propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleComplete: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired
};

const defaultProps = {};

class PopupTrivia extends React.Component {
  state = {
    input: '',
    errMsg: '',
    isCorrect: false
  };

  handleChangeTrivia = event => {
    this.setState({ input: event.target.value });
  };

  handleSubmit = () => {
    const { input } = this.state;
    const { answer, handleComplete } = this.props;
    console.log('input is ', input);
    if (input) {
      if (input.toLowerCase() === answer.toLowerCase()) {
        handleComplete();
        this.setState({ isCorrect: true });
      } else {
        const errMsg = "Nope, that's not it. Try again!";
        this.setState({ errMsg: errMsg });
      }
    }
  };

  render() {
    const { input, errMsg, isCorrect } = this.state;

    const { handleClose, question } = this.props;

    const triviaForm = (
      <Content>
        <FONTS.H1>{question}</FONTS.H1>
        <InputText
          placeholder="Your answer"
          value={input}
          onChange={this.handleChangeTrivia}
          errMsg={errMsg}
        />
        <Btn primary onClick={this.handleSubmit}>
          Submit
        </Btn>
      </Content>
    );

    const triviaDone = (
      <Content>
        <FONTS.H1>
          <span role="img" aria-label="Tick">
            🎉
          </span>{' '}
          That's right!
        </FONTS.H1>
        <br />
        <Btn primary onClick={handleClose}>
          Close
        </Btn>
      </Content>
    );

    const triviaContent = isCorrect ? triviaDone : triviaForm;

    return (
      <div>
        <Popup.Background />
        <Popup.Card>
          <Popup.BtnClose handleClose={handleClose} />
          {triviaContent}
          <Content />
        </Popup.Card>
      </div>
    );
  }
}

PopupTrivia.propTypes = propTypes;
PopupTrivia.defaultProps = defaultProps;

export default PopupTrivia;
