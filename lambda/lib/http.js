'use strict'

function json(body, statusCode = 200, extraHeaders = {}) {
    return {
        statusCode,
        headers: {
            'content-type': 'application/json; charset=utf-8',
            'access-control-allow-origin': '*',
            'access-control-allow-headers': 'content-type',
            'access-control-allow-methods': 'GET,POST,PUT,DELETE,OPTIONS',
            ...extraHeaders,
        },
        body: JSON.stringify(body),
    }
}

function badRequest(message, details) {
    return json({ ok: false, message, details }, 400)
}

function forbidden(message = 'Forbidden') {
    return json({ ok: false, message }, 403)
}

function notFound(message = 'Not Found') {
    return json({ ok: false, message }, 404)
}

function serverError(message = 'Internal Server Error') {
    return json({ ok: false, message }, 500)
}

module.exports = { json, badRequest, forbidden, notFound, serverError }
