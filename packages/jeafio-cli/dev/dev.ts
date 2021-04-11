import { Program } from '../src/Program';
import { Description } from '../src/decorator/Description';
import { Option } from '../src/decorator/Option';
import { Command } from '../src/decorator/Command';

class MainProgram extends Program {
  constructor() {
    super('1.0.0');
    this.addSubProgram(new SubProgram());
  }

  @Description('run the server')
  @Option('-d, --debug', 'enable debug mode', false)
  public main() {
    console.log('RUN!');
  }

  @Command('test')
  @Option('-f, --file', 'file to copy')
  public test(env: string, { file }: any) {
    console.log(env);
    console.log(file);
    console.log('Hello world!');
  }
}

class SubProgram {
  @Command('test2')
  @Option('-f, --file', 'file to copy')
  public test2(env: string, { file }: any) {
    console.log(env);
    console.log(file);
    console.log('Hello world!');
  }
}

const p = new MainProgram();
p.run(['', '', '--help']);
