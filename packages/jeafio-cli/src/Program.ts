import { Command } from 'commander';
import 'reflect-metadata';

export class Program {
  private readonly cli: Command;
  private readonly subPrograms: object[] = [];

  constructor(version?: string) {
    this.cli = new Command() as Command;
    if (version) {
      this.cli.version(version, '-v, --version', 'display program version');
    }
  }

  public run(args: string[] = process.argv): void {
    const commands = Reflect.getMetadata('cli:commands', this);
    this.registerCommand(this.cli, this, 'main', true);
    if (commands) {
      for (const propertyKey of commands) {
        this.registerCommand(this.cli, this, propertyKey);
      }
    }

    this.subPrograms.forEach((subProgram) => {
      const commands = Reflect.getMetadata('cli:commands', subProgram);
      if (commands) {
        for (const propertyKey of commands) {
          this.registerCommand(this.cli, subProgram, propertyKey);
        }
      }
    });

    this.cli.parse(args);
  }

  protected addSubProgram(subProgram: object): void {
    this.subPrograms.push(subProgram);
  }

  private registerCommand(cli: Command, program: any, propertyKey: string, isDefault?: boolean) {
    const commandName = Reflect.getMetadata('cli:command', program, propertyKey);
    const commandOptions = Reflect.getMetadata('cli:options', program, propertyKey);
    const commandDescriptions = Reflect.getMetadata('cli:description', program, propertyKey);
    const command = cli.command(commandName, isDefault ? { isDefault: true, hidden: true } : undefined);
    if (commandDescriptions) {
      command.description(commandDescriptions);
    }
    if (commandOptions) {
      commandOptions.forEach((option: any) => {
        command.option(option.flags, option.description, option.defaultValue);
      });
    }
    command.action(program[propertyKey].bind(program));
  }
}
