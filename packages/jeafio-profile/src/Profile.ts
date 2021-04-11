import fs from 'fs';
import path from 'path';
import { strict as assert } from 'assert';
import { parse } from 'yaml';
import { Component } from '@jeafio/dicontainer';
import { hasOwnProperty } from '@jeafio/data';

type Primitives = string | boolean | number;

@Component()
export class Profile {
  private values: Record<string, Primitives> = {};

  constructor(profilePath: string, profiles: string[]) {
    this.loadProfile(profilePath, profiles);
  }

  /**
   * Loads all profiles
   * @param profileDirPath
   * @param profiles
   * @private
   */
  private loadProfile(profileDirPath: string, profiles: string[]) {
    assert.ok(fs.existsSync(profileDirPath), `Could not find profile directory`);
    const existingProfiles = fs.readdirSync(profileDirPath).filter((f) => f.endsWith('.yml') || f.endsWith('.yaml'));
    assert.ok(
      existingProfiles.includes('application.yaml') || existingProfiles.includes('application.yml'),
      'Could not find default profile',
    );
    const profileChain = ['application', ...profiles];
    for (const profile of profileChain) {
      const profileContent = this.readProfileSync(profile, profileDirPath, existingProfiles);
      this.values = {
        ...this.values,
        ...profileContent,
      };
    }
    const env = this.getEnvironmentConfig();
    this.values = {
      ...this.values,
      ...env,
    };
  }

  /**
   * Returns a normalized list of env variables.
   * @private
   */
  private getEnvironmentConfig(): Record<string, Primitives> {
    return Object.keys(process.env).reduce((env: any, key) => {
      const transformedKey = key.replace(/_/g, '.').toLowerCase();
      env[transformedKey] = process.env[key];
      return env;
    }, {});
  }

  /**
   * Tries to parse the given profile.
   * @param profile
   * @param profileDirPath
   * @param existingProfiles
   * @private
   */
  private readProfileSync(profile: string, profileDirPath: string, existingProfiles: string[]): any {
    const fileName = profile === 'application' ? 'application' : `application.${profile}`;
    const profilePath = existingProfiles.find((p) => p === `${fileName}.yml` || p === `${fileName}.yaml`);
    assert.ok(profilePath, `Could not find profile '${profile}'`);
    const profileContent = fs.readFileSync(path.resolve(profileDirPath, profilePath), 'utf8');
    return parse(profileContent);
  }

  /**
   * Returns the value of a config value.
   * @param name
   */
  public get(name: string): any {
    assert.ok(hasOwnProperty(this.values, name), `Could not find profile config '${name}'`);
    return this.values[name];
  }
}
