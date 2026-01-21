'use strict'

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const {
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    UpdateCommand,
    DeleteCommand,
    QueryCommand,
} = require('@aws-sdk/lib-dynamodb')

const client = new DynamoDBClient({})
const ddb = DynamoDBDocumentClient.from(client)

module.exports = { ddb, GetCommand, PutCommand, UpdateCommand, DeleteCommand, QueryCommand }
