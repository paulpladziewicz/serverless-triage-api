const dynamodb = require('aws-sdk/clients/dynamodb');

const docClient = new dynamodb.DocumentClient();
const tableName = process.env.PATIENT_TABLE;

exports.deletePatientHandler = async (event) => {
    if (event.httpMethod !== 'DELETE') {
      throw new Error(`deleteMethod only accepts DELETE method, you tried: ${event.httpMethod} method.`);
    }

    const id = event.pathParameters.id;

    const params = {
      TableName : tableName,
      Key: { id: id }
    };

    await docClient.delete(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'patient record successfully deleted'
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers" : "*",
        "Access-Control-Allow-Origin": "*"
      }
    };
};
