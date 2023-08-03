/**
 * # Mobius
 *
 * ! Don't try to understand this
 * ! Dark art ahead
 *
 * ? Total hours wasted by this: 0
 *
 * @author saltyAom
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
type Whitespace =
    | '\u{9}' // '\t'
    | '\u{A}' // '\n'
    | '\u{20}' // ' '

type TrimLeft<V extends string> = V extends `${Whitespace}${infer R}`
    ? TrimLeft<R>
    : V

type TrimRight<V extends string> = V extends `${infer R}${Whitespace}`
    ? TrimRight<R>
    : V

type Trim<V extends string> = TrimLeft<TrimRight<V>>

type Split<
    S extends string,
    Delimiter extends string
> = S extends `${infer Head}${Delimiter}${infer Tail}`
    ? [Head, ...Split<Tail, Delimiter>]
    : S extends Delimiter
    ? []
    : [S]

type SplitUnion<S extends string> = S extends `${infer Head}|${infer Tail}`
    ? [Trim<Head>, ...SplitUnion<Tail>]
    : S extends '|'
    ? []
    : [Trim<S>]

type GetLastLine<S extends string> = S extends `${infer Head}\n${infer Tail}`
    ? GetLastLine<Tail>
    : S extends '\n'
    ? []
    : S

type FirstWord<T extends string> = T extends `${infer A}${Whitespace}${infer _}`
    ? A
    : T

type Prettify<T> = {
    [K in keyof T]: T[K]
} & {}

type ExtractType<T extends string> = T extends `${infer Type}\n${infer Rest}`
    ? [TrimLeft<Type>, Rest]
    : T extends `${infer Type} ${infer Rest}`
    ? [TrimLeft<Type>, Rest]
    : never

// enum and types
type CustomTypes = Record<string, string | Record<string, unknown>>
type Scalar = Record<string, unknown>

type GQLTypes = {
    String: string
    Int: number
    Float: number
    Boolean: boolean
    ID: string
}

type MergeInterface<
    Interfaces extends string,
    Known extends CustomTypes = {},
    Types extends Record<string, unknown> = {}
> = Interfaces extends `${infer Name},${infer Rest}`
    ? MergeInterface<
          Rest,
          Known,
          Types &
              (Trim<Name> extends infer Key extends keyof Known
                  ? Known[Key]
                  : never)
      >
    : Types &
          (Trim<Interfaces> extends infer Key extends keyof Known
              ? Known[Key]
              : never)

export type RemoveComment<T extends string> = RemoveMultiLineComment<
    RemoveSingleLineComment<T>
>

type RemoveSingleLineComment<T extends string> =
    T extends `${infer First}#${infer Comment}\n${infer Rest}`
        ? `${First}${RemoveSingleLineComment<Rest>}`
        : T

type RemoveMultiLineComment<T extends string> =
    T extends `${infer First}"""${infer Comment}"""${infer Rest}`
        ? `${First}${RemoveMultiLineComment<Rest>}`
        : T

type CreateInnerMobius<
    T extends string,
    Scalars extends Scalar = {},
    Known extends CustomTypes = {}
> = T extends `${infer Ops}{${infer Schema}}${infer Rest}`
    ? Trim<RemoveComment<Ops>> extends `${infer Keyword} ${infer Name}`
        ? CreateInnerMobius<
              Rest,
              Scalars,
              Known &
                  (Keyword extends 'type'
                      ? {
                            [name in TrimLeft<FirstWord<Name>>]: Prettify<
                                MapSchema<
                                    RemoveComment<Schema>,
                                    Known & Scalars
                                > &
                                    (Name extends `${infer _} implements ${infer Interfaces}`
                                        ? MergeInterface<Interfaces, Known>
                                        : {})
                            >
                        }
                      : Keyword extends 'input' | 'interface'
                      ? {
                            [name in TrimLeft<Name>]: Prettify<
                                MapSchema<RemoveComment<Schema>>
                            >
                        }
                      : Keyword extends 'enum'
                      ? {
                            [name in TrimLeft<Name>]: Exclude<
                                NonNullable<MapEnum<RemoveComment<Schema>>>,
                                ''
                            >
                        }
                      : Keyword extends 'fragment'
                      ? {
                            Fragment: {
                                [name in TrimLeft<FirstWord<Name>>]: Prettify<
                                    Name extends `${infer _} on ${infer Target}`
                                        ? Target extends keyof Known
                                            ? Pick<
                                                  Known[Target],
                                                  NonNullable<
                                                      Exclude<
                                                          MapEnum<
                                                              RemoveComment<Schema>
                                                          >,
                                                          ''
                                                      >
                                                  >
                                              >
                                            : {}
                                        : {}
                                >
                            }
                        }
                      : Keyword extends 'directive'
                      ? CreateInnerMobius<
                            // ? TypeScript is greedy
                            `${TrimLeft<
                                GetLastLine<Ops>
                            >}{${RemoveComment<Schema>}}`,
                            Scalars,
                            Known
                        >
                      : Keyword extends 'union'
                      ? CreateInnerMobius<
                            // ? TypeScript is greedy
                            `${TrimLeft<
                                GetLastLine<Ops>
                            >}{${RemoveComment<Schema>}}`,
                            Scalars,
                            Known & MapUnion<Ops, Scalars & Known>
                        >
                      : /**
                       * ? TypeScript is greedy, scalar can eat other word until
                       * ? next bracket match which means types left over is possible
                       **/
                      Keyword extends 'scalar'
                      ? TrimLeft<
                            RemoveComment<Ops>
                        > extends `${infer _}\n${infer Prefix}`
                          ? CreateInnerMobius<
                                `${Prefix}{${Schema}}`,
                                Scalars,
                                Known
                            >
                          : {}
                      : Known)
          >
        : Known
    : Known

