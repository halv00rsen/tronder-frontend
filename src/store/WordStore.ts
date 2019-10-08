import { observable, action } from 'mobx';

export interface Word {
  text: string;
  meaning: string;
}

export class WordStore {
  @observable words: Word[] = [];
  @observable expressions: Word[] = [];

  @action
  addWord(word: Word) {
    if (this.isSentence(word)) {
      this.expressions.push(word);
    } else {
      this.words.push(word);
    }
  }

  private isSentence(word: Word): boolean {
    return word.text.indexOf(' ') > -1;
  }
}
