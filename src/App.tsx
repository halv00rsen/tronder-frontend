import React from 'react';
import { Provider } from 'mobx-react';
import './App.css';
import { store } from './store/Store';
import MainView from './views/MainView';


const App: React.FC = () => {

  return (
    <div className="App">
      <Provider store={store}>
        <MainView/>
      </Provider>
    </div>
  );
}

export default App;
