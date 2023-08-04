import { Mobius } from '../src'

const typeDefs = /* GraphQL */ `
    type Comment {
        user: User
        user2: User
        comment: String!
        id: ID!
    }
`

const client = new Mobius<typeof typeDefs>()

const defs = client.mobius!

defs.__defer

type Prettify<T> = {
    [K in keyof T]: T[K]
} & {}

type A = {
    User: {
        comments: unknown
        id: string
    }
    Comment: {
        comment: string
        id: string
        user: unknown
    }
}

type Keys = ['User.comments.Comment', 'Comment.user.User']

type MapCircular<
    Keys extends string[],
    Known extends Record<string, Record<string, unknown>>
> = Keys extends [infer Key, ...infer Rest extends string[]]
    ? MapCircular<
          Rest,
          Key extends `${infer Model}.${infer Field}.${infer Type}`
              ? Known extends {
                    [model in Model]: infer _ extends {
                        [field in Field]: any
                    }
                }
                  ? Known extends { [type in Type]: infer Ref }
                      ? Prettify<
                            Omit<Omit<Known, Model>, Field> & {
                                [model in Model]: Prettify<
                                    Omit<Known[Model], Field> & {
                                        [field in Field]: Ref
                                    }
                                >
                            }
                        >
                      : Known
                  : Known
              : Known
      >
    : Known

type D = Prettify<MapCircular<Keys, MapCircular<Keys, A>>>

const a: D = '' as any

a.User.comments.user.comments.comment
