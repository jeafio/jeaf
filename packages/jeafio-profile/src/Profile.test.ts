import { Profile } from './Profile';
import fs from 'fs';

describe('Profile', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should throw an error if the given profile path does not exist', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(() => {
      new Profile('../test', []);
    }).toThrowError('Could not find profile directory');
  });

  it('should throw an error if application.yaml is missing', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'readdirSync').mockReturnValue([]);
    expect(() => {
      new Profile('../test', []);
    }).toThrowError('Could not find default profile');
  });

  it('should throw an error if profile yaml is missing', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'readdirSync').mockReturnValue(['application.yaml'] as any);
    jest.spyOn(fs, 'readFileSync').mockReturnValue('{}');
    expect(() => {
      new Profile('../test', ['local']);
    }).toThrowError("Could not find profile 'local'");
  });

  it('should convert environment variable names', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'readdirSync').mockReturnValue(['application.yaml'] as any);
    jest.spyOn(fs, 'readFileSync').mockReturnValue('{}');
    const env = process.env;
    process.env = {
      this_is_a_test: '',
      thisIsAnotherTest: '',
    };
    const profile = new Profile('../test', []);
    expect((profile as any).values).toEqual({
      'this.is.a.test': '',
      thisisanothertest: '',
    });
    process.env = env;
  });

  it('should merge variable names with application', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'readdirSync').mockReturnValue(['application.yaml'] as any);
    jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify({ 'server.name': 'test' }));
    const env = process.env;
    process.env = {
      this_is_a_test: '',
      thisIsAnotherTest: '',
    };
    const profile = new Profile('../test', []);
    expect((profile as any).values).toEqual({
      'this.is.a.test': '',
      thisisanothertest: '',
      'server.name': 'test',
    });
    process.env = env;
  });

  it('should return correct profile value', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'readdirSync').mockReturnValue(['application.yaml'] as any);
    jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify({ 'server.name': 'test' }));
    const profile = new Profile('../test', []);
    expect(profile.get('server.name')).toBe('test');
  });
});
