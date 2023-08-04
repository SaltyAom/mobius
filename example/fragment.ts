import { Mobius } from '../src'

const typeDefs = /* GraphQL */ `
    interface A {
        A: String!
        B: String!
        C: String!
        D: String!
    }

    fragment APart on A {
        A
        B
    }

    type Query {
        GetA: A!
    }
`

const mobius = new Mobius({
    typeDefs
})

const { APart } = mobius.fragments!

const a = await mobius.query({
    GetA: {
        ...APart,
        C: true
    }
})

const response = await a.result
