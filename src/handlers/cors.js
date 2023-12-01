exports.corsHandler = async (event) => {
  if (event.httpMethod !== 'OPTIONS') {
    throw new Error(`function only accepts OPTIONS method, you tried: ${event.httpMethod}`);
  }
  console.info('received:', event);

  const response = {
    statusCode: 204,
    headers: {
      "Access-Control-Allow-Headers" : "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*"
    },
  };

  console.info(`response from: ${event.path} statusCode: ${response.statusCode}`);
  return response;
}
