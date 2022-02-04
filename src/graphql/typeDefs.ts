import {gql} from 'apollo-server-micro'

export const typeDefs = gql`
    type UserType {
        id: ID
        username: String
        email: String
        verified: Boolean
        role: String
        active: Boolean
        profileImg: String
        createdAt: String
        updatedAt: String

        postCount: Int
        posts: [PostType]
    }

    type PostType {
        id: ID
        message: String
        postImg: String
        createdAt: String
        updatedAt: String

        author: UserType
        comments: [CommentType]
    }

    type CommentType {
        id: ID
        comment: String
        userId: String
        postId:   String
        createdAt: String
        updatedAt: String

        user: UserType
        post: PostType
    }

    input LoginInput {
        email: String!
        password: String!
    }

    input RegisterInput {
        email: String!
        username: String!
        password: String!
    }

    type Query {
        greet: String
        authUser: UserType,
        logout: String
        users: [UserType]
        user (id: String): UserType 
    }
    type Mutation {
        login(input: LoginInput): String
        register(input: RegisterInput): String
        createPost(message: String): PostType
        deletePost(id: String): PostType
        createComment(postId: String, comment: String): CommentType
    }
`