type MapInnerUnion<
    T extends string[],
    Known extends CustomTypes,
    Carry extends Record<string, unknown> = {}
> = T extends [infer First extends string, ...infer Rest extends string[]]
    ? MapInnerUnion<
          Rest,
          Known,
          Prettify<
              Known extends { [a in First]: infer A }
                  ? A extends string | boolean | number | symbol
                      ? Carry | A
                      : Carry & A
                  : Carry
          >
      >
    : Carry

type MapUnion<
    T extends string,
    Known extends CustomTypes = {}
> = T extends `${infer _}union ${infer Name}=${infer Mapped}\n${infer Rest}`
    ? {
          [name in TrimRight<Name>]: MapInnerUnion<SplitUnion<Mapped>, Known>
      } & MapUnion<`\n${Rest}`, Known>
    : {}

type MapEnum<
    T extends string,
    Carry extends string | null = null
> = T extends `${infer Name}${Whitespace | ','}${infer Rest}`
    ? MapEnum<Rest, Trim<Name> | Carry>
    : T extends `${infer Name}`
    ? Carry | Trim<Name>
    : Carry

type MapSchema<
    T extends string,
    Known extends CustomTypes = {}
> = T extends `${infer Name}:${infer Type}`
    ? Name extends `${infer Name}(${infer Params}`
        ? T extends `${infer Name}(${infer Params}):${infer Type}`
            ? ExtractType<Type> extends [
                  infer Type extends string,
                  infer Rest extends string
              ]
                ? {
                      [word in Name as TrimLeft<Name> extends infer Candidate extends string
                          ? Candidate extends `#${infer _}`
                              ? never
                              : Candidate
                          : never]: Prettify<
                          MapArgument<Params, Known>
                      > extends infer Argument
                          ? Partial<Argument> extends Argument
                              ? (p?: Argument) => MapType<Type, Known>
                              : (p: Argument) => MapType<Type, Known>
                          : never
                  } & MapSchema<Rest, Known>
                : {}
            : {}
        : ExtractType<Type> extends [
              infer Type extends string,
              infer Rest extends string
          ]
        ? {
              [word in Name as TrimLeft<Name>]: MapType<Type, Known>
          } & MapSchema<Rest, Known>
        : {}
    : {}

type MapType<T extends string, Known extends CustomTypes = {}> = MapInnerType<
    FirstWord<T> extends `${infer Type}!` ? Type : T,
    Known
> extends infer Type
    ? unknown extends Type
        ? unknown
        : T extends `${infer _}!${infer _}`
        ? Type
        : Type | null
    : unknown

