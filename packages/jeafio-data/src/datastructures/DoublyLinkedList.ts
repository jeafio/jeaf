import { DLLNode } from './DLLNode';
import assert from 'assert';

/**
 * A doubly linked list has an additional pointer known
 * as the previous pointer in its node apart from the
 * data part and the next pointer as in the singly linked list.
 */
export class DoublyLinkedList<T> {

  /**
   * The current head of the linked list
   * @private
   */
  private head: DLLNode<T> | null = null;

  /**
   * The current tail of the linked list
   * @private
   */
  private tail: DLLNode<T> | null = null;

  /**
   * Adds a new node to the list
   * @param data
   */
  public add(data: T): void {
    const newNode = new DLLNode(data);
    if (this.tail) {
      this.tail.next = newNode;
      newNode.previous = this.tail;
      this.tail = newNode;
      this.tail.next = null;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }
  }

  public addAt(index: number, data: T): void {
    const newNode = new DLLNode(data);
    const node = this.getNode(index);
    assert(node, 'Index out of bound');

    if (node.previous) {
      newNode.next = node;
      newNode.previous = node.previous;
      node.previous.next = newNode;
      node.previous = newNode;
    } else {
      this.head = newNode;
      newNode.next = node;
      node.previous = newNode;
    }
  }

  public get(index: number): T | undefined {
    const node = this.getNode(index);
    return node?.data;
  }

  private getNode(index: number): DLLNode<T> | null {
    let pointer = this.head;
    while (index-- > 0 && pointer) {
      pointer = pointer.next;
    }
    return pointer;
  }

  public removeFirst(): void {
    assert(this.head, 'List is empty');
    if (this.head.next) {
      this.head.next.previous = null;
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
  }

  public removeLast(): void {
    assert(this.tail, 'List is empty');
    if (this.tail.previous) {
      this.tail.previous.next = null;
      this.tail = this.tail.previous;
    } else {
      this.head = null;
      this.tail = null;
    }
  }

  public remove(index: number): void {
    const node = this.getNode(index);
    assert(node, 'Index out of bound');
    if (this.head === node) {
      this.head = node.next;
    }
    if (this.tail === node) {
      this.tail = node.previous;
    }
    if (node.previous) {
      node.previous.next = node.next;
    }
    if (node.next) {
      node.next.previous = node.previous;
    }
  }

  /**
   * Returns the first element in the list
   */
  public getFirst(): T | undefined {
    return this.head?.data;
  }

  /**
   * Returns the last element in the list
   */
  public getLast(): T | undefined {
    return this.tail?.data;
  }
}