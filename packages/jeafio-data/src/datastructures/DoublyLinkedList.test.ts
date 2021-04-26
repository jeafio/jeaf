import { DoublyLinkedList } from './DoublyLinkedList';

describe('DoublyLinkedList', function() {
  let list: DoublyLinkedList<any>;

  beforeEach(() => {
    list = new DoublyLinkedList<any>();
  });

  it('should have no head when empty', function() {
    expect(list.getFirst()).toBeUndefined();
  });

  it('should have not tail when empty', function() {
    expect(list.getLast()).toBeUndefined();
  });

  it('head and tail should be the same if one element is present', function() {
    list.add('Test');
    expect(list.getFirst()).toBe('Test');
    expect(list.getLast()).toBe('Test');
  });

  it('head and tail should differ > 1 element', function() {
    list.add('Test');
    list.add('Test2');
    expect(list.getFirst()).toBe('Test');
    expect(list.getLast()).toBe('Test2');
  });

  it('should return the first element', function() {
    list.add('Test');
    expect(list.get(0)).toBe('Test');
  });

  it('should return the second element', function() {
    list.add('Test');
    list.add('Test2');
    list.add('Test3');
    expect(list.get(1)).toBe('Test2');
  });

  it('should return the last element', function() {
    list.add('Test');
    list.add('Test2');
    list.add('Test3');
    expect(list.get(2)).toBe('Test3');
  });

  it('should remove first node', function() {
    list.add('Test');
    list.add('Test2');
    list.add('Test3');
    expect(list.getFirst()).toBe('Test');
    list.remove(0);
    expect(list.getFirst()).toBe('Test2');
  });

  it('should remove second node', function() {
    list.add('Test');
    list.add('Test2');
    list.add('Test3');
    expect(list.get(1)).toBe('Test2');
    list.remove(1);
    expect(list.get(1)).toBe('Test3');
  });

  it('should remove last node', function() {
    list.add('Test');
    list.add('Test2');
    list.add('Test3');
    expect(list.getLast()).toBe('Test3');
    list.remove(2);
    expect(list.getLast()).toBe('Test2');
  });

  it('should remove first node if one exists', function() {
    list.add('Test');
    expect(list.getFirst()).toBe('Test');
    expect(list.getLast()).toBe('Test');
    list.removeFirst();
    expect(list.getFirst()).toBeUndefined();
    expect(list.getLast()).toBeUndefined();
  });

  it('should remove list node if one exists', function() {
    list.add('Test');
    expect(list.getFirst()).toBe('Test');
    expect(list.getLast()).toBe('Test');
    list.removeLast();
    expect(list.getFirst()).toBeUndefined();
    expect(list.getLast()).toBeUndefined();
  });

  it('should remove first node if two exists', function() {
    list.add('Test');
    list.add('Test2');
    expect(list.getFirst()).toBe('Test');
    expect(list.getLast()).toBe('Test2');
    list.removeFirst();
    expect(list.getFirst()).toBe('Test2');
    expect(list.getLast()).toBe('Test2');
  });

  it('should remove last node if two exists', function() {
    list.add('Test');
    list.add('Test2');
    expect(list.getFirst()).toBe('Test');
    expect(list.getLast()).toBe('Test2');
    list.removeLast();
    expect(list.getFirst()).toBe('Test');
    expect(list.getLast()).toBe('Test');
  });

  it('should remove last node if more then two exists', function() {
    list.add('Test');
    list.add('Test2');
    list.add('Test3');
    expect(list.getFirst()).toBe('Test');
    expect(list.getLast()).toBe('Test3');
    list.removeLast();
    expect(list.getFirst()).toBe('Test');
    expect(list.getLast()).toBe('Test2');
  });

  it('should remove first node if more then two exists', function() {
    list.add('Test');
    list.add('Test2');
    list.add('Test3');
    expect(list.getFirst()).toBe('Test');
    expect(list.getLast()).toBe('Test3');
    list.removeFirst();
    expect(list.getFirst()).toBe('Test2');
    expect(list.getLast()).toBe('Test3');
  });

  it('should add a new element to the index 0', function() {
    list.add('Test');
    list.addAt(0, 'Test2');
    expect(list.getFirst()).toBe('Test2');
  });

  it('should throw an error if index is oob', function() {
    expect(() => {
      list.addAt(100, 'Test');
    }).toThrowError('Index out of bound');
  });

  it('should add a new element to the middle', function() {
    list.add('Test');
    list.add('Test2');
    list.addAt(1, 'Test3');
    expect(list.get(0)).toBe('Test');
    expect(list.get(1)).toBe('Test3');
    expect(list.get(2)).toBe('Test2');
  });

  it('should return undefined if element does not exists', function() {
    expect(list.get(100)).toBeUndefined();
  });

  it('should throw if list is empty when removing last element', function() {
    expect(() => {
      list.removeLast();
    }).toThrowError('List is empty')
  });

  it('should throw if list is empty when removing first element', function() {
    expect(() => {
      list.removeFirst();
    }).toThrowError('List is empty')
  });

  it('should throw if index if out of bound when removing an element', function() {
    expect(() => {
      list.remove(1);
    }).toThrowError('Index out of bound')
  });
});