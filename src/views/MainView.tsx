import React, { useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { InjectedStoreProps } from 'store/Store';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import ApplicationView from './ApplicationView';
import LoginView from './LoginView';
import { HubCapsule } from '@aws-amplify/core/lib/Hub';


const MainView: React.FC = (props) => {

  const [loading, setLoading] = useState(true);
  const [store] = useState((props as InjectedStoreProps).store);


  useEffect(() => {
    const setLoggedUser = (data: any) => {
      setLoading(false);
      if (data) {
        store.system.setUserInfo({
          email: data.attributes.email,
          name: data.attributes.name,
        });
      } else {
        store.system.setUserInfo(undefined);
      }
    };

    Auth.currentAuthenticatedUser().then((user) => {
      setLoggedUser(user);
    }).catch(err => {
      setLoggedUser(undefined);
    });

    const listener = (data: HubCapsule) => {
      if (data.payload.event === 'signIn') {
        setLoggedUser(data.payload.data);
      } else {
        setLoggedUser(undefined);
      }
    };

    Hub.listen('auth', listener);
    return () => {
      Hub.remove('auth', listener);
    };
  }, [store.system]);


  return (
    <div>
      {loading ?
        'laster...' :
        (store.system.isLoggedIn ? <ApplicationView/> : <LoginView/>)
      }
    </div>
  );
};

export default inject('store')(observer(MainView));
