// import PropTypes from 'prop-types';
import React from 'react';
import qs from 'qs';
import moment from 'moment-timezone';

import Btn from '../components/Btn';
import Content from '../components/Content';
import FONTS from '../utils/Fonts';
import InputText from '../components/InputText';
import PopupTime from '../components/popups/PopupTime';

// import db from '../data/firebase';
import actions from '../data/actions';

const URL_APPEARIN_IPHONE =
  'https://itunes.apple.com/au/app/appear-in-video-meetings/id878583078?mt=8';
// const URL_APPEARIN_ANDROID = 'https://play.google.com/store/apps/details?id=appear.in.app&hl=en';
const CONTACT_EMAIL = 'contact.meetsta@gmail.com';
const CONTACT_INSTAGRAM = 'https://www.instagram.com/meetsta.app/';

// const propTypes = {};

// const defaultProps = {};

class OrderConfirmation extends React.Component {
  state = {
    ticketID: null,
    eventID: null,
    startTimeFormatted: '',
    hasSubmittedInsta: false,
    hasCheckedLocalTime: false,
    hasDownloadedApp: false,
    dateStart: 0,
    dateEnd: 0,
    ticket: {
      eventID: '',
      name: '',
      description: '',
      purchasePrice: null,
      purchaseFees: null,
      purchaseNameFirst: '',
      purchaseNameLast: '',
      purchaseEmail: '',
      instaHandle: '',
      location: '',
      timeLocalised: '',
      mobileOS: '',
      purchaseDate: null,
      orderNum: '',
      payPalPaymentID: '',
      userID: '',
      hasStarted: false,
      dateStart: ''
    },
    showTimePopup: false
  };

  componentDidMount() {
    try {
      this.loadFormattedData();
    } catch (error) {
      console.error('Error loading data', error);
    }
  }

  getOrderId = () => {
    const params = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    return params.ticketID;
  };

  loadFormattedData = async () => {
    const ticketID = this.getOrderId();
    const ticket = await actions.getDocTicket(ticketID);
    // const startTimeFormatted = this.formatStartTime(ticket.startTime);
    const event = await actions.getDocEvent(ticket.eventID);
    const { dateStart, dateEnd } = event;
    const hasSubmittedInsta = ticket.instaHandle ? true : false;
    const hasCheckedLocalTime = ticket.timeLocalised ? true : false;
    const hasDownloadedApp = ticket.mobileOS ? true : false;
    this.setState({
      dateStart,
      dateEnd,
      ticket: { ...ticket },
      // startTimeFormatted,
      hasSubmittedInsta,
      hasCheckedLocalTime,
      hasDownloadedApp
      // dateStart: ticket.startTime
    });
  };

  formatStartTime = startTime => {
    const time = moment.tz(startTime, 'America/Los_Angeles').format('H:mm a, dddd, MMM Do');
    return `${time} Pacific Daylight Time`;
  };

  handleTimePopupOpen = () => this.setState({ showTimePopup: true });

  handleTimePopupClose = () => this.setState({ showTimePopup: false });

  // updateInstaHandle = async instaHandle => {
  //   const ticketID = this.getOrderId();
  //   const ticketRef = db.collection('tickets').doc(ticketID);
  //   const updateInstaHandle = ticketRef.update({ instaHandle });
  // };

  handleChangeInstaHandle = event => {
    const { ticket } = this.state;
    const ticketUpdated = { ...ticket, instaHandle: event.target.value };
    this.setState({ ticket: ticketUpdated });
  };

  handleInstaSubmit = () => {
    const ticketID = this.getOrderId();
    const { ticket } = this.state;
    const { instaHandle } = ticket;
    if (instaHandle) {
      const ticketUpdated = { ...ticket, instaHandle };
      actions.updateDocTicket(ticketID, ticketUpdated);
      this.setState({ hasSubmittedInsta: true });
    }
  };

