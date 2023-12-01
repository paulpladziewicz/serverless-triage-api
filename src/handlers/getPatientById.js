const dynamodb = require('aws-sdk/clients/dynamodb');

const docClient = new dynamodb.DocumentClient();
const tableName = process.env.PATIENT_TABLE;

exports.getPatientByIdHandler = async (event) => {
    if (event.httpMethod !== 'GET') {
      throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
    }

    const id = event.pathParameters.id;

    const params = {
      TableName : tableName,
      Key: { id: id }
    };
    const data = await docClient.get(params).promise();
    const item = data.Item;

    return {
      statusCode: 200,
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
}
