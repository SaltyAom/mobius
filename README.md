# @elysiajs/graphql-yoga
Plugin for [Elysia](https://github.com/elysiajs/elysia) for using graphql-yoga.

## Installation
```bash
bun add graphql graphql-yoga@three @elysiajs/graphql-yoga
```

## Example
```typescript
import { Elysia } from 'elysia'
import { yoga } from '@elysiajs/graphql-yoga'

import { createYoga, createSchema } from 'graphql-yoga'

const app = new Elysia()
    .use(
        yoga({
            yoga: createYoga({
                schema: createSchema({
                    typeDefs: `
                        type Query {
                            hi: String
                        }
                `,
                resolvers: {
                    Query: {
                        hi: () => 'Hi from Elysia'
                    }
                }
            })
        })
    )
    .listen(8080)
```
### path
@default "/graphql"

Path to expose as GraphQL handler

### yoga
GraphQL Yoga instance