type MapInnerType<T extends string, Known extends CustomTypes = {}> = GQLTypes &
    Known extends infer Types
    ? T extends keyof Types
        ? Types[T]
        : T extends `[${infer InnerType}!]`
        ? InnerType extends keyof Types
            ? Types[InnerType][]
            : unknown[]
        : T extends `[${infer InnerType}]`
        ? InnerType extends keyof Types
            ? (Types[InnerType] | null)[]
            : unknown[]
        : unknown
    : never

type MapArgument<
    T extends string,
    Known extends CustomTypes = {},
    Carry extends Record<string, unknown> = {}
> = T extends `${infer Name}:${infer Type}${'\n' | ','}${infer Rest}`
    ? MapArgument<
          Rest,
          Known,
          Type extends `${infer _}!${infer _}`
              ? Carry & {
                    [name in TrimLeft<Name>]: MapType<
                        FirstWord<TrimLeft<Type>>,
                        Known
                    >
                }
              : Carry & {
                    [name in TrimLeft<Name>]?: MapType<
                        FirstWord<TrimLeft<Type>>,
                        Known
                    >
                }
      >
    : T extends `${infer Name}:${infer Type}`
    ? Type extends `${infer _}!${infer _}`
        ? Carry & {
              [name in TrimLeft<Name>]: MapType<
                  FirstWord<TrimLeft<Type>>,
                  Known
              >
          }
        : Carry & {
              [name in TrimLeft<Name>]?: MapType<
                  FirstWord<TrimLeft<Type>>,
                  Known
              >
          }
    : Carry

/**
 * Infers GraphQL types to TypeScript
 *
 * @example
 * ```ts
 * ```ts
 * import type { CreateMobius } from 'graphql-mobius'
 *
 * const typeDefs = `
 *     # Hello World
 *     type A {
 *         A: String!
 *         B: String!
 *     }
 *
 *     # Hello World
 *     type Query {
 *         Hello(word: String!): A!
 *     }
 * `
 *
 * // This is an equivalent to calling new Mobius().mobius
 * type Engine = CreateMobius<typeof typeDefs>
 * ```
 */
export type CreateMobius<
    T extends string,
    Scalars extends Scalar = {}
> = CreateInnerMobius<T, Scalars> extends infer Typed
    ? Prettify<
          Typed &
              ('Query' extends keyof Typed
                  ? {}
                  : {
                        Query: {}
                    }) &
              ('Mutation' extends keyof Typed
                  ? {}
                  : {
                        Mutation: {}
                    }) &
              ('Subscription' extends keyof Typed
                  ? {}
                  : {
                        Subscription: {}
                    }) &
              ('Fragment' extends keyof Typed
                  ? {}
                  : {
                        Fragment: {}
                    })
      >
    : never

type Selective<T> = T extends object
    ? {
          [K in keyof T]?: K extends 'where' ? T[K] : Selective<T[K]>
      } & ('where' extends keyof T
          ? T['where'] extends NonNullable<T['where']>
              ? {
                    select: T['Select']
                    where: T['where']
                }
              : {}
          : {})
    : T

type MaybeArray<T> = T | T[]
type UnwrapArray<T> = T extends Array<infer R>
    ? R extends any[]
        ? UnwrapArray<R>
        : R
    : T

/**
 * Create Prisma-like argument syntax for Client
 */
export type CreateQuery<T extends Record<string, unknown>> = {
    [K in keyof T]: T[K] extends (_: infer Params) => infer Query
        ? UnwrapArray<Query> extends Record<string, unknown>
            ? {
                  select: CreateQuery<UnwrapArray<Query>>
                  where: Params
              }
            : {
                  select: true | undefined | null
                  where: T[K] extends (_: infer Params) => any ? Params : never
              }
        : NonNullable<UnwrapArray<T[K]>> extends infer Query extends Record<
              string,
              unknown
          >
        ? {} extends UnwrapArray<Query>
            ? true | undefined | null
            : CreateQuery<UnwrapArray<Query>>
        : true | undefined | null
} & {
    __typename?: true | undefined | null
}

type UnwrapFunctionalSchema<
    Schema extends Record<string, unknown> | Function | null
> = Schema extends ((
    ...p: any[]
) => infer Returned extends Record<string, unknown>)
    ? Returned
    : Schema extends Record<string, unknown>
    ? Schema
    : never

type Resolve<
    Query extends Record<string, unknown>,
    Model extends Record<string, unknown>
