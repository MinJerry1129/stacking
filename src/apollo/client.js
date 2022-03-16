import { WebSocketLink } from "apollo-link-ws";
import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import {httpLink1_uri, httpLink2_uri, wsLink1_uri, wsLink2_uri} from "../constants";


const httpLink1 = new HttpLink({
  uri: httpLink1_uri
});

const wsLink1 = new WebSocketLink({
  uri: wsLink1_uri,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        Authorization: "Bearer yourauthtoken",
      },
    },
  },
});

const splitLink1 = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink1,
  httpLink1,
);

export const client = new ApolloClient({
  link: splitLink1,
  cache: new InMemoryCache(),
  shouldBatch: true,
});


const httpLink2 = new HttpLink({
  uri: httpLink2_uri
});

const wsLink2 = new WebSocketLink({
  uri: wsLink2_uri,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        Authorization: "Bearer yourauthtoken",
      },
    },
  },
});

const splitLink2 = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink2,
  httpLink2,
);

export const client1 = new ApolloClient({
  link: splitLink2,
  cache: new InMemoryCache(),
  shouldBatch: true,
});
