import { Mobius } from '../src'

const typeDefs = /* GraphQL */ `
    type A {
        A: String!
        B: String
        C: Int
    }

    type Query {
        hello: [A!]!
        hi(word: String!): A!
    }
`

const mobius = new Mobius<typeof typeDefs>()

const resolvers = {
    Query: {
        hello() {
            return [
                {
                    A: 'A',
                    c: 23
                }
            ]
        },
        hi(parent, { word }) {
            return {
                A: word,
                C: 123
            }
        }
    }
} satisfies typeof mobius.resolvers
