
interface DisplayRoute {
  path: string;
  displayName: string;
}

type Routes = {
  words: DisplayRoute,
  notFound: DisplayRoute,
  newEntry: DisplayRoute,
  login: DisplayRoute,
  dialect: DisplayRoute,
};


export const routes: Routes = {
  words: {
    displayName: 'Ord',
    path: '/words',
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
  dialect: {
    displayName: 'Dialect',
    path: '/dialect',
  },
};
