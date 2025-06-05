// loop back to the beginning of the array
function getNext<T>(list: Array<T>, currentIndex: number) {
  if (list.length === 0) throw Error('list is empty');
  const index = currentIndex + 1 === list.length ? 0 : currentIndex + 1;
  const value = list[index];
  return { index, value };
}

function getValue<T>(list: Array<T>, index: number) {
  return index in list ? list[index] : undefined;
}

export class List<T> {
  private list: Array<T>;
  private currentIndex: number | undefined;

  constructor(list?: Array<T>) {
    this.list = list || [];
    return new Proxy(this, {});
  }

  isEmpty() {
    return this.list.length === 0;
  }

  getNext() {
    if (this.isEmpty()) throw Error('list is empty');
    this.currentIndex =
      this.currentIndex === undefined ||
      this.currentIndex + 1 === this.list.length
        ? 0
        : this.currentIndex + 1;
    return this.list[this.currentIndex];
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
