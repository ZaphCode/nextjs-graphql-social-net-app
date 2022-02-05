import { authUser, login, register, logout } from "./Auth";
import {
  users,
  user,
  postsRelation,
  postCount,
  followersRelation,
  followingsRelation,
  followingsCount,
  followersCount,
} from "./UsersCrud";
import {
  createPost,
  authorRelation,
  deletePost,
  commentsRelation,
  likesCount,
  commentsCount,
  allPosts
} from "./PostCrud";
import { createComment, userRelation, deleteComment } from "./CommentCrud";
import { follow, unfollow } from "./Follows";
import { likePost, unlikePost } from "./Likes";

export const resolvers = {
  Query: {
    greet: () => "Hello",
    authUser,
    users,
    logout,
    user,
    allPosts
  },
  Mutation: {
    login,
    register,
    createPost,
    deletePost,
    createComment,
    deleteComment,
    follow,
    unfollow,
    likePost,
    unlikePost
  },
  //* Relations
  UserType: {
    posts: postsRelation,
    postCount,
    followers: followersRelation,
    followings: followingsRelation,
    followingsCount,
    followersCount,
  },
  PostType: {
    author: authorRelation,
    comments: commentsRelation,
    likesCount,
    commentsCount
  },
  CommentType: {
    user: userRelation,
  },
};
