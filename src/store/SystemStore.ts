import { observable, action } from 'mobx';

export interface UserInfo {
  email: string;
  name: string;
  sub: string;
}

export interface Dialect {
  id: number;
  displayName: string;
  description: string;
  createdBy: string;
  publicDialect: boolean;
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

  get userDialects(): Dialect[] {
    if (this.user) {
      return this.dialects.filter((dialect) => dialect.createdBy === this.user!.sub);
    }
    return [];
  }

  get publicDialects(): Dialect[] {
    return this.dialects.filter((dialect) => dialect.publicDialect);
  }
}
