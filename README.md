# GraphQL Mobius
GraphQL to TypeScript type, **no code gen** w/ ith Prisma-like query syntax, fully type-safe.

**Written purely in TypeScript type.**

It can parse:
- type
- input
- mutation
- interface
- enum
- directive
- union
- fragment
- single/multiline comment
- scalars provided via generic

Caveat:
- Directive should be top-level
- Nested Query is not supported
- Directive should be top-level 
- TypeScript Template Literal is greedy, and can't fit many comments atm
- Can read around ~9000 locs and limited to around ~900 types

** This is not expected to use on production, yet.**
