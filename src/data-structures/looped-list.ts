export class LoopedList<T> {
  list: Array<T>;
  index: number;
  bookmark: number | undefined;

  constructor(list: Array<T>) {
    if (list.length === 0) throw TypeError('list is empty');
    this.list = list;
    this.index = 0;
  }

  setBookmark() {
    this.bookmark = this.index;
  }

  getBookmark() {
    return this.bookmark === undefined ? undefined : this.list[this.bookmark];
  }

  // advances index, last item loops back to first item
  step() {
    this.index = this.getNextIndex();
  }

  first() {
    return this.list[0];
  }

  last() {
    return this.list[this.list.length - 1];
  }

  current() {
    return this.list[this.index];
  }

  next() {
    return this.list[this.getNextIndex()];
  }

  previous() {
    return this.list[this.getPreviousIndex()];
  }

  private getNextIndex() {
    return this.index + 1 === this.list.length ? 0 : this.index + 1;
  }

  private getPreviousIndex() {
    return this.index === 0 ? this.list.length - 1 : this.index - 1;
  }
}
