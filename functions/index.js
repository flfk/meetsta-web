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

exports.parentInfoEmail = functions.firestore.document('emails/{emails}').onCreate(snap => {
  const emailRequest = snap.data();

  const msg = {
    to: emailRequest.email,
    from: 'contact.meetsta@gmail.com',
    templateId: 'd-7d252bc894324c598329e60393e7c6cb',
    dynamic_template_data: {
      nameFirst: emailRequest.nameFirst,
      influencerName: emailRequest.influencerName,
      eventURL: emailRequest.eventURL
    }
  };

  return sgMail
    .send(msg)
    .then(() => console.log('Parent email sent'))
    .catch(error => {
      console.error(error.toString());
    });
});
