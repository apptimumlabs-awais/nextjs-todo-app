// lib/apollo-provider.js
"use client";

import { HttpLink } from "@apollo/client";
import {
  NextSSRApolloClient,
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

function makeClient() {
  const httpLink = new HttpLink({
    // uri: "https://main--time-pav6zq.apollographos.net/graphql",
    uri: "https://brexolsurgicalinstruments.com/graphql",
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"  && httpLink,
      // typeof window === "undefined"
      // ? ApolloLink.from([
      //       new SSRMultipartLink({
      //         stripDefer: true,
      //       }),
      //       httpLink,
      //     ])
      //   :httpLink
  });
}

export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
