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
  numWords: number;
  hallmarks: string[];
  userInfo?: UserInfo;
}

export class SystemStore {
  @observable user?: UserInfo;
  @observable dialects: Dialect[] = [];
  @observable hallmarks: string[] = [];
  @observable screenWidth: number = 0;

  @action
  setScreenWidth(screenWidth: number) {
    this.screenWidth = screenWidth;
  }

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

  @action
  setInitialHallmarks(hallmarks: string[]) {
    this.hallmarks = hallmarks;
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

  get isMobileView(): boolean {
    return this.screenWidth < 500;
  }
}
