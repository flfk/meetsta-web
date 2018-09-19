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
      .then(() => console.log('Order confirmation email sent'))
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
