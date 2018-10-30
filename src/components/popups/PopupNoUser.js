import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import actions from '../../data/actions';
import Btn from '../Btn';
import Content from '../Content';
import Fonts from '../../utils/Fonts';
import InputText from '../InputText';
import Popup from './Popup';
import Wrapper from '../Wrapper';

const propTypes = {
  influencerName: PropTypes.string.isRequired,
  influencerUsername: PropTypes.string.isRequired,
};

const defaultProps = {};

class PopupNoUser extends React.Component {
  state = {
    teaserImgURL: '',
    username: '',
    usernameErrMsg: '',
  };

  componentDidMount() {
    this.loadTeaserImg();
  }

  handleChangeUsername = event => this.setState({ username: event.target.value });

  loadTeaserImg = async () => {
    const { influencerUsername } = this.props;
    const teaserImgURL = await actions.fetchDashboardTeaserImgURL(influencerUsername);
    this.setState({ teaserImgURL });
  };

  render() {
    const { teaserImgURL } = this.state;

    const { influencerName, username, usernameErrMsg } = this.props;

    return (
      <div>
        <Popup.BackgroundLight />
        <Popup.CardTransparent>
          <Fonts.H1 centered>
            Find out if you're in {influencerName}
            's most actives
          </Fonts.H1>
          <Wrapper.EventImage>
            <img src={teaserImgURL} alt={influencerName} />
          </Wrapper.EventImage>
          <InputText
            onChange={this.handleChangeUsername}
            errMsg={usernameErrMsg}
            value={username}
            placeholder="@YourInstagramUsername"
          />
          <Btn primary fill>
            Show Me
          </Btn>
          <Content />
        </Popup.CardTransparent>
      </div>
    );
  }
}

PopupNoUser.propTypes = propTypes;
PopupNoUser.defaultProps = defaultProps;

export default PopupNoUser;
