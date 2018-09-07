const admin = require('firebase-admin');
const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');
const moment = require('moment-timezone');

admin.initializeApp(functions.config().firebase);

const SENDGRID_API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(SENDGRID_API_KEY);

exports.orderConfirmationEmail = functions.firestore
  .document('tickets/{ticketID}')
  .onCreate(snap => {
    const ticket = snap.data();

    const startTimeFormatted = `${moment
      .tz(ticket.startTime, 'America/Los_Angeles')
      .format('H:mm a, dddd, MMM Do')} PDT`;

    const msg = {
      to: ticket.purchaseEmail,
      from: 'contact.meetsta@gmail.com',
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      templateId: 'd-9151449bb4e4476eb06436f9574a0a01',
      dynamic_template_data: {
        orderNum: ticket.orderNum,
        eventTitle: ticket.eventTitle,
        ticketName: ticket.name,
        startTime: startTimeFormatted,
        purchaseNameFirst: ticket.purchaseNameFirst,
        influencerName: ticket.influencerName
      }
    };

    return sgMail
      .send(msg)
      .then(() => console.log('email sent'))
      .catch(error => {
        console.error(error.toString());
      });
  });
