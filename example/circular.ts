import { Mobius } from '../src'

const typeDefs = /* GraphQL */ `
    type Comment {
        user: User
        comment: String!
        id: ID!
    }

    type User {
        id: ID!
        comments: [Comment]
    }

    fragment A on User {
        id
    }

    type Query {
        getUser(id: ID!): User
    }
`

const mobius = new Mobius<typeof typeDefs>()

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