> = Prettify<{
    [K in keyof Query]: Model extends Record<
        K,
        infer Schema extends Record<string, unknown> | Function | null
    >
        ? Query[K] extends true
            ? Model[K]
            : Query[K] extends {
                  select: infer Selected extends Record<string, unknown>
              }
            ?
                  | Resolve<Selected, UnwrapFunctionalSchema<Schema>>
                  | (null extends Schema ? null : never)
            : Query[K] extends Record<string, unknown>
            ?
                  | Resolve<Query[K], UnwrapFunctionalSchema<Schema>>
                  | (null extends Schema ? null : never)
            : {}
        : K extends keyof Model
        ? Model[K] extends Array<any>
            ? K extends keyof Query
                ? Resolve<
                      Query[K] extends Record<string, unknown> ? Query[K] : {},
                      Model[K][number]
                  >[]
                : []
            : Model[K]
        : never
}>

/**
 * Create Prisma-like function for GraphQL
 */
export type MakeExecutable<
    TypeDefs extends {
        Query: Record<string, unknown>
        Mutation: Record<string, unknown>
        Subscription: Record<string, unknown>
    },
    Scalars extends Scalar = {}
> = <
    Query extends Selective<CreateQuery<TypeDefs['Query']>>,
    Mutate extends Selective<CreateQuery<TypeDefs['Mutation']>>,
    Subscription extends Selective<CreateQuery<TypeDefs['Subscription']>>
>(params: {
    query?: Query
    mutate?: Mutate
    subscription?: Subscription
}) => Promise<
    Prettify<
        ({} extends Query ? {} : Resolve<Query, TypeDefs['Query'] & Scalars>) &
            ({} extends Mutate
                ? {}
                : Resolve<Mutate, TypeDefs['Mutation'] & Scalars>) &
            ({} extends Subscription
                ? {}
                : Resolve<Subscription, TypeDefs['Subscription'] & Scalars>)
    >
>

/**
 * Map Prisma-like JSON to GraphQL query (string)
 */
export const mobiusToGraphQL = <
    T extends 'query' | 'mutation' | 'subscription'
