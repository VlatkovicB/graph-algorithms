export class PriorityQueue {
  constructor(comparator = (a, b) => a.distance - b.distance) {
    this._heap = []
    this._comparator = comparator
  }

  size() {
    return this._heap.length
  }

  isEmpty() {
    return this.size() == 0
  }

  push(...values) {
    values.forEach((value) => {
      this._heap.push(value)
    })
    this._sort()
    return this.size()
  }

  pop() {
    const popped = this._heap.shift()
    this._sort()
    return popped
  }

  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j])
  }

  _swap(i, j) {
    ;[this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]]
  }

  _sort() {
    this._heap = this._heap.sort(this._comparator)
  }

  toString() {
    return this._heap
  }
}
