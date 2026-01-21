'use strict'

const { ddb, GetCommand, UpdateCommand } = require('../lib/ddb')
const { json, badRequest, forbidden, notFound, serverError } = require('../lib/http')
const { parseBody, validatePostInput, validateAnonPassword, nowIso, verifyPassword } = require('../lib/util')

const TABLE_NAME = process.env.TABLE_NAME

exports.handler = async (event) => {
    try {
        if (event?.requestContext?.http?.method === 'OPTIONS') return json({ ok: true }, 200)

        const id = event.pathParameters?.id
        if (!id) return badRequest('Missing post id')

        const body = parseBody(event)
        if (body === null) return badRequest('Invalid JSON body')

        const v = validatePostInput(body)
        if (!v.ok) return badRequest(v.message)

        const password = (body.password ?? '').toString().trim()
        const pv = validateAnonPassword(password)
        if (!pv.ok) return badRequest(pv.message)

        const key = { pk: `POST#${id}`, sk: 'META' }
        const existing = await ddb.send(new GetCommand({ TableName: TABLE_NAME, Key: key }))
        if (!existing.Item) return notFound('Post not found')
        if (!verifyPassword(password, existing.Item.passwordSalt, existing.Item.passwordHash)) {
            return forbidden('Invalid password')
        }

        const updatedAt = nowIso()
        await ddb.send(
            new UpdateCommand({
                TableName: TABLE_NAME,
                Key: key,
                UpdateExpression: 'SET #t = :t, #c = :c, #u = :u, #n = :n',
                ExpressionAttributeNames: { '#t': 'title', '#c': 'content', '#u': 'updatedAt', '#n': 'anonymousName' },
                ExpressionAttributeValues: { ':t': v.title, ':c': v.content, ':u': updatedAt, ':n': v.anonymousName },
            }),
        )

        return json({ ok: true, id, updatedAt })
    } catch (err) {
        console.error(err)
        return serverError()
    }
}
