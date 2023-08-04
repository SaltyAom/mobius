import { Mobius } from '../src'

const typeDefs = /* GraphQL */ `
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

    """
    nHentai Query

    Same format as nHentai API
    """
    type NhentaiQuery {
        """
        Get nHentai by ID (6 digits code)
        """
        by(id: Int!, channel: NhqlChannel! = HIFUMIN_FIRST): Nhentai!

        """
        Get multiple nHentai by ID (6 digits code)

        - IDs must be unique
        - Maximum 25 IDs per batch
        - Only available for HifuminFirst channel
        """
        multiple(id: [Int!]!): MultipleNHentaiResponse!

        """
        Search from nHentai
        """
        search(
            with: String! = ""
            page: Int! = 1
            includes: [String!]! = []
            excludes: [String!]! = []
            channel: NhqlChannel! = HIFUMIN_FIRST
        ): NhentaiGroup!
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

    """
    Specified source origin
    """
    enum NhqlChannel {
        """
        Strategy: Hifumin first then fallback to nHentai.
        (DEFAULT)
        """
        HIFUMIN_FIRST

        """
        Hifumin mirror, updates every 12 hours with no rate limit
        Best if data loss is not toleratable.
        """
        HIFUMIN

        """
        Use direct NHentai API, with rate limit and possibly maintain only 7 concurrent connections
        Best for fresh new data but data loss is toleratable
        """
        NHENTAI
    }

    type NhqlComment {
        id: Int!
        user: NhqlUser!
        created: Int!
        comment: String!
    }

    enum NhqlCommentOrder {
        """
        Order by comment date by descending order. (default)
        """
        NEWEST

        """
        Order by comment date by ascending order
        """
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

    """
    Nhql (nHentai API)

    Easier formatted data, ready to used out of the box
    """
    type NhqlQuery {
        """
        Get nHentai by ID (6 digits code)
        """
        by(id: Int!, channel: NhqlChannel! = HIFUMIN_FIRST): Nhresponse!

        """
        Get multiple nHentai by ID (6 digits code)

        - IDs must be unique
        - Maximum 25 IDs per batch
        - Only available for HifuminFirst channel
        """
        multiple(id: [Int!]!): MultipleNHResponse!

        """
        Search from nHentai
        """
        search(
            with: String! = ""
            page: Int! = 1
            includes: [String!]! = []
            excludes: [String!]! = []
            channel: NhqlChannel! = HIFUMIN_FIRST
        ): NhsearchResponse!
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

    type Query {
        nhentai: NhentaiQuery!
        nhql: NhqlQuery!
    }
`

const mobius = new Mobius({
    url: 'https://seele.hifumin.app/graphql',
    typeDefs
})

const response = mobius.query({
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
                    related: {
                        select: {
                            title: {
                                display: true,
                            },
                            related: {
                                select: {
                                    id: true
                                },
                                where: {
                                    channel: 'HIFUMIN_FIRST'
                                }
                            }
                        },
                        where: {
                            channel: 'HIFUMIN_FIRST'
                        }
                    }
                }
            }
        }
    }
})

const result = await response.result
