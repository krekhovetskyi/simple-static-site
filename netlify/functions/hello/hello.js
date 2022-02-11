exports.handler = async function (event, context) {
  console.log('Event:');
  console.log(event);
  console.log('Context:');
  console.log(context);

  return {
    statusCode: 200,
    body: JSON.stringify({message: 'Hello World'})
  };
};
