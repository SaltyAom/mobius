import type { Mobius } from '../src'

const type = /* GraphQL */ `
    type MultipleNHResponse {
        success: Boolean!
        error: String
        data: [Nhresponse!]!
    }

    type MultipleNHentaiResponse {
        success: Boolean!
        error: String
        data: [Nhentai!]!
    }

    type NhentaiComment {
        id: Int!
        galleryId: Int!
        poster: NhentaiCommentPoster!
        postDate: Int!
        body: String!
    }

    type NhentaiCommentPoster {
        id: Int!
        username: String!
        slug: String!
        avatarUrl: String!
        isSuperuser: Boolean!
        isStaff: Boolean!
    }

    type NhentaiGroup {
        result: [Nhentai!]!
        numPages: Int
        perPage: Int
    }

    type NhentaiImages {
        pages: [NhentaiPage!]!
        cover: NhentaiPage!
        thumbnail: NhentaiPage!
    }

    type NhentaiPage {
        t: String
        w: Int
        h: Int
    }

    type NhentaiTag {
        id: Int!
        type: String!
        name: String!
        url: String!
        count: Int!
    }

    type NhentaiTitle {
        english: String
        japanese: String
        pretty: String
    }

    enum NhqlChannel {
        HIFUMIN_FIRST
        HIFUMIN
        NHENTAI
    }

    type Nhentai {
        id: Int
        mediaId: Int
        title: NhentaiTitle!
        images: NhentaiImages!
        scanlator: String
        uploadDate: Int
        tags: [NhentaiTag!]!
        numPages: Int
        numFavorites: Int
        comments(
            from: Int
            to: Int
            batch: Int
            batchBy: Int
            orderBy: NhqlCommentOrder
            channel: NhqlChannel! = HIFUMIN_FIRST
        ): [NhentaiComment!]!
        related(channel: NhqlChannel! = HIFUMIN_FIRST): [Nhentai!]!
    }

    type NhqlComment {
        id: Int!
        user: NhqlUser!
        created: Int!
        comment: String!
    }

    enum NhqlCommentOrder {
        NEWEST
        OLDEST
    }

    type NhqlCommentResponse {
        total: Int!
        data: [NhqlComment!]!
    }

    type NhqlImages {
        pages: [NhqlPage!]!
        cover: NhqlPage!
    }

    type NhqlInfo {
        amount: Int!
        favorite: Int!
        upload: Int!
        mediaId: Int!
    }

    type NhqlMetadata {
        parodies: [NhqlTag!]!
        characters: [NhqlTag!]!
        groups: [NhqlTag!]!
        categories: [NhqlTag!]!
        artists: [NhqlTag!]!
        tags: [NhqlTag!]!
        language: String!
    }

    type NhqlPage {
        link: String!
        info: NhqlPageInfo!
    }

    type NhqlPageInfo {
        type: String!
        width: Int!
        height: Int!
    }

    type NhqlTag {
        name: String!
        count: Int!
        url: String!
    }

    type NhqlTitle {
        display: String
        english: String
        japanese: String
    }

    type NhqlUser {
        id: Int!
        username: String!
        slug: String!
        avatar: String!
    }

    type Nhql {
        id: Int!
        title: NhqlTitle!
        images: NhqlImages!
        info: NhqlInfo!
        metadata: NhqlMetadata!
        comments(
            from: Int
            to: Int
            batch: Int
            batchBy: Int
            orderBy: NhqlCommentOrder
            channel: NhqlChannel! = HIFUMIN_FIRST
        ): NhqlCommentResponse!
        related(channel: NhqlChannel! = HIFUMIN_FIRST): [Nhql!]!
    }

    type Nhresponse {
        success: Boolean!
        error: String
        data: Nhql
    }

    type NhsearchResponse {
        success: Boolean!
        error: String
        total: Int!
        data: [Nhql!]!
    }

    type NhentaiQuery {
        by(id: Int!, channel: NhqlChannel! = HIFUMIN_FIRST): Nhentai!
        multiple(id: [Int!]!): MultipleNHentaiResponse!
        search(
            with: String! = ""
            page: Int! = 1
            includes: [String!]! = []
            excludes: [String!]! = []
            channel: NhqlChannel! = HIFUMIN_FIRST
        ): NhentaiGroup!
    }

    type NhqlQuery {
        by(id: Int!, channel: NhqlChannel! = HIFUMIN_FIRST): Nhresponse!
        multiple(id: [Int!]!): MultipleNHResponse!
        search(
            with: String! = ""
            page: Int! = 1
            includes: [String!]! = []
            excludes: [String!]! = []
            channel: NhqlChannel! = HIFUMIN_FIRST
        ): NhsearchResponse!
    }

    type Query {
        nhentai: NhentaiQuery!
        nhql: NhqlQuery!
    }
`

const type2 = /* GraphQL */ `
    type Book {
        id: Int! @id
        title: String!
        author: String!
    }

    enum Channel {
        Hello
        World
    }

    type Author {
        id: Int!
        name: String!
        book: [Book!]!
        channel: Channel
    }

    type Query {
        books(name: String!, channel: Channel = Hello): [Book!]!
    }
`

export type Type = Mobius<typeof type>
export type Query = Type['Query']

const query: Query = new Proxy({}, {}) as any

const result = query.nhql.by({
    channel: 'HIFUMIN',
    id: 177013
})






















result
