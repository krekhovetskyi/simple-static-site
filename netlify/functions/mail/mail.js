const sendgridMail = require('@sendgrid/mail');

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async function sendMail(event) {

  const {
    name,
    email,
    message
  } = JSON.parse(event.body);

  const {
    EMAIL_TO,
    EMAIL_FROM
  } = process.env;

  const emailMessage = {
    to: EMAIL_TO,
    from: EMAIL_FROM,
    subject: `Contact Message from user ${email}`,
    html: `
    <strong>name</strong>: ${name}</br>,
    <strong>email</strong>: ${email}</br>,
    <strong>message</strong>:</br>
    <p>${message}</p>
    `
  };

  console.log(emailMessage);

  try {
    await sendgridMail.send(emailMessage);
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
