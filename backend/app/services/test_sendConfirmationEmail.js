const sgMail = require('@sendgrid/mail');

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setApiKey('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');
// console.log(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'hanlei9876@gmail.com',
  // from: 'reciplytechnologies@gmail.com', // Use the email address or domain you verified
  from: 'leihan.email@gmail.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>'
};

// ES6
sgMail
    .send(msg)
    .then(
        () => {},
        (error) => {
          console.error(error);
          if (error.response) {
            console.error(error.response.body);
          }
        }
    );
