'use strict'

const { ddb, PutCommand } = require('../lib/ddb')
const { json, badRequest, serverError } = require('../lib/http')
const { parseBody, validatePostInput, makeId, nowIso, validateAnonPassword, hashPassword } = require('../lib/util')

const TABLE_NAME = process.env.TABLE_NAME

exports.handler = async (event) => {
    try {
        if (event?.requestContext?.http?.method === 'OPTIONS') return json({ ok: true }, 200)

        const body = parseBody(event)
        if (body === null) return badRequest('Invalid JSON body')

        const v = validatePostInput(body)
        if (!v.ok) return badRequest(v.message)

        const password = (body.password ?? '').toString().trim()
        const pv = validateAnonPassword(password)
        if (!pv.ok) return badRequest(pv.message)

        const id = makeId()
        const createdAt = nowIso()
        const { salt, hash } = hashPassword(password)

        const item = {
            pk: `POST#${id}`,
            sk: 'META',
            postId: id,
            title: v.title,
            content: v.content,
            createdAt,
            updatedAt: createdAt,
            anonymousName: v.anonymousName,
            passwordHash: hash,
            passwordSalt: salt,
            gsi1pk: 'POSTS',
            gsi1sk: `${createdAt}#${id}`,
        }

        await ddb.send(
            new PutCommand({
                TableName: TABLE_NAME,
                Item: item,
                ConditionExpression: 'attribute_not_exists(pk)',
            }),
        )

        return json({ ok: true, id, createdAt }, 201)
    } catch (err) {
        console.error(err)
        return serverError()
    }
}
