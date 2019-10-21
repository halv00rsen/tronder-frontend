import { observable, action, computed } from 'mobx';
import { Dialect } from './SystemStore';
import { API } from 'aws-amplify';

export interface Word {
  id: number;
  wordText: string;
  translation: string;
  description: string;
}

export class WordStore {

  @observable words: Word[] = [];
  @observable activeDialect?: Dialect = undefined;

  @action
  addWord(word: Word) {
    if (!this.activeDialect) {
      return;
    }
    API.post('tronder-api', `/dialect/${this.activeDialect.id}/word`, {
      body: word,
    }).then((word: Word) => {
      this.words.push(word);
    });
  }

  @action
  setActiveDialect(dialect?: Dialect) {
    if (dialect) {
      this.activeDialect = dialect;
      API.get('tronder-api', `/dialect/${dialect.id}/word`, {}).then((words: Word[]) => {
        this.words = words;
      });
    } else {
      this.activeDialect = undefined;
      this.words = [];
    }
  }

  @computed
  get isActiveDialect(): boolean {
    return this.activeDialect !== undefined;
  }
}
