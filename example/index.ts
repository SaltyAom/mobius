import { Mobius } from '../src'

const schema = /* GraphQL */ `
    scalar Date
    scalar Time

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

    type NhentaiPage {
        t: String
        w: Int
        h: Int
    }

    type NhentaiImages {
        pages: [NhentaiPage!]!
        cover: NhentaiPage!
        thumbnail: NhentaiPage!
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

    type NhqlUser {
        id: Int!
        username: String!
        slug: String!
        avatar: String!
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

    type NhqlPageInfo {
        type: String!
        width: Int!
        height: Int!
    }

    type NhqlPage {
        link: String!
        info: NhqlPageInfo!
    }

    type NhqlImages {
        pages: [NhqlPage!]!
        cover: NhqlPage!
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

const mobius = new Mobius({
    url: 'https://seele.hifumin.app/graphql',
    typeDefs: schema
})

mobius.query({
    nhql: {
        by: {
            where: {
                id: 177013,
                channel: 'HIFUMIN_FIRST'
            },
            select: {
                data: {
                    title: {
                        japanese: true
                    }
                }
            }
        }
    }
})

const response = await mobius.query({
    nhql: {
        by: {
            where: {
                id: 177013,
                channel: 'HIFUMIN_FIRST'
            },
            select: {
                data: {
                    title: {
                        display: true
                    },
                    comments: {
                        select: {
                            data: {
                                comment: true
                            }
                        },
                        where: {
                            channel: 'HIFUMIN_FIRST',
                            batch: 1,
                            batchBy: 10
                        }
                    }
                }
            }
        }
    }
})

const result = await response.result

console.log(result)
