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

  private wordsInDialect: {[dialectId: number]: Word[]} = {};

  @observable words: Word[] = [];
  @observable activeDialect?: Dialect = undefined;

  @action
  addWord(word: Word) {
    if (!this.activeDialect) {
      return;
    }
    const dialectId = this.activeDialect.id;
    API.post('tronder-api', `/dialect/${this.activeDialect.id}/word`, {
      body: word,
    }).then((word: Word) => {
      this.wordsInDialect[dialectId].push(word);
      this.words.push(word);
    });
  }

  @action
  setActiveDialect(dialect?: Dialect) {
    if (dialect) {
      this.activeDialect = dialect;
      if (this.isWordsLoadedForDialect(dialect)) {
        this.words = this.getWordsInDialect(dialect);
      } else {
        this.loadWordsForDialect(dialect);
      }
    } else {
      this.removeActiveDialect();
    }
  }

  @action
  reloadActiveDialect(): void {
    if (this.activeDialect === undefined) {
      throw new Error('Cannot reload words when no dialect is chosen');
    }
    this.loadWordsForDialect(this.activeDialect);
  }

  @action
  private removeActiveDialect(): void {
    this.activeDialect = undefined;
    this.words = [];
  }

  @action
  private loadWordsForDialect(dialect: Dialect): void {
    API.get('tronder-api', `/dialect/${dialect.id}/word`, {}).then((words: Word[]) => {
      this.wordsInDialect[dialect.id] = words;
      this.words = words;
    });
  }

  private isWordsLoadedForDialect(dialect: Dialect): boolean {
    try {
      this.getWordsInDialect(dialect);
      return true;
    } catch {
      return false;
    }
  }

  private getWordsInDialect(dialect: Dialect): Word[] {
    const dialectId = dialect.id;
    if (this.wordsInDialect[dialectId] !== undefined) {
      return this.wordsInDialect[dialectId];
    }
    throw new Error(`No words found for dialect ${dialectId}`);
  }

  @computed
  get isActiveDialect(): boolean  {
    return this.activeDialect !== undefined;
  }

}
