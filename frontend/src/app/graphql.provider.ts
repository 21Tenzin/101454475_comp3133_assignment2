import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { inject } from '@angular/core';

export const graphqlProvider = [
  provideApollo(() => {
    const httpLink = inject(HttpLink);
    return {
      cache: new InMemoryCache(),
      link: httpLink.create({
        uri: 'http://localhost:4000/graphql',
      }),
    };
  }),
];
