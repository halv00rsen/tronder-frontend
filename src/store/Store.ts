
import { WordStore } from './WordStore';
import { SystemStore } from './SystemStore';

export class Store {
  wordStore: WordStore;
  system: SystemStore;

  constructor() {
    this.wordStore = new WordStore();
    this.system = new SystemStore();
  }
}

export interface InjectedStoreProps {
  store: Store;
}

export const store = new Store();
