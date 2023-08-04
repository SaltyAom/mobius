import { expectTypeOf } from 'expect-type'

import { Mobius, type CreateMobius } from '../../src'

// ? Parse type
{
    const schema = /* GraphQL */ `
        type A {
            A: String!
            B: Int
        }
    `

    type R = CreateMobius<typeof schema>

    expectTypeOf<R>().toEqualTypeOf<{
        A: {
            A: string
            B: number | null
        }
        Query: {}
        Mutation: {}
        Subscription: {}
        Fragment: {}
    }>()
}

// ? Parse multiple types type
{
    const schema = /* GraphQL */ `
        type A {
            A: String!
            B: Int!
        }

        type B {
            A: String!
            B: String!
        }
    `

    type R = CreateMobius<typeof schema>

    expectTypeOf<R>().toEqualTypeOf<{
        A: {
            A: string
            B: number
        }
        B: {
            A: string
            B: string
        }
        Query: {}
        Mutation: {}
        Subscription: {}
        Fragment: {}
    }>()
}

// ? Parse comments
{
    const schema = /* GraphQL */ `
        """
        Multiline comment
        """
        type A {
            # World
            A: String!
            """
            Multiline comment
            """
            B: Int!
        }

        # World
        """
        Multiline comment
        """
        type B {
            A: String!
            """
            Multiline comment
            """
            B: String!
        }
    `

    type R = CreateMobius<typeof schema>

    expectTypeOf<R>().toEqualTypeOf<{
        A: {
            A: string
            B: number
        }
        B: {
            A: string
            B: string
        }
        Query: {}
        Mutation: {}
        Subscription: {}
        Fragment: {}
    }>()
}

// ? Parse Query
{
    const schema = /* GraphQL */ `
        type A {
            A: String!
            B: Int!
        }

        type B {
            A: String!
            B: String!
        }

        type Query {
            A: A!
            B: B!
        }
    `

    type R = CreateMobius<typeof schema>

    expectTypeOf<R>().toEqualTypeOf<{
        A: {
            A: string
            B: number
        }
        B: {
            A: string
            B: string
        }
        Query: {
            A: {
                A: string
                B: number
            }
            B: {
                A: string
                B: string
            }
        }
        Mutation: {}
        Subscription: {}
        Fragment: {}
    }>()
}

// ? Parse Query
{
    const schema = /* GraphQL */ `
        type A {
            A: String!
            B: Int!
        }

        type B {
            A: String!
            B: String!
        }

        type Query {
            A: A!
            B: B!
        }
    `

    type R = CreateMobius<typeof schema>

    expectTypeOf<R>().toEqualTypeOf<{
        A: {
            A: string
            B: number
        }
        B: {
            A: string
            B: string
        }
        Query: {
            A: {
                A: string
                B: number
            }
            B: {
                A: string
                B: string
            }
        }
        Mutation: {}
        Subscription: {}
        Fragment: {}
    }>()
}

// ? Parse params
{
    const schema = /* GraphQL */ `
        type A {
            A: String!
            B: Int!
        }

        type B {
            A: String!
            B: String!
        }

        type Query {
            A: A!
            B(A: A!, B: B!): B!
        }
    `

    type R = CreateMobius<typeof schema>

    expectTypeOf<R>().toEqualTypeOf<{
        A: {
            A: string
            B: number
        }
        B: {
            A: string
            B: string
        }
        Query: {
            A: {
                A: string
                B: number
            }
            B: (p: {
                A: {
                    A: string
                    B: number
                }
                B: {
                    A: string
                    B: string
                }
            }) => {
                A: string
                B: string
            }
        }
        Mutation: {}
        Subscription: {}
        Fragment: {}
    }>()
}

// ? Parse params with primitive type
{
    const schema = /* GraphQL */ `
        type A {
            A: String!
            B: Int!
        }

        type B {
            A: String!
            B: String!
        }

        type Query {
            A: A!
            B(name: String, A: A!): B!
        }
    `

    type R = CreateMobius<typeof schema>

    expectTypeOf<R>().toEqualTypeOf<{
        A: {
            A: string
            B: number
        }
        B: {
            A: string
            B: string
        }
        Query: {
            A: {
                A: string
                B: number
            }
            B: (p: {
                name?: string
                A: {
                    A: string
                    B: number
                }
            }) => {
                A: string
                B: string
            }
        }
        Mutation: {}
        Subscription: {}
        Fragment: {}
    }>()
}

