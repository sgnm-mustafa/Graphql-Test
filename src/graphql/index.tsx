import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { MultiAPILink } from "@habx/apollo-multi-endpoint-link";
import React, { ReactNode } from "react";

const GQLProvider = ({ children }: { children: ReactNode }) => {

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const countryUrl = process.env.COUNTRY_API as string;

  const client = new ApolloClient({
    link: from([
      new MultiAPILink({
        endpoints: {
          country: countryUrl + "graphql",
        },
        httpSuffix: "",
        createHttpLink: () => {
          return createHttpLink({

          });
        },
      }),
    ]),
    cache: new InMemoryCache(),
  });
  console.log(client);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export { GQLProvider };