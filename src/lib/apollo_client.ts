import { ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client'

const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'http://localhost:3000/api/graphql',
      credentials: 'same-origin',
    }),
    cache: new InMemoryCache(),
  });

export default client