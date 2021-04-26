/**
 * The node object for a double linked list.
 */
export class DLLNode<T> {

  /**
   * Contains the nodes data
   */
  public data: T;

  /**
   * Pointer to the next node.
   */
  public previous: DLLNode<T> | null = null;

  /**
   * Pointer to the previous node.
   */
  public next: DLLNode<T> | null = null;

  /**
   * @constructor
   * @param data
   */
  constructor(data: T) {
    this.data = data;
  }
}