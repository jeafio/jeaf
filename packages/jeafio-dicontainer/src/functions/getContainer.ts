import { Container } from '../Container';

let staticContainer: Container;

/**
 * Returns a static Container instance used by
 * all decorators.
 */
export function getContainer(): Container {
  if (!staticContainer) {
    staticContainer = new Container();
  }
  return staticContainer;
}
