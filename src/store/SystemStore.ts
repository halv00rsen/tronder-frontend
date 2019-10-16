import { observable, action } from 'mobx';

export interface UserInfo {
  email: string;
  name: string;
}

export interface Dialect {
  id: string;
  displayName: string;
  description: string;
}

export class SystemStore {
  @observable user?: UserInfo;
  @observable dialects: Dialect[] = [];

  @action
  addDialect(dialect: Dialect) {
    this.dialects.push(dialect);
  }

  @action
  setUserInfo(user?: UserInfo) {
    this.user = user;
  }

  @action
  setInitialDialects(dialects: Dialect[]) {
    this.dialects = dialects;
  }

  get isLoggedIn() {
    return this.user !== undefined;
  }
}
