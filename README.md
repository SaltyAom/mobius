# GraphQL Mobius
GraphQL to TypeScript type, **no code gen** with ith Prisma-like query syntax, fully type-safe.

**Written purely in TypeScript type.**


Brought to you by [ElysiaJS](https://elysiajs.com)

![mobius](https://github.com/SaltyAom/mobius/assets/35027979/0bb3291e-49f2-45da-9bcf-3e283ec3cc4d)

---

Mobius can parse GraphQL schema to TypeScript to create End-to-end type safe GraphQL client in TypeScript.

Made possible by Template Literal and various dark magic.

### Known Caveat:
- **Type must be order from top-to-bottom like TypeScript**
    - This means before using the type, it must be defined first
    ```ts
    // ✅ This works
    type A {
        A: String!
    }

    type B {
        A: String!
        B: A!
    }

    // ❌ This not
    type B {
        A: String!
        B: A!
    }

    type A {
        A: String!
    }
    ```
- Directive should be top-level (but not required)
- Nested fragment is not supported
- TypeScript has limited total stack, pass around ~8-9 locs / 14k generated around ~900 types (compacted, only types)

## Why
This is a proof that you can run GraphQL with end-to-end type safety.

This is a bare minimum utility library, not intent to replace GraphQL client like URQL and GraphQL Apollo.

Mobius acts as a companion library or internal engine to add Type Safety layer over a new or an existing one.

Mobius does 2 things:
1. Infers GraphQL to TypeScript types
2. A bare minimum client that use Prisma-like syntax to query GraphQL

You can use Mobius in your library / framework, just please keep the **LICENSE** mentioned that you are using **GraphQL Mobius** (It's MIT License, feels free to fork or improve on it)

## Prerequisted
1. TypeScript > 5.0
2. Set `strict` to true in **tsconfig.json**

## Getting Start
1. Define a GraphQL Schema in string **(must be const)**
2. Cast schema to type using `typeof` (or pass it as literal params in constructor)

```ts
import { Mobius } from 'graphql-mobius'

const typeDefs = `
    type A {
        A: String!
        B: String!
    }

    type Query {
        Hello(word: String!): A!
    }
`

const mobius = new Mobius<typeof typeDefs>({
    // Using Mobius default fetch client
    url: 'https://api.saltyaom.com/graphql'
})

// This is also fine, if you don't care about TypeDefs being available on client-side
const mobius2 = new Mobius({
    url: 'https://api.saltyaom.com/graphql'
    typeDefs
})

// Call query to execute query
const { result } = mobius.query({
    Hello: {
        where: {
            word: 'Hi'
        },
        select: {
            A: true
        }
    }
})

result
    .then(x => x?.Hello.A)
    .then(console.log)
```

## Mobius Client
Mobius client provided the following method:
- $: Query all types of query at once
- query: Query GraphQL
- mutate: Mutate GraphQL
- subscription: Subscribe GraphQL

Mobius client provided the following properties:
- mobius: For type declaration only
- fragments: Type-safe GraphQL fragments (type is always provided, literal code is available if `typeDefs` is passed)

## Mobius Types
Mobius type extends `Record<string, unknown>` with the base of following:
- Query: `Record<string, unknown>`
- Mutation: `Record<string, unknown>`
- Subscription: `Record<string, unknown>`
- Fragment: `Record<string, unknown>`
- Rest of the types declarations infers from GraphQL Schema

[@see Utility Types for an example usage and more detailed explaination](#utility-type)

## Scalar
You can add custom scalars type by passing types as second generic.

```ts
import { Mobius } from 'graphql-mobius'

const typeDefs = `
    type A {
        A: String!
        B: Date!
    }
`

type Scalars = {
    Data: Date
}

const client = new Mobius<typeof typeDefs>()

client.mobius
/**
 * A: {
 *   A: string
 *   B: Date
 * }
 */
```

If scalars isn't provided but is defined in GraphQL anyway, it should resolved as **unknown**

## Fragment
You use use `mobius.fragment` **if you provided typeDefs as literal code**

Fragment syntax works like rest parameters which looks like GraphQL fragment syntax.

```ts
const typeDefs = `
    interface A {
        A: String!
        B: String!
        C: String!
        D: String!
    }

    fragment APart on A {
        A
        B
    }

    type Query {
        GetA: A!
    }
`

const mobius = new Mobius({
    typeDefs
})

const { APart } = mobius.fragments!

mobius.query({
    GetA: {
        ...APart,
        C: true
    }
})
```

## Utility type
For framework, and library author.

You can use exported utilities types from **graphql-mobius** to achieve End-to-end type safety while **not increasing any byte att all** for your project's bundle.

```ts
import type { CreateMobius } from 'graphql-mobius'

const typeDefs = `
    # Hello World
    type A {
        A: String!
        B: String!
    }

    # Hello World
    type Query {
        Hello(word: String!): A!
    }
`

// This is an equivalent to calling new Mobius().mobius
type Engine = CreateMobius<typeof typeDefs>
```

### Structured
`CreateMobius` will returned type structured as extends `Record<string, unknown>` the base of following:
- Query: `Record<string, unknown>`
- Mutation: `Record<string, unknown>`
- Subscription: `Record<string, unknown>`
- Fragment: `Record<string, unknown>`
- Rest of the types declarations infers from GraphQL Schema

### Others utilities
- `CrateMobius (Type)` - Infers GraphQL types to TypeScript
- `RemoveComment (Type)` - Remove GraphQL comment in type-level
- `CreateQuery (Type)` - Create Prisma-like argument syntax for Client
- `MakeExecutable (Type)` - Create Prisma-like function for GraphQL
- `mobiusToGraphQL` - Map Prisma-like JSON to GraphQL query (string)
- `createFragment` - Create fragments for usage in Prisma-like client

## About fetch
As mentioned that Mobius is not intent to replace existing GraphQL client, but designed to create an abstraction over.

Allowing you to integrate with existing library by providing a custom fetcher with the following type:
```ts
type Fetcher = (query: string) => Promise<unknown>
```

Fetch function is a callback function that executed when new request is calls, and will accept a stringified GraphQL query and expected to return a GraphQL response.

It's intent to be use like the following:
```ts
// Using URQL
new Mobius({
    fetch: urql.query
})

// Using native fetch (default)
new Mobius({
    fetch: (query) => fetch(this.config.url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: {}
        }),
    })
    .then((res) => res.json())
})
```

The library that you want to query GraphQL to use with Mobius is your choice, it's designed to be that way.

---

GraphQL Mobius is a library to convert GraphQL to TypeScript type **without code generation**, by using **purely TypeScript type.**

It's not intent to replace existing GraphQL client, but to create an abstraction over.

You can freely use Mobius in your source code / library / framework, just please keep the original **LICENSE** (MIT License)

Brought to you by [ElysiaJS](https://elysiajs.com)
