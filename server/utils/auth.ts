import { createHmac, timingSafeEqual } from 'node:crypto'
import type { H3Event } from 'h3'

export const AUTH_COOKIE = 'auth_token'
const MAX_AGE = 60 * 60 * 24 // 1 天

// 演示用的固定账号
export const DEMO_USER = { username: 'admin', password: '123456' }

function sign(payload: string, secret: string) {
  return createHmac('sha256', secret).update(payload).digest('base64url')
}

export function createToken(username: string, secret: string) {
  const payload = Buffer.from(JSON.stringify({ username, exp: Date.now() + MAX_AGE * 1000 })).toString('base64url')
  return `${payload}.${sign(payload, secret)}`
}

export function verifyToken(token: string | undefined, secret: string): { username: string } | null {
  if (!token) return null
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return null
  const expected = Buffer.from(sign(payload, secret))
  const actual = Buffer.from(signature)
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return data.exp > Date.now() ? { username: data.username } : null
  } catch {
    return null
  }
}

export function setAuthCookie(event: H3Event, token: string) {
  setCookie(event, AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: !import.meta.dev,
    path: '/',
    maxAge: MAX_AGE,
  })
}

export function getCurrentUser(event: H3Event) {
  return verifyToken(getCookie(event, AUTH_COOKIE), useRuntimeConfig(event).authSecret)
}
