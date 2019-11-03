
export interface DisplayRoute {
  path: string;
  displayName: string;
}

export interface RelativeDisplayRoute extends DisplayRoute {
  relativePath: (dialectId: number) => string;
}

type Routes = {
  words: RelativeDisplayRoute,
  notFound: DisplayRoute,
  newEntry: RelativeDisplayRoute,
  login: DisplayRoute,
  dialect: DisplayRoute,
  privateDialects: DisplayRoute,
  user: DisplayRoute,
  newDialect: DisplayRoute,
  home: DisplayRoute,
};


export const routes: Routes = {
  words: {
    displayName: 'Masse ord',
    path: '/dialect/:dialectId/words',
    relativePath(dialectId: number): string {
      return `/dialect/${dialectId}/words`;
    },
  },
  notFound: {
    displayName: 'Ikke funnet',
    path: '/notFound',
  },
  newEntry: {
    displayName: 'Nytt uttrykk',
    path: '/dialect/:dialectId/new',
    relativePath(dialectId: number): string {
      return `/dialect/${dialectId}/new`;
    },
  },
  login: {
    displayName: 'Logg inn',
    path: '/login',
  },
  privateDialects: {
    displayName: 'Dine mål',
    path: '/user-dialects',
  },
  dialect: {
    displayName: 'Dialekter',
    path: '/dialects',
  },
  user: {
    displayName: 'Bruker',
    path: '/user',
  },
  newDialect: {
    displayName: 'Ny dialekt',
    path: '/new-dialect',
  },
  home: {
    displayName: 'Hjem',
    path: '/',
  },
};