  handleLocalTimeSubmit = (location, dateStartLocalised, dateEndLocalised) => {
    const timeStart = moment.tz(dateStartLocalised, 'UTC').format('H:mm');
    const timeEnd = moment.tz(dateEndLocalised, 'UTC').format('H:mm a, dddd, MMM Do');
    const timeLocalised = `${timeStart} - ${timeEnd}`;
    console.log(timeLocalised);

    const ticketID = this.getOrderId();
    const { ticket } = this.state;
    const ticketUpdated = { ...ticket, location, timeLocalised };
    actions.updateDocTicket(ticketID, ticketUpdated);
    this.setState({ ticket: ticketUpdated, hasCheckedLocalTime: true });
  };

  handleAppDownload = event => {
    const ticketID = this.getOrderId();
    const { ticket } = this.state;
    const linkClicked = event.target.href;
    const mobileOS = linkClicked === URL_APPEARIN_IPHONE ? 'iPhone' : 'Android';
    const ticketUpdated = { ...ticket, mobileOS };
    actions.updateDocTicket(ticketID, ticketUpdated);
    this.setState({ ticket: ticketUpdated, hasDownloadedApp: true });
  };

  handleEditInsta = () => {
    this.setState({ hasSubmittedInsta: false });
  };

  handleEditTime = () => {
    this.setState({ hasCheckedLocalTime: false });
  };

  handleEditAppDownload = () => {
    this.setState({ hasDownloadedApp: false });
  };

