
import { WordStore } from './WordStore';

export class Store {
  wordStore: WordStore;

  constructor() {
    this.wordStore = new WordStore();
  }
}

export const store = new Store();
