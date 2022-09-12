const { v4: uuidv4 } = require('uuid');

const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

const tableName = process.env.PATIENT_TABLE;

exports.createPatientHandler = async (event) => {
  if (event.httpMethod !== 'POST') {
    throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
  }
  console.info('received:', event);

  const body = JSON.parse(event.body);
  const id = uuidv4();
  const name = body.name;
  const dob = body.dob;
  const complaint = body.complaint;
  const priority = body.priority;
  const room = body.room;
  const stage = body.stage;

  const params = {
    TableName : tableName,
    Item: { id, name, dob, complaint, priority, room, stage}
  };

  const result = await docClient.put(params).promise();

  const response = {
    statusCode: 201,
    body: JSON.stringify({ id, name, dob, complaint, priority, room, stage}),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers" : "*",
      "Access-Control-Allow-Origin": "*"
    }
  };

  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
};
