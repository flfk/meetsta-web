import PropTypes from 'prop-types';
import React from 'react';
import qs from 'qs';
import { Redirect } from 'react-router-dom';

import Btn from '../components/Btn';
import Content from '../components/Content';
import EVENT_IMAGE_MACKENZIE from '../assets/eventImages/EventImageMackenzieSol.jpg';
import FONTS from '../utils/Fonts';
import InputText from '../components/InputText';
import Wrapper from '../components/Wrapper';

import db from '../data/firebase';

const propTypes = {};

const defaultProps = {};

const DEFAULT_EVENT_ID = 'cookie-cutters';

class Register extends React.Component {
  state = {
    eventID: '',
    title: '',
    description: '',
    influencerName: '',
    dateStart: null,
    dateEnd: null
  };

  componentDidMount() {
    try {
      this.setFormattedData();
    } catch (err) {
      console.error('Error in getting documents', err);
    }
  }

  getEventId = () => {
    const params = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    let { eventID } = params;
    if (!eventID) {
      eventID = DEFAULT_EVENT_ID;
    }
    return eventID;
  };

  getEventData = async eventID => {
    try {
      const eventRef = db.collection('events').doc(eventID);
      const snapshot = await eventRef.get();
      const data = await snapshot.data();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  setFormattedData = async () => {
    const eventID = this.getEventId();

    try {
      const event = await this.getEventData(eventID);
      const formattedData = {
        eventID: eventID,
        title: event.title,
        description: event.description,
        influencerName: event.organiserName,
        dateStart: event.dateStart,
        dateEnd: event.dateEnd
      };
      this.setState({ eventID, ...formattedData });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { title, influencerName } = this.state;

    return (
      <Content>
        <FONTS.H1>{title}</FONTS.H1>
        <Wrapper.EventImage>
          <img src={EVENT_IMAGE_MACKENZIE} alt={influencerName} />
        </Wrapper.EventImage>
        <FONTS.H3>One on one video call. You can be anywhere. All you need is your phone.</FONTS.H3>

        <Content.Seperator />
        <FONTS.H2>Win a free ticket!</FONTS.H2>
        <InputText placeholder="Enter your email" />
        <Btn primary>Submit</Btn>
      </Content>
    );
  }
}

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;

export default Register;
