export class List<T> {
  list: Array<T>;
  index: number | undefined;

  constructor(list?: Array<T>) {
    this.list = list || [];
  }

  isEmpty() {
    return this.list.length === 0;
  }

  // advances index, last item loops back to first item
  step() {
    this.index = this.getNextIndex();
  }

  // opposite of `step`
  backstep() {
    this.index = this.getPreviousIndex();
  }

  first() {
    return this.isEmpty() ? undefined : this.list[0];
  }

  last() {
    return this.isEmpty() ? undefined : this.list[this.list.length - 1];
  }

  current() {
    return this.isEmpty() || this.index === undefined
      ? undefined
      : this.list[this.index];
  }

  next() {
    this.step();
    return this.current();
  }

  nextValue() {
    const nextIndex = this.getNextIndex();
    return this.isEmpty() ? undefined : this.list[nextIndex];
  }

  previous() {
    this.backstep();
    return this.current();
  }

  previousValue() {
    const previousIndex = this.getPreviousIndex();
    return this.isEmpty() ? undefined : this.list[previousIndex];
  }

  private getNextIndex() {
    return this.index === undefined || this.index + 1 === this.list.length
      ? 0
      : this.index + 1;
  }

  private getPreviousIndex() {
    return this.index === undefined || this.index === 0
      ? this.list.length - 1
      : this.index - 1;
  }
}
