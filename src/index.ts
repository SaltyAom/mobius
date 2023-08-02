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

type FirstWord<T extends string> = T extends `${infer A}${Whitespace}${infer _}`
    ? A
    : T

type Prettify<T> = {
    [K in keyof T]: T[K]
} & {}

type ExtractType<T extends string> =
    T extends `${infer _}${infer Type}\n${infer Rest}`
        ? [Type, Rest]
        : T extends `${infer _}${infer Type} ${infer Rest}`
        ? [Type, Rest]
        : never

// enum and types
type CustomTypes = Record<string, string | Record<string, unknown>>

type GQLTypes = {
    String: string
    Int: number
    Float: number
    Boolean: boolean
    ID: string
}

type CreateMobius<
    T extends string,
    Known extends CustomTypes = {}
> = T extends `${infer Start} ${infer Ops}{${infer Schema}}${infer Rest}`
    ? Trim<Ops> extends `${infer Keyword} ${infer Name}`
        ? CreateMobius<
              Rest,
              Known &
                  (Keyword extends 'type'
                      ? {
                            [name in Trim<Name>]: Prettify<
                                MapSchema<Schema, Known>
                            >
                        }
                      : Keyword extends 'enum'
                      ? {
                            [name in Trim<Name>]: Exclude<MapEnum<Schema>, null>
                        }
                      : never)
          >
        : Known
    : Known

type A = Mobius<``>

type MapEnum<T extends string, Carry extends string | null = null> = T extends
    | `${infer _}"""${infer _}"""${infer Schema}`
    | `${infer _}#${infer _}\n${infer Schema}`
    ? MapEnum<Schema, Carry>
    : T extends `${infer Name}${Whitespace | ','}${infer Rest}`
    ? MapEnum<Rest, Trim<Name> | Carry>
    : T extends `${infer Name}`
    ? Carry | Trim<Name>
    : Carry

type MapSchema<
    T extends string,
    Known extends CustomTypes = {}
> = T extends
    | `${infer _}"""${infer _}"""${infer Schema}`
    | `${infer _}#${infer _}\n${infer Schema}`
    ? MapSchema<Schema, Known>
    : T extends `${infer Name}:${infer Type}`
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
                              ? (argument?: Argument) => MapType<Type, Known>
                              : (argument: Argument) => MapType<Type, Known>
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

export type Mobius<T extends string> = Prettify<CreateMobius<T>>
