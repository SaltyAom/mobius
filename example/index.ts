import Client, { RemoveComment, RemoveMultiLineComment } from '../src'

const schema = /* GraphQL */ `
    directive @deprecated(
        reason: String = "No longer supported"
    ) on FIELD_DEFINITION | ARGUMENT_DEFINITION | INPUT_FIELD_DEFINITION | ENUM_VALUE

    directive @deprecated(
        reason: String = "No longer supported"
    ) on FIELD_DEFINITION | ARGUMENT_DEFINITION | INPUT_FIELD_DEFINITION | ENUM_VALUE

    type A {
        hello: String!
    }

    type B {
        hello: String!
    }

    union AB = A | B

    type C {
        hello: String!
    }

    type D {
        hello: String!
    }

    type Query {
        Hi(A: String!, W: String!): D!
    }
`

type A = RemoveComment<typeof schema>

const client = new Client<typeof schema>('::1')

client.query({
    query: {
        Hi: {
            select: {
                hello: true
            },
            where: {
                A: 'Hello',
                W: 'A'
            }
        }
    }
})

// const result = await client.$({
//     query: {
//         __typename: true,
//         hi: {
//             hello: true
//         }
//     }
// })
