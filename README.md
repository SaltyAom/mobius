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
- TypeScript has it own limitation for nested types, tested around ~8000 locs (compacted, only types) and limited to around ~900 types
