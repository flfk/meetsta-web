const admin = require('firebase-admin');
const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');

admin.initializeApp(functions.config().firebase);

const SENDGRID_API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(SENDGRID_API_KEY);

exports.firestoreOrderConfirmationEmail = functions.firestore
  .document('tickets/{ticketID}')
  .onCreate(snap => {
    const ticket = snap.data();

    // const msg = {
    //   to: 'felixlkramer@gmail.com',
    //   from: 'contact.meetsta@gmail.com',
    //   subject: 'Test Subject Line in Function',

    //   templateID: 'd-9151449bb4e4476eb06436f9574a0a01',
    //   substitutionWrappers: ['{{', '}}'],
    //   substitutions: {
    //     eventName: 'testEvent in Functions',
    //     purchaseNameFirst: 'FunctionsName'
    //   }
    // };

    // const msg = {
    //   to: 'felixlkramer',
    //   from: 'contact.meetsta@gmail.com',
    //   subject: 'Testing',

    //   // custom templates
    //   templateId: 'd-9151449bb4e4476eb06436f9574a0a01',
    //   substitutionWrappers: ['{{', '}}'],
    //   substitutions: {
    //     eventName: 'testEvent in Functions',
    //     purchaseNameFirst: 'FunctionsName'
    //   }
    // };

    const msg = {
      to: 'felixlkramer@gmail.com',
      from: 'contact.meetsta@gmail.com',
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>'
    };

    return sgMail.send(msg);
    // .then(() => console.log('email sent'))
    // .catch(err => console.error(err));
  });
