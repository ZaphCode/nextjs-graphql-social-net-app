import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "../../graphql/typeDefs";
import context from "../../lib/apollo_context";
import { resolvers } from "../../graphql/resolvers";
import Cors from "micro-cors";

// * Next config
export const config = { api: { bodyParser: false } };

const cors = Cors({
  origin: "https://studio.apollographql.com",
  allowCredentials: true,
});

const apolloServer = new ApolloServer({ typeDefs, resolvers, context });

const serverStart = apolloServer.start();

export default cors(async (req, res) => {
  if (req.method === "OPTIONS") return res.end('Invalid Method');
  await serverStart;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
});
