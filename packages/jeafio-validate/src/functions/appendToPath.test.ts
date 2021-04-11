import { appendToPath } from './appendToPath';

describe('appendToPath', () => {
  it('should return property name if no path is set', () => {
    expect(appendToPath('', 'test')).toEqual('test');
  });

  it('should append property name with . to existing path', () => {
    expect(appendToPath('person', 'name')).toEqual('person.name');
  });

  it('should append index to existing path', () => {
    expect(appendToPath('person', '[0]')).toEqual('person[0]');
  });
});
