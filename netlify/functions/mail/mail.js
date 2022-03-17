const sendgridMail = require('@sendgrid/mail');

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async function sendMail(event) {
  const {
    email,
    name,
    message
  } = event.queryStringParameters;

  const msg = {
    to: email,
    from: process.env.MAIL_FROM,
    subject: 'Contact Message from Website',
    text: `Message from ${name} with email ${email}: ${message}`,
    html: `Message from ${name} with email ${email}: ${message}`
  };

  console.log(msg);

  try {
    await sendgridMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);

      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*' // Required for CORS support to work
        },
        body: JSON.stringify({
          message: `Error: ${JSON.stringify(error.response.body)}`
        })
      };
    }
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*' // Required for CORS support to work
    },
    body: JSON.stringify({
      message: 'Success!'
    })
  };
};
