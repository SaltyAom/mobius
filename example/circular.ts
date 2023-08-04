import { Mobius, ResolveType, mobiusToGraphQL } from '../src'

const typeDefs = /* GraphQL */ `
    type Comment {
        A: A
        user: User
        comment: String!
        id: ID!
    }

    type User {
        comments: [Comment!]!
        id: ID!
    }

    enum A {
        A
        B
        C
    }

    type Query {
        H(a: String, b: String): String!
    }
`

const client = new Mobius<typeof typeDefs>()

const defs = client.mobius!
