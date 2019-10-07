import { observable, action } from 'mobx';

export interface Word {
  text: string;
}

export class WordStore {
  @observable words: Word[] = [];

  @action
  addWord(word: Word) {
    this.words.push(word);
  }
}
