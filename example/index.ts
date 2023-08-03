import Client, { RemoveMultilineComment } from '../src'

const schema = /* GraphQL */ `
    interface B {
        B: String!
    }

    interface C {
        C: String!
    }

    """
    Hello World
    """
    type A implements B, C {
        # Here
        hello: String! @possibleTypes(concreteTypes: ["EnterpriseAdministratorInvitation"])
        # There
        world: String!
    }

    """
    Hello World
    """
    type D {
        hello: String!
    }

    type E {
        hello: String!
    }

    type Query {
        getHello(id: String!, e: E!): A!
    }
`

const client = new Client<typeof schema>('::1')

// const result = await client.$({
//     query: {
//         __typename: true,
//         hi: {
//             hello: true
//         }
//     }
// })
