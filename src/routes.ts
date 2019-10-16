
interface DisplayRoute {
  path: string;
  displayName: string;
}

type Routes = {
  words: DisplayRoute,
  expressions: DisplayRoute,
  notFound: DisplayRoute,
  newEntry: DisplayRoute,
  login: DisplayRoute,
};


export const routes: Routes = {
  words: {
    displayName: 'Ord',
    path: '/words',
  },
  expressions: {
    displayName: 'Uttrykk',
    path: '/expressions',
  },
  notFound: {
    displayName: 'Ikke funnet',
    path: '/notFound',
  },
  newEntry: {
    displayName: 'Nytt uttrykk',
    path: '/new',
  },
  login: {
    displayName: 'Logg inn',
    path: '/login',
  },
};
