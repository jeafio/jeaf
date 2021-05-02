import 'reflect-metadata';
import { transformName } from './functions/transformName';
import { Constructor, hasOwnProperty } from '@jeafio/data';
import { validate } from '@jeafio/validate';
import assert from 'assert';
import { Transformer } from '@jeafio/transformer';

export class Profile {
  public static load<T extends object>(profile: Constructor<T>, processEnv: Record<string, string | undefined> = process.env): T {
    const schema = Reflect.getMetadata('validate:schema', profile);
    const profileDto: Record<string, string | undefined> = {};
    Object.keys(processEnv).forEach((key) => {
      const transformedKey = transformName(key);
      if (hasOwnProperty(schema, transformedKey)) {
        profileDto[transformedKey] = processEnv[key];
      }
    });
    const valid = validate(profileDto, profile);
    assert(valid.isValid, `Could not load profile as following environment variables are incorrect \n ${valid.errors.map((e) => `\t- ${e.message}\n`)}`);
    const transformer = new Transformer();
    return transformer.transform(profileDto, profile) as T;
  }
}