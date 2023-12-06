// ./apollo-client.js

import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    // uri: "https://countries.trevorblades.com",
    uri: "https://brexolsurgicalinstruments.com/graphql",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
