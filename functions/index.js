const admin = require('firebase-admin');
const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');

admin.initializeApp(functions.config().firebase);

const SENDGRID_API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(SENDGRID_API_KEY);

exports.orderConfirmationEmail = functions.firestore
  .document('tickets/{ticketID}')
  .onCreate(snap => {
    const ticket = snap.data();

    const msg = {
      to: 'felixlkramer@gmail.com',
      from: 'contact.meetsta@gmail.com',
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      templateId: 'd-9151449bb4e4476eb06436f9574a0a01',
      dynamic_template_data: {
        orderNumber: '999999',
        eventName: 'Testing Templates',
        purchaseNameFirst: 'Some One',
        influencerName: 'Denver',
        timeSlot: '12:00',
        eventDay: '24th Dec 2018'
      }
    };

    return sgMail
      .send(msg)
      .then(() => console.log('email sent'))
      .catch(error => {
        console.error(error.toString());
      });
  });
