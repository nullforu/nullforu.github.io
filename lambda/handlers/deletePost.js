'use strict'

const { ddb, GetCommand, DeleteCommand } = require('../lib/ddb')
const { json, badRequest, forbidden, notFound, serverError } = require('../lib/http')
const { parseBody, validateAnonPassword, verifyPassword } = require('../lib/util')

const TABLE_NAME = process.env.TABLE_NAME

exports.handler = async (event) => {
    try {
        if (event?.requestContext?.http?.method === 'OPTIONS') return json({ ok: true }, 200)

        const id = event.pathParameters?.id
        if (!id) return badRequest('Missing post id')

        const body = parseBody(event)
        if (body === null) return badRequest('Invalid JSON body')

        const password = (body.password ?? '').toString().trim()
        const pv = validateAnonPassword(password)
        if (!pv.ok) return badRequest(pv.message)

        const key = { pk: `POST#${id}`, sk: 'META' }
        const existing = await ddb.send(new GetCommand({ TableName: TABLE_NAME, Key: key }))
        if (!existing.Item) return notFound('Post not found')
        if (!verifyPassword(password, existing.Item.passwordSalt, existing.Item.passwordHash)) {
            return forbidden('Invalid password')
        }

        await ddb.send(new DeleteCommand({ TableName: TABLE_NAME, Key: key }))
        return json({ ok: true, id })
    } catch (err) {
        console.error(err)
        return serverError()
    }
}
