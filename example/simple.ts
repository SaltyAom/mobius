import { Mobius } from '../src'

const typeDefs = /* GraphQL */ `
    # Hello World
    type A {
        A: String!
        B: String!
    }

    # Hello World
    type Query {
        Hello(word: String!): A!
    }
`

const mobius = new Mobius<typeof typeDefs>()

const { result } = mobius.query({
    Hello: {
        where: {
            word: 'Hi'
        },
        select: {
            A: true
        }
    }
})

const response = await result
response?.Hello.A
