export class List<T> {
  list: Array<T>;

  constructor(list: Array<T>) {
    this.list = list;
  }

  empty() {
    return this.list.length === 0;
  }

  first() {
    return this.empty() ? undefined : this.list[0];
  }

  last() {
    return this.empty() ? undefined : this.list[this.list.length - 1];
  }

  getNextIndex(index: number) {
    if (!(index in this.list)) throw RangeError(`index '${index}' not in list`);
    return index + 1 === this.list.length ? 0 : index + 1;
  }

  getPreviousIndex(index: number) {
    if (!(index in this.list)) throw RangeError(`index '${index}' not in list`);
    return index === 0 ? this.list.length - 1 : index - 1;
  }
}