  render() {
    const {
      ticket,
      showTimePopup,
      dateStart,
      dateEnd,
      hasSubmittedInsta,
      hasCheckedLocalTime,
      hasDownloadedApp
    } = this.state;

    const timePopup = showTimePopup ? (
      <PopupTime
        handleClose={this.handleTimePopupClose}
        dateStart={dateStart}
        dateEnd={dateEnd}
        fromConfirmation
        handleLocalTimeSubmit={this.handleLocalTimeSubmit}
      />
    ) : null;

    const instaForm = (
      <div>
        <InputText
          placeholder="@example.handle"
          value={ticket.instaHandle}
          onChange={this.handleChangeInstaHandle}
        />
        <Btn primary fill="true" onClick={this.handleInstaSubmit}>
          Submit
        </Btn>
      </div>
    );

    const instaSubmitted = (
      <div>
        <FONTS.P>
          <strong>
            <span role="img" aria-label="Tick">
              ✅
            </span>{' '}
            {ticket.instaHandle}
            <Btn.Tertiary onClick={this.handleEditInsta}>Edit</Btn.Tertiary>
          </strong>
        </FONTS.P>
      </div>
    );

    const instaSubmit = hasSubmittedInsta ? instaSubmitted : instaForm;

    const { addOns } = ticket;
    let addOnNames = <div />;
    if (addOns) {
      addOnNames = addOns.map(addOn => (
        <div key={addOn}>
          <FONTS.P>
            <strong>1 x {addOn}</strong>
          </FONTS.P>
        </div>
      ));
    }

    const timeBtn = (
      <Btn primary fill="true" onClick={this.handleTimePopupOpen}>
        Check My Time
      </Btn>
    );

    const timeChecked = (
      <div>
        <FONTS.P>
          <strong>
            <span role="img" aria-label="Tick">
              ✅
            </span>{' '}
            {ticket.timeLocalised} for {ticket.location}.
            <Btn.Tertiary onClick={this.handleTimePopupOpen}>Edit</Btn.Tertiary>
          </strong>
        </FONTS.P>
      </div>
    );

    const checkStartTime = hasCheckedLocalTime ? timeChecked : timeBtn;

    const downloadBtns = (
      <div>
        <Content.Row>
          <FONTS.A href={URL_APPEARIN_IPHONE} target="_blank" onClick={this.handleAppDownload}>
            I Will Use An iPhone
          </FONTS.A>
        </Content.Row>
        <br />
        <Content.Row>
          <FONTS.A onClick={this.handleAppDownload}>I Will Use An Android</FONTS.A>
        </Content.Row>
      </div>
    );

    const appDownloadedTxt =
      ticket.mobileOS === 'iPhone'
        ? 'I downloaded the iPhone app.'
        : 'No need to download anything - turns out Android phones are smarter than iPhones.';

    const appDownloaded = (
      <div>
        <FONTS.P>
          <strong>
            <span role="img" aria-label="Tick">
              ✅
            </span>{' '}
            {appDownloadedTxt}
            <Btn.Tertiary onClick={this.handleEditAppDownload}>Edit</Btn.Tertiary>
          </strong>
        </FONTS.P>
      </div>
    );

    const downloadApp = hasDownloadedApp ? appDownloaded : downloadBtns;

    const confirmationTitle =
      hasSubmittedInsta && hasCheckedLocalTime && hasDownloadedApp ? (
        <FONTS.H1>
          <span role="img" aria-label="Clapping">
            👏
          </span>{' '}
          You're ready to meet {ticket.influencerName}!
        </FONTS.H1>
      ) : (
        <FONTS.H1>
          <span role="img" aria-label="Clapping">
            👏
          </span>{' '}
          You're almost ready to meet {ticket.influencerName}!
        </FONTS.H1>
      );
    const stepsTitle =
      hasSubmittedInsta && hasCheckedLocalTime && hasDownloadedApp ? (
        <FONTS.H1>
          <span role="img" aria-label="Tick">
            ✅
          </span>{' '}
          All steps completed!
        </FONTS.H1>
      ) : (
        <FONTS.H1>Complete all 3 steps to confirm your spot</FONTS.H1>
      );

    const confirmationTickets = (
      <div>
        {confirmationTitle}
        <FONTS.P>
          You ordered <br />
          <strong>1 x {ticket.name}</strong>
        </FONTS.P>
        {addOnNames}
        <br />
        <FONTS.P>
          A confirmation email has been sent to <strong>{ticket.purchaseEmail}</strong>.
        </FONTS.P>{' '}
        <br />
        <FONTS.P>
          Order confirmation <strong>#{ticket.orderNum}</strong>.
        </FONTS.P>{' '}
        <br />
        <Content.Seperator />
        {stepsTitle}
        <FONTS.H2>1. Send us the attendee's Instagram name</FONTS.H2>
        <FONTS.P>We will use this to send you the link for the video call on the day.</FONTS.P>
        {instaSubmit}
        <FONTS.H2>2. Check when the event is</FONTS.H2>
        <FONTS.P>
          {' '}
          We will send a message to your instagram when the event starts and the event queue is
          open. <br /> <br />
          You can join the event queue up to 15 minutes before the event starts to get your spot
          early by replying to our message!
        </FONTS.P>
        <br />
        {checkStartTime}
        <FONTS.H2>3. Download the video call app</FONTS.H2>
        {downloadApp}
        <Content.Seperator />
      </div>
    );

    const confirmationSouvenirs = (
      <div>
        <FONTS.H1>
          {' '}
          <span role="img" aria-label="Clapping">
            👏
          </span>{' '}
          Your souvenirs are on their way!
        </FONTS.H1>
        {addOnNames}
        <br />
        <FONTS.P>
          We will email you your souvenirs within <strong>the next 7 days.</strong>
        </FONTS.P>
        <br />
        <br />
        <FONTS.P>
          Your order confirmation number is <strong>{ticket.orderNum}.</strong>
        </FONTS.P>
        <br />
      </div>
    );

    const confirmation = ticket.lengthMins === 0 ? confirmationSouvenirs : confirmationTickets;

    return (
      <Content>
        {confirmation}
        <FONTS.H1>Any questions? We're here to help!</FONTS.H1>
        <FONTS.P>
          Send us en email at <FONTS.A href={`mailto: ${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</FONTS.A>
        </FONTS.P>
        <br />
        <FONTS.P>
          Or message us on Instagram at{' '}
          <FONTS.A href={CONTACT_INSTAGRAM}>{CONTACT_INSTAGRAM}</FONTS.A>
        </FONTS.P>
        <Content.Spacing />
        {timePopup}
      </Content>
    );
  }
}

// OrderConfirmation.propTypes = propTypes;
// OrderConfirmation.defaultProps = defaultProps;

export default OrderConfirmation;
