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

// ? I'm even sure why this work, I just bruteforce
type RemoveSingleLineComment<T extends string> =
    T extends `${infer First}#${infer Comment}\n${infer Rest}`
        ? `${First}${RemoveSingleLineComment<Rest>}`
        : T

type RemoveMultiLineComment<T extends string> =
    T extends `${infer First}"""${infer Comment}"""${infer Rest}`
        ? `${First}${RemoveMultiLineComment<Rest>}`
        : T

type ExtractUnion<T extends string> =
    T extends `${infer First}"""${infer Comment}"""${infer Rest}`
        ? `${First}${RemoveMultiLineComment<Rest>}`
        : T

type CreateMobius<
    T extends string,
    Scalars extends Scalar = {},
    Known extends CustomTypes = {}
> = T extends `${infer Ops}{${infer Schema}}${infer Rest}`
    ? Trim<Ops> extends `${infer Keyword} ${infer Name}`
        ? CreateMobius<
              Rest,
              Scalars,
              Known &
                  (Keyword extends 'type'
                      ? {
                            [name in Trim<FirstWord<Name>>]: Prettify<
                                MapSchema<Schema, Known & Scalars> &
                                    (Name extends `${infer _} implements ${infer Interfaces}`
                                        ? MergeInterface<Interfaces, Known>
                                        : {})
                            >
                        }
                      : Keyword extends 'input' | 'mutation' | 'interface'
                      ? {
                            [name in Trim<Name>]: Exclude<
                                MapSchema<Schema>,
                                null
                            >
                        }
                      : Keyword extends 'enum'
                      ? {
                            [name in Trim<Name>]: Exclude<MapEnum<Schema>, null>
                        }
                      : Keyword extends 'fragment'
                      ? {
                            Fragment: {
                                [name in Trim<FirstWord<Name>>]: Prettify<
                                    Name extends `${infer _} on ${infer Target}`
                                        ? Target extends keyof Known
                                            ? Pick<
                                                  Known[Target],
                                                  NonNullable<
                                                      Exclude<
                                                          MapEnum<Schema>,
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
                      ? CreateMobius<
                            // ? TypeScript is greedy
                            `${Trim<GetLastLine<Ops>>}{${Schema}}`,
                            Scalar,
                            Known
                        >
                      : Keyword extends 'union'
                      ? CreateMobius<
                            // ? TypeScript is greedy
                            `${Trim<GetLastLine<Ops>>}{${Schema}}`,
                            Scalar,
                            Known & MapUnion<Ops, Scalars & Known>
                        >
                      : {})
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

export type Mobius<
    T extends string,
    Scalars extends Scalar = {}
> = CreateMobius<RemoveComment<T>, Scalars> extends infer Typed
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

export class Client<
    Declaration extends string = '',
    const Scalars extends Scalar = {},
    TypeDefs extends Mobius<Declaration, Scalars> = Mobius<Declaration, Scalars>
> {
    constructor(public url: string) {}

    mobius: TypeDefs = {} as any

    $<
        Query extends Selective<CreateQuery<TypeDefs['Query']>>,
        Mutate extends Selective<CreateQuery<TypeDefs['Mutation']>>,
        Subscription extends Selective<CreateQuery<TypeDefs['Subscription']>>
    >(params: {
        query?: Query
        mutate?: Mutate
        subscription?: Subscription
    }): Promise<
        Prettify<
            ({} extends Query
                ? {}
                : Resolve<Query, TypeDefs['Query'] & Scalars>) &
                ({} extends Mutate
                    ? {}
                    : Resolve<Mutate, TypeDefs['Mutation'] & Scalars>) &
                ({} extends Subscription
                    ? {}
                    : Resolve<Subscription, TypeDefs['Subscription'] & Scalars>)
        >
    > {
        return this as any
    }

    query<Query extends Selective<CreateQuery<TypeDefs['Query']>>>(params: {
        query: Query
    }): Promise<
        Prettify<
            {} extends Query ? {} : Resolve<Query, TypeDefs['Query'] & Scalars>
        >
    > {
        return this as any
    }

    mutate<
        Mutate extends Selective<CreateQuery<TypeDefs['Mutation']>>
    >(params: {
        mutate: Mutate
    }): Promise<
        Prettify<
            {} extends Mutate
                ? {}
                : Resolve<Mutate, TypeDefs['Mutation'] & Scalars>
        >
    > {
        return this as any
    }

    subscription<
        Subscription extends Selective<CreateQuery<TypeDefs['Subscription']>>
    >(params: {
        mutate: Subscription
    }): Promise<
        Prettify<
            {} extends Subscription
                ? {}
                : Resolve<Subscription, TypeDefs['Subscription'] & Scalars>
        >
    > {
        return this as any
    }
}

export default Client
