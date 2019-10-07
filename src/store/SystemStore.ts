import { observable, action } from 'mobx';

export interface UserInfo {
  email: string;
  name: string;
}

export class SystemStore {
  @observable user?: UserInfo;

  @action
  setUserInfo(user?: UserInfo) {
    this.user = user;
  }

  get isLoggedIn() {
    return this.user !== undefined;
  }
}
