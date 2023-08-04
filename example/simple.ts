import { Mobius } from '../src'

const typeDefs = /* GraphQL */ `
    interface B {
        C: String!
        D: String!
    }

    fragment ABC on A {
        A
        B
    }

    # Hello World
    type A implements B {
        A: String!
        B: String!
    }

    # Hello World
    type Query {
        Hello(word: String!): A!
    }
`

const mobius = new Mobius<typeof typeDefs>()

mobius.klein!
mobius.klein!.Fragment.ABC

type B = {
    "A": "A!"
    "B": "B!"
}

type A = Pick<B, "B" | "A">

// const { result } = mobius.query({
//     Hello: {
//         where: {
//             word: 'Hi'
//         },
//         select: {
//             A: true
//         }
//     }
// })

// const response = await result
// response?.Hello.A
