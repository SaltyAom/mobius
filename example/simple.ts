import { Mobius, type CreateInnerMobius } from '../src'

const typeDefs = /* GraphQL */ `
    interface B {
        C: String!
        D: String!
        B: [B!]!
    }

    # Hello World
    type Query {
        Hello(word: String!): [B]
    }
`

const mobius = new Mobius<typeof typeDefs>()

type B = {
    A: 'A!'
    B: 'B!'
}

mobius.klein?.Query

mobius.query({
    Hello: {
        select: {
            C: true
        },
        where: {
            word: 'A'
        }
    }
})

// const response = await result
// response?.Hello.A
