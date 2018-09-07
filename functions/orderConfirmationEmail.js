const orderConfirmationEmail = functions.firestore.document('tickets/{ticketID}').onCreate(snap => {
  const ticket = snap.data();

  const msg = {
    to: ticket.purchaseEmail,
    from: 'contact.meetsta@gmail.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    templateId: 'd-9151449bb4e4476eb06436f9574a0a01',
    dynamic_template_data: {
      orderNum: ticket.orderNum,
      eventName: 'Testing Templates',
      purchaseNameFirst: ticket.purchaseNameFirst,
      influencerName: 'testInfluencer',
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
