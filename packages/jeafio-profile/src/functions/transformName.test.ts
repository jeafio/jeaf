import { transformName } from './transformName';

describe('transformName', function() {
  it('should transform a single word to lowercase', function() {
    expect(transformName('MONGO')).toBe('mongo');
  });


  it('should transform two words to camelcase', function() {
    expect(transformName('MONGO_SERVER')).toBe('mongoServer');
  });

  it('should transform multiple words to camelcase', function() {
    expect(transformName('SERVER_MONGO_URL')).toBe('serverMongoUrl');
  });
});