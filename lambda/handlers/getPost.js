'use strict'

const { ddb, GetCommand } = require('../lib/ddb')
const { json, badRequest, notFound, serverError } = require('../lib/http')

const TABLE_NAME = process.env.TABLE_NAME

exports.handler = async (event) => {
    try {
        if (event?.requestContext?.http?.method === 'OPTIONS') return json({ ok: true }, 200)

        const id = event.pathParameters?.id
        if (!id) return badRequest('Missing post id')

        const key = { pk: `POST#${id}`, sk: 'META' }
        const resp = await ddb.send(new GetCommand({ TableName: TABLE_NAME, Key: key }))
        if (!resp.Item) return notFound('Post not found')

        const it = resp.Item
        return json({
            ok: true,
            item: {
                id: it.postId,
                title: it.title,
                content: it.content,
                createdAt: it.createdAt,
                updatedAt: it.updatedAt,
                anonymousName: it.anonymousName || null,
            },
        })
    } catch (err) {
        console.error(err)
        return serverError()
    }
}
