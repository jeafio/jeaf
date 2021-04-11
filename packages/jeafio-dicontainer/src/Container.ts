import { Constructor } from '@jeafio/data';
import { ManagedComponent } from './ManagedComponent';
import { ComponentConfig } from './ComponentConfig';
import { ComponentResolver } from './ComponentResolver';
import { ComponentScope } from './ComponentScope';
import { instanceResolver } from './resolver/instanceResolver';
import { singletonResolver } from './resolver/singletonResolver';
import { GeneratorConfig } from './GeneratorConfig';
import { generatorResolver } from './resolver/generatorResolver';

export class Container {
  /**
   * Contains a map of all registered components and the
   * resolver that can be used to receive an instance
   * @private
   */
  private components: ManagedComponent[] = [];

  /**
   * Makes a constructor available by any other container managed
   * component and lets the container manage its lifetime.
   * @param constructor
   * @param config
   */
  public register<T extends object>(constructor: Constructor<T>, config: ComponentConfig = {}): void {
    const scope = config.scope || ComponentScope.SINGLETON;
    const resolver = config.resolver || this.getResolver(constructor, scope);

    this.components.push({
      type: constructor,
      name: config.name,
      primary: config.primary,
      scope,
      resolver,
    });

    this.registerGenerator(constructor);
  }

  /**
   * Returns true if the given constructor is registered.
   * @param constructor
   */
  public has(constructor: Constructor): boolean {
    return !!this.components.find((c) => c.type === constructor);
  }

  public resolve<T extends object>(name: string, resolvedComponents?: Constructor[]): T;
  public resolve<T extends object>(component: Constructor<T>, resolvedComponents?: Constructor[]): T;
  public resolve<T extends object>(
    componentOrName: string | Constructor<T>,
    resolvedComponents: Constructor[] = [],
  ): T {
    if (typeof componentOrName === 'string') {
      return this.resolveByName(componentOrName, resolvedComponents);
    }
    return this.resolveByType(componentOrName, resolvedComponents);
  }

  /**
   * Resolves a component with a given type.
   * @param constructor
   * @param resolvedComponents
   * @private
   */
  private resolveByType<T extends object>(constructor: Constructor<T>, resolvedComponents: Constructor[]): T {
    if (resolvedComponents.indexOf(constructor) > -1) {
      throw new Error(
        `Detected circular dependency (${resolvedComponents.map((c) => c.name).join(' -> ')} -> ${constructor.name})`,
      );
    }
    resolvedComponents.push(constructor);

    const validComponents = this.components.filter((c) => {
      // eslint-disable-next-line no-prototype-builtins
      return c.type === constructor || constructor.isPrototypeOf(c.type);
    });
    if (validComponents.length === 0) {
      throw new Error(`Could not resolve ${constructor.name}. Component not found.`);
    }
    if (validComponents.length === 1) {
      return validComponents[0].resolver(resolvedComponents) as T;
    }
    const primaryComponent = validComponents.find((c) => c.primary);
    if (primaryComponent) {
      return primaryComponent.resolver(resolvedComponents) as T;
    }
    throw new Error(
      `Could not resolve ${
        constructor.name
      }. Found multiple components that would satisfy the request: ${validComponents
        .map((c) => c.type.name)
        .join(',')}`,
    );
  }

  /**
   * Resolves a component with a given name.
   * @param name
   * @param resolvedComponents
   * @private
   */
  private resolveByName<T extends object>(name: string, resolvedComponents: Constructor[]): T {
    const validComponents = this.components.filter((c) => c.name === name);
    if (validComponents.length === 0) {
      throw new Error(`Could not resolve qualifier ${name}. Component not found.`);
    }
    if (validComponents.length === 1) {
      return this.resolveByType(validComponents[0].type as Constructor<T>, resolvedComponents);
    }
    const primaryComponent = validComponents.find((c) => c.primary);
    if (primaryComponent) {
      return this.resolveByType(primaryComponent.type as Constructor<T>, resolvedComponents);
    }
    throw new Error(
      `Could not resolve ${name}. Found multiple components with the same name: ${validComponents
        .map((c) => c.type.name)
        .join(', ')}`,
    );
  }

  /**
   * Registers all generators of a constructor.
   * @param constructor
   * @private
   */
  private registerGenerator(constructor: Constructor): void {
    const generators = Reflect.getMetadata('ioc:generators', constructor);
    for (const method in generators) {
      const { type, ...config } = generators[method] as GeneratorConfig;
      this.register(type, { ...config, resolver: generatorResolver(this, constructor, method as keyof typeof type) });
    }
  }

  /**
   * Returns the correct resolver for the given scope.
   * @param constructor
   * @param scope
   * @private
   */
  private getResolver<T extends object>(constructor: Constructor<T>, scope: ComponentScope): ComponentResolver<T> {
    if (scope === ComponentScope.INSTANCE) {
      return instanceResolver(this, constructor);
    }
    return singletonResolver(this, constructor);
  }
}
