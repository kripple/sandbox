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

// push, pop, shift, unshift

// list.add("Apple");           // Add to end
// list.addFirst("Banana");     // Add to front
// list.addLast("Cherry");      // Add to end (same as add)
// list.add(1, "Date");         // Insert at index 1

// String first = list.getFirst();  // "Banana"
// String last = list.getLast();    // "Cherry"
// String second = list.get(1);     // "Date"

// list.set(2, "Avocado");  // Replace element at index 2

// list.removeFirst();      // Removes "Banana"
// list.removeLast();       // Removes "Cherry"
// list.remove(1);          // Removes element at index 1 ("Avocado" after previous removes)
// list.remove("Date");     // Removes first occurrence of "Date"

// int size = list.size();
// boolean hasApple = list.contains("Apple");
// boolean isEmpty = list.isEmpty();
