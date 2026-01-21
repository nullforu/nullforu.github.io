'use strict'

const crypto = require('crypto')

function parseBody(event) {
    if (!event || !event.body) return {}
    try {
        if (event.isBase64Encoded) {
            const decoded = Buffer.from(event.body, 'base64').toString('utf-8')
            return JSON.parse(decoded)
        }
        return JSON.parse(event.body)
    } catch {
        return null
    }
}

function nowIso() {
    return new Date().toISOString()
}

function makeId() {
    return crypto.randomUUID()
}

function validateAnonPassword(password) {
    if (!password) return { ok: false, message: 'password is required' }
    if (password.length < 6) return { ok: false, message: 'password too short (min 6)' }
    if (password.length > 64) return { ok: false, message: 'password too long (max 64)' }
    return { ok: true, password }
}

function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.scryptSync(password, salt, 64).toString('hex')
    return { salt, hash }
}

function verifyPassword(password, salt, hash) {
    if (!salt || !hash) return false
    const derived = crypto.scryptSync(password, salt, 64).toString('hex')
    const a = Buffer.from(hash, 'hex')
    const b = Buffer.from(derived, 'hex')
    if (a.length !== b.length) return false
    return crypto.timingSafeEqual(a, b)
}

function isUuid(value) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
}

function validatePostInput(body) {
    const title = (body.title || '').trim()
    const content = (body.content || '').trim()

    if (!title) return { ok: false, message: 'title is required' }
    if (!content) return { ok: false, message: 'content is required' }
    if (title.length > 200) return { ok: false, message: 'title too long (max 200)' }
    if (content.length > 20000) return { ok: false, message: 'content too long (max 20000)' }

    const anonymousName = (body.anonymousName || '').trim()
    if (anonymousName.length > 50) return { ok: false, message: 'anonymousName too long (max 50)' }

    return { ok: true, title, content, anonymousName: anonymousName || null }
}

module.exports = {
    parseBody,
    nowIso,
    makeId,
    validateAnonPassword,
    hashPassword,
    verifyPassword,
    isUuid,
    validatePostInput,
}
