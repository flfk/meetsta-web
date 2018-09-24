const admin = require('firebase-admin');
const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');
const moment = require('moment-timezone');

admin.initializeApp(functions.config().firebase);

const SENDGRID_API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(SENDGRID_API_KEY);

const REGISTRATION_BASE_URL = 'https://www.meetsta.com/countdown?id=';
const CHECKOUT_BASE_URL = 'https://www.meetsta.com/checkout-vip?eventID=';
const CONFIRMATION_URL_BASE = 'https://www.meetsta.com/confirmation?ticketID=';

exports.orderConfirmationEmail = functions.firestore
  .document('tickets/{ticketID}')
  .onCreate(snap => {
    const ticket = snap.data();
    const id = snap.id;

    const confirmationURL = CONFIRMATION_URL_BASE + id;

    let msg = {};

    // if lengthMins === 0, souvenirs only
    if (ticket.lengthMins === 0) {
      msg = {
        to: ticket.purchaseEmail,
        from: 'contact.meetsta@gmail.com',
        templateId: 'd-c66c2e0750b8487e894abcb067bbf624',
        dynamic_template_data: {
          orderNum: ticket.orderNum,
          ticketName: ticket.name,
          purchaseNameFirst: ticket.purchaseNameFirst,
          influencerName: ticket.influencerName,
          confirmationURL
        }
      };
    } else {
      const startTimeFormatted = `${moment
        .tz(ticket.startTime, 'America/Los_Angeles')
        .format('dddd, MMM Do')}`;

      msg = {
        to: ticket.purchaseEmail,
        from: 'contact.meetsta@gmail.com',
        templateId: 'd-9151449bb4e4476eb06436f9574a0a01',
        dynamic_template_data: {
          orderNum: ticket.orderNum,
          eventTitle: ticket.eventTitle,
          ticketName: ticket.name,
          startTime: startTimeFormatted,
          purchaseNameFirst: ticket.purchaseNameFirst,
          influencerName: ticket.influencerName,
          confirmationURL: confirmationURL
        }
      };
    }

    return sgMail
      .send(msg)
      .then(() => console.log('Order confirmation email sent'))
      .catch(error => {
        console.error(error.toString());
      });
  });

exports.registrationEmail = functions.firestore
  .document('registrations/{registration}')
  .onCreate(snap => {
    const registration = snap.data();
    const id = snap.id;

    const checkoutURL = CHECKOUT_BASE_URL + registration.eventID;
    const registrationURL = REGISTRATION_BASE_URL + id;

    const msg = {
      to: registration.email,
      from: 'contact.meetsta@gmail.com',
      templateId: 'd-83399d89bb4d4f0e96518a781a2e35c5',
      dynamic_template_data: {
        influencerName: registration.influencerName,
        checkoutURL: checkoutURL,
        registrationURL: registrationURL
      }
    };

    return sgMail
      .send(msg)
      .then(() => console.log('Registration email sent'))
      .catch(error => {
        console.error(error.toString());
      });
  });

exports.emailRequests = functions.firestore.document('emails/{emails}').onCreate(snap => {
  const emailRequest = snap.data();

  let msg = {};
  let type = 'No Type';

  if (emailRequest.type === 'parent') {
    type = 'parent';
    msg = {
      to: emailRequest.email,
      from: 'contact.meetsta@gmail.com',
      templateId: 'd-9151449bb4e4476eb06436f9574a0a01',
      dynamic_template_data: {
        nameFirst: emailRequest.nameFirst,
        influencerName: emailRequest.influencerName,
        eventURL: emailRequest.eventURL
      }
    };
  }

  if (emailRequest.type === 'invite') {
    type = 'invite';
    msg = {
      to: emailRequest.email,
      from: 'contact.meetsta@gmail.com',
      templateId: 'd-c94784d256ee4157bb28b62a937c2ec5',
      dynamic_template_data: {
        inviteeName: emailRequest.inviteeName,
        refereeName: emailRequest.refereeName,
        influencerName: emailRequest.influencerName,
        eventURL: emailRequest.eventURL,
        daysLeft: emailRequest.daysLeft
      }
    };
  }

  return sgMail
    .send(msg)
    .then(() => console.log(type, ' email sent'))
    .catch(error => {
      console.error(error.toString());
    });
});
