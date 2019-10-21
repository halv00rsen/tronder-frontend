import React from 'react';
import { Provider } from 'mobx-react';
import './App.css';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from 'aws-exports';

import { store } from 'store/Store';
import MainView from 'views/MainView/MainView';

Amplify.configure({
  ...awsconfig,
  API: {
    endpoints: [{
      name: 'tronder-api',
      endpoint: 'http://localhost:1234',
      custom_header: async () => {
        try {
          return {
            'Authorization': 'Bearer ' + (await Auth.currentSession()).getIdToken().getJwtToken(),
          };
        } catch {
          return {};
        }
      }
    }],
  }
});

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <MainView/>
      </Provider>
    </div>
  );
};

export default App;
