import Client from '../src'

const schema = /* GraphQL */ `
    directive @requiredCapabilities(
    requiredCapabilities: [String!]
    ) {}

    interface B {
        B: String!
    }

    interface C {
        C: String!
    }

    type D {
        hello: String!
    }

    type A implements B, C {
        hello: String!
        world: String!
    }
`

const client = new Client<typeof schema>('::1')

client.mobius.A

// const result = await client.$({
//     query: {
//         __typename: true,
//         hi: {
//             hello: true
//         }
//     }
// })
