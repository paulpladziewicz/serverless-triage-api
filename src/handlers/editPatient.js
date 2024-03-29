const dynamodb = require('aws-sdk/clients/dynamodb');

const docClient = new dynamodb.DocumentClient();
const tableName = process.env.PATIENT_TABLE;

exports.editPatientHandler = async (event) => {
    if (event.httpMethod !== 'PUT') {
        throw new Error(`putMethod only accepts PUT method, you tried: ${event.httpMethod} method.`);
    }

    const body = JSON.parse(event.body);
    const id = body.id;
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

    await docClient.put(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'patient record successfully updated'
        }),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers" : "*",
            "Access-Control-Allow-Origin": "*"
        }
    };
};
