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
        followersCount: Int
        followers: [UserType]
        followingsCount: Int
        followings: [UserType]
    }

    type PostType {
        id: ID
        message: String
        postImg: String
        createdAt: String
        updatedAt: String

        author: UserType
        comments: [CommentType]
        commentsCount: Int
        likesCount: Int
    }

    type CommentType {
        id: ID
        comment: String
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
        user (id: String!): UserType 
        allPosts: [PostType]
        randomPosts(limit: Int!): [PostType]
    }
    type Mutation {
        login(input: LoginInput): String
        register(input: RegisterInput): String
        createPost(message: String!): PostType
        deletePost(id: String!): PostType
        createComment(postId: String!, comment: String!): CommentType
        deleteComment(id: String!): CommentType
        follow (userToFollowId: String!): String
        unfollow (userToUnfollowId: String!): String
        likePost(id: String!): String
        unlikePost(id: String!): String
    }
`