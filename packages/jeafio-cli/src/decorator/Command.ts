import 'reflect-metadata';

export function Command(description: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    Reflect.defineMetadata('cli:command', description, target, propertyKey);
    const commands = Reflect.getMetadata('cli:commands', target) || [];
    commands.push(propertyKey);
    Reflect.defineMetadata('cli:commands', commands, target);
  };
}
