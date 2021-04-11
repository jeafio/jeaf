import { getContainer } from './getContainer';
import { Container } from '../Container';

describe('getContainer', function () {
  it('should return a container instance', function () {
    expect(getContainer()).toBeInstanceOf(Container);
  });

  it('should always return the same container instance', function () {
    const c1 = getContainer();
    const c2 = getContainer();
    expect(c1).toBe(c2);
  });
});
