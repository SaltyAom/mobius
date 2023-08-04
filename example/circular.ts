import { Mobius, ResolveType, mobiusToGraphQL } from '../src'

const typeDefs = /* GraphQL */ `
    type Comment {
        user: User
        comment: String!
        id: ID!
    }

    type User {
        id: ID!
        comments: [Comment!]!
    }

    type Query {
        getUser(id: ID!): User
    }
`

const mobius = new Mobius<typeof typeDefs>()

mobius.klein!.Query.getUser

const a = mobius.query({
    getUser: {
        where: {
            id: 'AWD'
        },
        select: {
            id: true,
            comments: {
                user: {
                    id: true,
                }
            }
        }
    }
})

a.result.then(x => x!.getUser)