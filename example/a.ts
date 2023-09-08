import { Mobius, mobiusToGraphQL } from '../src'

const typeDefs = /* GraphQL */ `
    type Song {
        name: String!
        composer: Composer!
    }

    type Composer {
        name: String!
    }

    type Query {
        songs(composer: String!): String!
    }
`

const a = new Mobius<typeof typeDefs>({
    typeDefs,
    fetch(query) {
        console.log(query)
    }
})

// const b = await a.query({
//     songs: {
//         select: {
//             name: true
//         },
//         where: {
//             composer: 'a'
//         }
//     }
// })

console.log(
    a.query({
        songs: {
            select: true,
            where: {
                composer: 'a'
            }
        }
    })
)
