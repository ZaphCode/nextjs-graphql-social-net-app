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
    }
    type Mutation {
        login(input: LoginInput): String
        register(input: RegisterInput): String
    }
`