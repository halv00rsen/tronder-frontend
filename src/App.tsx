import React from 'react';
import { Provider } from 'mobx-react';
import './App.css';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from 'aws-exports';

import { store } from 'store/Store';
import MainView from 'views/MainView';

Amplify.configure({
  ...awsconfig,
  API: {
    endpoints: [{
      name: 'meetwithme',
      endpoint: 'http://localhost:8080',
      custom_header: async () => {
        return {
          'Authorization': (await Auth.currentSession()).getIdToken().getJwtToken(),
        };
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
