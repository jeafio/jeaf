import { Container } from '../Container';
import { singletonResolver } from './singletonResolver';
import * as InstanceResolver from './instanceResolver';

describe('singletonResolver', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call instanceResolver', () => {
    class A {}
    const container = new Container();
    const resolver = singletonResolver(container, A);
    const resolvedValue = {};
    jest.spyOn(InstanceResolver, 'instanceResolver').mockReturnValue(() => resolvedValue);
    expect(resolver([])).toBe(resolvedValue);
    expect(InstanceResolver.instanceResolver).toHaveBeenCalledWith(container, A);
  });

  it('should not call instanceResolver the second time', () => {
    class A {}
    const container = new Container();
    const resolver = singletonResolver(container, A);
    const resolvedValue = {};
    jest.spyOn(InstanceResolver, 'instanceResolver').mockReturnValue(() => resolvedValue);
    expect(resolver([])).toBe(resolvedValue);
    expect(resolver([])).toBe(resolvedValue);
    expect(InstanceResolver.instanceResolver).toHaveBeenCalledTimes(1);
  });
});
