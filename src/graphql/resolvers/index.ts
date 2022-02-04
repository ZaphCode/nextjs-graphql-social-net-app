import { authUser, login, register, logout } from "./Auth";
import { users, user, postRelation , postCount } from "./UsersCrud";
import { createPost, authorRelation, deletePost, commentsRelation} from "./PostCrud";
import { createComment, userRelation } from "./CommentCrud";

export const resolvers = {
  Query: {
    greet: () => "Hello",
    authUser,
    users,
    logout,
    user
  },
  Mutation: {
    login,
    register,
    createPost,
    deletePost,
    createComment
  },
  UserType: {
    posts: postRelation,
    postCount
  },
  PostType: {
    author: authorRelation,
    comments: commentsRelation
  },
  CommentType: {
    user: userRelation
  }
};
