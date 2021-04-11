import { Value } from './Value';
import { Container } from '@jeafio/dicontainer';
import { Profile } from '../Profile';
import { getContainer } from '@jeafio/dicontainer';

class T {
  @Value('name')
  public declare name: string;
}

describe('@Value', () => {
  let profile: Partial<Profile>;

  beforeAll(() => {
    profile = {
      get: jest.fn().mockReturnValue('test'),
    };
    const container = getContainer();
    jest.spyOn(container, 'resolve').mockReturnValue(profile);
  });

  it('should call profile.get on getter call', () => {
    const t = new T();
    t.name;
    expect(profile.get).toHaveBeenCalledWith('name');
  });

  it('should return the profiles value', () => {
    const t = new T();
    expect(t.name).toBe('test');
  });
});
