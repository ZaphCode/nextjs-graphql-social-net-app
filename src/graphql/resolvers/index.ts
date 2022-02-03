import { authUser, login, register, logout } from "./Auth";
import { users } from "./UsersCrud";

export const resolvers = {
  Query: {
    greet: () => "Hello",
    authUser,
    users,
    logout,
  },
  Mutation: {
    login,
    register,
  },
};