// ? Parse optional params with primitive type
{
    const schema = /* GraphQL */ `
        type A {
            A: String!
            B: Int!
        }

        type B {
            A: String!
            B: String!
        }

        type Query {
            A: A!
            B(name: String = hello, A: A): B!
        }
    `

    type R = CreateMobius<typeof schema>

    expectTypeOf<R>().toEqualTypeOf<{
        A: {
            A: string
            B: number
        }
        B: {
            A: string
            B: string
        }
        Query: {
            A: {
                A: string
                B: number
            }
            B: (p?: {
                name?: string
                A?: {
                    A: string
                    B: number
                }
            }) => {
                A: string
                B: string
            }
        }
        Mutation: {}
        Subscription: {}
        Fragment: {}
    }>()
}
// ? Parse Mutation
{
    const schema = /* GraphQL */ `
        type A {
            A: String!
            B: Int!
        }

        type B {
            A: String!
            B: String!
        }

        type Query {
            A: A!
            B: B!
        }

        type Mutation {
            A: A!
            B: B!
        }
    `

    type R = CreateMobius<typeof schema>

    expectTypeOf<R>().toEqualTypeOf<{
        A: {
            A: string
            B: number
        }
        B: {
            A: string
            B: string
        }
        Query: {
            A: {
                A: string
                B: number
            }
            B: {
                A: string
                B: string
            }
        }
        Mutation: {
            A: {
                A: string
                B: number
            }
            B: {
                A: string
                B: string
            }
        }
        Subscription: {}
        Fragment: {}
    }>()
}

// ? Parse Scalar
{
    const schema = /* GraphQL */ `
        type A {
            A: String!
            B: Date!
        }

        scalar Date

        type B {
            A: String!
            B: Date!
        }

        scalar Date

        type Query {
            A: A!
            B: B!
        }

        type Mutation {
            A: A!
            B: B!
        }
    `

    type R = CreateMobius<
        typeof schema,
        {
            Date: Date
        }
    >

    expectTypeOf<R>().toEqualTypeOf<{
        Date: Date
        A: {
            A: string
            B: Date
        }
        B: {
            A: string
            B: Date
        }
        Query: {
            A: {
                A: string
                B: Date
            }
            B: {
                A: string
                B: Date
            }
        }
        Mutation: {
            A: {
                A: string
                B: Date
            }
            B: {
                A: string
                B: Date
            }
        }
        Subscription: {}
        Fragment: {}
    }>()
}

// ? Parse enum
{
    const schema = /* GraphQL */ `
        enum E {
            A
            B
            C
        }

        type A {
            A: String!
            B: E!
        }

        type B {
            A: String!
            B: String!
        }

        type Query {
            A: A!
            B: E!
        }
    `

    type R = CreateMobius<typeof schema>

    expectTypeOf<R>().toEqualTypeOf<{
        E: 'A' | 'B' | 'C'
        A: {
            A: string
            B: 'A' | 'B' | 'C'
        }
        B: {
            A: string
            B: string
        }
        Query: {
            A: {
                A: string
                B: 'A' | 'B' | 'C'
            }
            B: 'A' | 'B' | 'C'
        }
        Mutation: {}
        Subscription: {}
        Fragment: {}
    }>()
}

// ? Parse input
{
    const schema = /* GraphQL */ `
        input Input {
            A: String!
            B: String!
        }

        type A {
            A: String!
            B: String!
        }

        type B {
            A: String!
            B: String!
        }

        type Query {
            A: A!
            B(input: Input!): B!
        }
    `

    type R = CreateMobius<typeof schema>

    expectTypeOf<R>().toEqualTypeOf<{
        Input: {
            A: string
            B: string
        }
        A: {
            A: string
            B: string
        }
        B: {
            A: string
            B: string
        }
        Query: {
            A: {
                A: string
                B: string
            }
            B: (p: {
                input: {
                    A: string
                    B: string
                }
            }) => {
                A: string
                B: string
            }
        }
        Mutation: {}
        Subscription: {}
        Fragment: {}
    }>()
}

