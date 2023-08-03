import { Mobius } from '../src'

const typeDefs = /* GraphQL */ `
    # Hello World
    type A {
        A: String!
        B: String!
    }

    type B {
        A: String!
        B: String!
    }

    # Hello World
    type Query {
        Hi(cdef: CDEF!): ABC!
        Hello(word: String!, again: D!): String!
    }
`

type Scalar = {
    Date: Date
}

const mobius = new Mobius<typeof typeDefs, Scalar>({
    typeDefs,
    fetch
})

mobius.mobius