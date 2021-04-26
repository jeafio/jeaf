import { LRUCache } from './LRUCache';

describe('LRU', function() {

  let lru: LRUCache<any>;

  beforeEach(() => {
    lru = new LRUCache<any>(3);
  });

  it('should return saved value', function() {
    lru.put('a', 1234);
    expect(lru.get('a')).toBe(1234);
  });

  it('should save up to 3 elements', function() {
    lru.put('a', 1);
    lru.put('b', 2);
    lru.put('c', 3);
    expect(lru.get('a')).toBe(1);
    expect(lru.get('b')).toBe(2);
    expect(lru.get('c')).toBe(3);
  });

  it('should not overflow the capacity', function() {
    lru.put('a', 1);
    lru.put('b', 2);
    lru.put('c', 3);
    lru.put('d', 4);
    expect(lru.get('a')).toBeUndefined();
    expect(lru.get('b')).toBe(2);
    expect(lru.get('c')).toBe(3);
    expect(lru.get('d')).toBe(4);
  });

  it('should remove the last recently used element first', function() {
    lru.put('a', 1);
    lru.put('b', 2);
    lru.put('c', 3);
    lru.get('a');
    lru.put('d', 4);

    expect(lru.get('a')).toBe(1);
    expect(lru.get('b')).toBeUndefined();
    expect(lru.get('c')).toBe(3);
    expect(lru.get('d')).toBe(4);

    lru.put('e', 5);
    expect(lru.get('a')).toBeUndefined();
  });
});