>(
    type: T,
    params: Record<T, Record<string, unknown>>
) => {
    const query = JSON.stringify(
        params[type] ?? params,
        (key, value) => {
            if (typeof value !== 'object') return value

            if (
                typeof value === 'object' &&
                'select' in value &&
                !('where' in value)
            )
                return value.select

            const mapped = {}

            for (const [key, child] of Object.entries(value)) {
                if (typeof child === 'object' && 'where' in child) {
                    mapped[`${key}(${JSON.stringify(child.where)})`] =
                        child.select
                    continue
                }

                mapped[key] = child
            }

            return mapped
        },
        2
    )

    return (
        type +
        ' _ ' +
        query
            .replace(/"": true,([ \t]+)?(\n)?/g, '')
            .replace(/("|\\)/g, '')
            // Query quote field to GraphQL
            .replace(/(.*): {/g, (a) => a.slice(1, -3) + ' {')
            // Quote field: true to GraphQL
            .replace(/(\w+): true(,)?/g, (a) =>
                a.slice(0, a[a.length - 1] === ',' ? -7 : -6)
            )
            .replace(/\(\{/g, '(')
            .replace(/\}\)/g, ')')
            // Replace primitive value query
            .replace(/\): true/g, ')')
    )
}

/**
 * /: Denotes the start and end of the regex pattern.
 * fragment: Matches the word "fragment" literally.
 * \s+: Matches one or more whitespace characters (spaces, tabs, etc.).
 * (\w+): Capturing group to match the fragment name. \w+ matches one or more word characters (letters, digits, and underscores).
 * \s+: Matches one or more whitespace characters.
 * on: Matches the word "on" literally.
 * \s+: Matches one or more whitespace characters.
 * [\w:]+: Matches one or more word characters and colons. This is used to match the type condition after "on" in the fragment.
 * \s*: Matches zero or more whitespace characters.
 * {: Matches the opening curly brace.
 * ([^}]*): Capturing group to match the content of the fragment. [^}]* matches zero or more characters that are not closing curly braces.
 * }: Matches the closing curly brace.
 * /g: Global flag to match all occurrences of the pattern in the input string.
 */
const extractFragment = /fragment\s+(\w+)\s+on\s+[\w:]+\s*{([^}]*)}/g

/**
 * Create fragments for usage in Prisma-like client
 */
export const createFragment = (schema: string) => {
    const matches = schema.match(extractFragment)
    if (!matches) return {}

    const fragments = {}

    if (matches) {
        for (const match of matches) {
            const [, name, content] = extractFragment.exec(matches)
            const current = {}

            for (const item of content.split(/(,|\n)/g))
                current[item.trim()] = true

            fragments[name] = current
        }
    }

    return fragments
}

type ToSelectiveFragment<T extends Record<string, unknown>> = {
    [K in keyof T]: T[K] extends Record<string, unknown>
        ? ToSelectiveFragment<T[K]>
        : true
}

export class Mobius<
    Declaration extends string = '',
    const Scalars extends Scalar = {},
    TypeDefs extends CreateMobius<Declaration, Scalars> = CreateMobius<
        Declaration,
        Scalars
    >
> {
    /**
     * ! For type declaration only
     */
    mobius: TypeDefs | null = null
    /**
     * Available if `typeDefs` is passed
     */
    fragments: ToSelectiveFragment<TypeDefs['Fragment']> | null = null

    constructor(
        public config?: {
            url?: string
            fetch?: (query: string) => Promise<unknown>
            typeDefs?: Declaration
        }
    ) {
        if (config?.typeDefs) this.fragments = createFragment(config.typeDefs)
    }

    protected get fetch() {
        return (
            this.config?.fetch ??
            ((query: string) =>
                fetch(this.config?.url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        query,
                        variables: {}
                    })
                }).then((x) => x.json()))
        )
    }

    $<
        Query extends Selective<CreateQuery<TypeDefs['Query']>> = {},
        Mutate extends Selective<CreateQuery<TypeDefs['Mutation']>> = {},
        Subscription extends Selective<CreateQuery<TypeDefs['Subscription']>>
    >(params: {
        query?: Query
        mutate?: Mutate
        subscription?: Subscription
    }): {
        result: Promise<
            | Prettify<
                  ({} extends Query
                      ? {}
                      : Resolve<Query, TypeDefs['Query'] & Scalars>) &
                      ({} extends Mutate
                          ? {}
                          : Resolve<Mutate, TypeDefs['Mutation'] & Scalars>) &
                      ({} extends Subscription
                          ? {}
                          : Resolve<
                                Subscription,
                                TypeDefs['Subscription'] & Scalars
                            >)
              >
            | undefined
        >
        query: string
        mutation: string
        subscription: string
    } {
        const q = {
            query: mobiusToGraphQL('query', params),
            mutation: mobiusToGraphQL('mutation', params),
            subscription: mobiusToGraphQL('subscription', params)
        }

        return {
            ...q,
            result: {
                query: this.fetch(q.query),
                mutation: this.fetch(q.mutation),
                subscription: this.fetch(q.subscription)
            }
        }
    }

    query<Query extends Selective<CreateQuery<TypeDefs['Query']>>>(
        params: Query
    ): {
        query: string
        result: Promise<Prettify<
            {} extends Query ? {} : Resolve<Query, TypeDefs['Query'] & Scalars>
        > | null>
    } {
        const q = mobiusToGraphQL('query', params)

        return {
            query: q,
            result: this.fetch(q)
        }
    }

    mutate<Mutate extends Selective<CreateQuery<TypeDefs['Mutation']>>>(
        params: Mutate
    ): {
        mutate: string
        result: Promise<
            Prettify<
                {} extends Mutate
                    ? {}
                    : Resolve<Mutate, TypeDefs['Mutation'] & Scalars>
            >
        >
    } {
        const q = mobiusToGraphQL('mutate', params)

        return {
            mutate: q,
            result: this.fetch(q)
        }
    }

    subscription<
        Subscription extends Selective<CreateQuery<TypeDefs['Subscription']>>
    >(
        params: Subscription
    ): {
        subscription: string
        result: Promise<
            Prettify<
                {} extends Subscription
                    ? {}
                    : Resolve<Subscription, TypeDefs['Subscription'] & Scalars>
            >
        >
    } {
        const q = mobiusToGraphQL('subscription', params)

        return {
            subscription: q,
            result: this.fetch(q)
        }
    }
}

export default Mobius
