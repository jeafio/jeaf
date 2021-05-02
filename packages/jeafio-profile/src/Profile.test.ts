import { Field } from '@jeafio/validate';
import { Profile } from './Profile';

class Config {
  @Field(String)
  public declare mongoHost: string;
}

describe('Profile', function() {

  it('should build config object', function() {
    const config = Profile.load(Config, { MONGO_HOST: 'localhost' });
    expect(config).toEqual({
      mongoHost: 'localhost',
    });
  });

  it('should use global env as default', function() {
    process.env.MONGO_HOST = 'localhost';
    const config = Profile.load(Config);
    expect(config).toEqual({
      mongoHost: 'localhost',
    });
  });

  it('should throw an error if validation fails', function() {
    expect(() => Profile.load(Config, {})).toThrowError();
  });

});