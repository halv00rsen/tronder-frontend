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
      endpoint: process.env.REACT_APP_API_URL,
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
