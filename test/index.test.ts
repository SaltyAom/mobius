import { Elysia } from 'elysia'

import { describe, expect, it } from 'bun:test'

import { yoga } from '../src'

const req = (path: string) => new Request(`http://localhost${path}`)

const app = new Elysia().use(
    yoga({
        typeDefs: /* GraphQL */ `
            type Query {
                hi: String
            }
        `,
        resolvers: {
            Query: {
                hi: () => 'Hi from Elysia'
            }
        }
    })
)

describe('GraphQL Yoga', () => {
    it('handle GraphQL playground ', async () => {
        const res = await app.handle(req('/graphql?query=%7B%0A++hi%0A%7D'))
        const text = await res.text()

        expect(text).toBe(JSON.stringify({ data: { hi: 'Hi from Elysia' } }))
        expect(res.headers.get('Content-Type')).toBe(
            'application/json; charset=utf-8'
        )
    })

    it('handle GraphQL query', async () => {
        const body = JSON.stringify({ extensions: {}, query: '{\n  hi\n}' })

        const res = await app.handle(
            new Request('http://localhost/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': body.length.toString()
                },
                body
            })
        )
        const text = await res.text()
        expect(text).toBe(JSON.stringify({ data: { hi: 'Hi from Elysia' } }))

        expect(text).toBe(JSON.stringify({ data: { hi: 'Hi from Elysia' } }))
        expect(res.headers.get('Content-Type')).toBe(
            'application/json; charset=utf-8'
        )
    })
})
