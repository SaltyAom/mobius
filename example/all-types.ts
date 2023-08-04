import { Mobius } from '../src'

const typeDefs = /* GraphQL */ `
    directive @deprecated(reason: String = "EOL") on FIELD_DEFINITION
    scalar Date

    interface A {
        A: String!
    }

    # Hello World
    fragment Frag on A {
        A
    }

    # Hello World
    enum CD {
        C
        D
    }

    # Hello World
    enum EF {
        # Hello World
        E
        # Hello World
        F
    }

    type B implements A {
        B: String!
    }

    type D {
        nested: String!
    }

    type C {
        C: String
        D: D!
    }

    union CDEF = CD | EF
    union ABC = B | C

    fragment ABCFrag on ABC {
        A
        B
    }

    type Query {
        Hi(cdef: CDEF!): ABC!
        Hello(word: String!, again: D!): String!
    }
`

type Scalar = {
    Date: Date
}

const mobius = new Mobius<typeof typeDefs, Scalar>()

export type T = (typeof mobius)['klein']

const { ABCFrag } = mobius.fragments!

const a = await mobius.query({
    Hi: {
        select: {
            ...ABCFrag,
            D: {
                nested: true
            }
        },
        where: {
            cdef: 'D'
        }
    }
})
