import { Cache } from './Cache';
import { DLLNode, DoublyLinkedList } from '@jeafio/data';

interface LRUNode<T> {
  key: string;
  value: T;
}

export class LRUCache<T> implements Cache<T> {

  private readonly capacity: number;
  private readonly lookupTable: Map<string, DLLNode<LRUNode<T>>> = new Map();
  private readonly list: DoublyLinkedList<LRUNode<T>> = new DoublyLinkedList<LRUNode<T>>();

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  public put(key: string, value: T): void {
    if (this.lookupTable.size >= this.capacity) {
      const lastNode = this.list.getLast();
      this.list.removeLast();
      this.lookupTable.delete((lastNode as LRUNode<T>).key);
    }
    const newNode = this.list.addFirst({key, value});
    this.lookupTable.set(key, newNode);
  }

  public get(key: string): T | undefined {
    const node = this.lookupTable.get(key);
    if (node) {
      this.list.removeNode(node);
      const newNode = this.list.addFirst(node.data);
      this.lookupTable.set(key, newNode);
      return node.data.value;
    }
  }
}