// ? Parse interface
{
    const schema = /* GraphQL */ `
        interface I {
            I: String!
            E: String!
        }

        type A implements I {
            A: String!
            B: String!
        }

        type Query {
            A: A!
        }
    `

    type R = CreateMobius<typeof schema>

    expectTypeOf<R>().toEqualTypeOf<{
        I: {
            I: string
            E: string
        }
        A: {
            A: string
            B: string
            I: string
            E: string
        }
        Query: {
            A: {
                A: string
                B: string
                I: string
                E: string
            }
        }
        Mutation: {}
        Subscription: {}
        Fragment: {}
    }>()
}

// ? Parse fragment
{
    const schema = /* GraphQL */ `
        type D {
            nested: String!
        }

        type A {
            A: String!
            B: String!
            C: String!
            D: D!
        }

        fragment F on A {
            A
            D
        }

        type Query {
            A: A!
        }
    `

    type R = CreateMobius<typeof schema>

    expectTypeOf<R>().toEqualTypeOf<{
        D: {
            nested: string
        }
        A: {
            A: string
            B: string
            C: string
            D: {
                nested: string
            }
        }
        Fragment: {
            F: {
                A: string
                D: {
                    nested: string
                }
            }
        }
        Query: {
            A: {
                A: string
                B: string
                C: string
                D: {
                    nested: string
                }
            }
        }
        Mutation: {}
        Subscription: {}
    }>()
}

// ? Parse omit directive
{
    const schema = /* GraphQL */ `
        directive @deprecated(reason: String = "EOL") on FIELD_DEFINITION

        type A {
            A: String!
            B: Int!
        }

        directive @deprecated(reason: String = "EOL") on FIELD_DEFINITION

        directive @deprecated(reason: String = "EOL") on FIELD_DEFINITION

        type B {
            A: String!
            B: String!
        }
    `

    type R = CreateMobius<typeof schema>

    expectTypeOf<R>().toEqualTypeOf<{
        A: {
            A: string
            B: number
        }
        B: {
            A: string
            B: string
        }
        Query: {}
        Mutation: {}
        Subscription: {}
        Fragment: {}
    }>()
}

// ? Complex type
{
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

    type R = CreateMobius<typeof typeDefs, Scalar>

    expectTypeOf<R>().toEqualTypeOf<{
        Date: Date
        A: {
            A: string
        }
        Fragment: {
            Frag: {
                A: string
            }
            ABCFrag: {
                A: string
                B: string
            }
        }
        CD: 'D' | 'C'
        EF: 'E' | 'F'
        B: {
            B: string
            A: string
        }
        D: {
            nested: string
        }
        C: {
            C: string | null
            D: {
                nested: string
            }
        }
        CDEF: 'C' | 'D' | 'E' | 'F' | {}
        ABC: {
            B: string
            A: string
            C: string | null
            D: {
                nested: string
            }
        }
        Query: {
            Hi: (p: { cdef: 'E' | 'C' | 'D' | 'F' | {} }) => {
                B: string
                A: string
                C: string | null
                D: {
                    nested: string
                }
            }
            Hello: (p: {
                word: string
                again: {
                    nested: string
                }
            }) => string
        }
        Mutation: {}
        Subscription: {}
    }>()

    const mobius = new Mobius<typeof typeDefs, Scalar>({
        typeDefs,
        fetch
    })

    const { ABCFrag } = mobius.fragments!

    const { result } = await mobius.query({
        Hi: {
            select: {
                ...ABCFrag,
                D: {
                    nested: true
                }
            },
            where: {
                cdef: 'D',
            }
        }
    })

    expectTypeOf<NonNullable<Awaited<typeof result>>>().toEqualTypeOf<{
        Hi: {
            D: {
                nested: string
            }
            A: string
            B: string
        }
    }>()
}
