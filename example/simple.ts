import { Mobius, type CreateInnerMobius } from '../src'

const typeDefs = /* GraphQL */ `
    interface B {
        C: String!
        D: String!
        B: [B!]!
    }

    # Hello World
    type Query {
        Hello(word: String!): B!
    }
`

const mobius = new Mobius<typeof typeDefs>()

type B = {
    A: 'A!'
    B: 'B!'
}

mobius.klein?.Query

// const response = await result
// response?.Hello.A
