import { Mapping } from './Mapping';
import { MappingFunction } from './MappingFunction';
import { getPropertyPaths } from './functions/getPropertyPaths';
import { getAccessList } from './functions/getAccessList';
import { NamingConvention } from './NamingConvention';
import { camelCase } from './conventions/camelCase';
import { applyNamingConvention } from './functions/applyNamingConvention';
import 'reflect-metadata';
import { getSchemaPaths } from './functions/getSchemaPaths';
import { getPath } from './functions/getPath';
import { Constructor, hasOwnProperty } from '@jeafio/data';

export class Transformer {
  public readonly mappings: Mapping[] = [];
  private namingConvention: NamingConvention = camelCase;

  public setNamingConvention(namingConvention: NamingConvention): this {
    this.namingConvention = namingConvention;
    return this;
  }

  public addMapping(fromKey: string, toKey: string, mappingFunction?: MappingFunction): this {
    this.mappings.push({ fromKey, toKey, mappingFunction });
    return this;
  }

  public transform<From extends object, To extends Constructor>(from: From, to: To): To | To[] {
    if (Array.isArray(from)) {
      return from.map((item) => this.transform(item, to)) as To[];
    }

    const sourcePropertyPaths = getPropertyPaths(from);
    const sourceAccessList = getAccessList(sourcePropertyPaths);
    const sourceTranslatedAccessList = applyNamingConvention(sourceAccessList, this.namingConvention);

    const targetPropertyPath = getSchemaPaths(to);
    const targetAccessList = getAccessList(targetPropertyPath);
    const targetTranslatedAccessList = applyNamingConvention(targetAccessList, this.namingConvention);

    return this.transformObj(from, to, sourceTranslatedAccessList, targetTranslatedAccessList, '');
  }

  private transformObj<From extends object, To extends Constructor>(
    from: From,
    to: To,
    sourceAccessList: Record<string, string>,
    targetAccessList: Record<string, string>,
    path: string,
  ): To {
    const schema = Reflect.getMetadata('validate:schema', to);
    const instance = new to() as Record<string, unknown>;

    for (const propertyKey in schema) {
      const propertyPath = getPath(path, propertyKey);
      const propertySchema = schema[propertyKey];
      const propertyType = propertySchema.type;
      const possibleMappings = this.getAccessListByValue(targetAccessList, propertyPath);
      const sourceMapping = Object.keys(possibleMappings).find((pm) => hasOwnProperty(sourceAccessList, pm));
      const customMapping = this.getCustomMapping(propertyPath);
      const finalSourcePath = customMapping ? customMapping.fromKey : sourceAccessList[sourceMapping as string];

      if (customMapping && customMapping.mappingFunction) {
        instance[propertyKey] = customMapping.mappingFunction(this.getValue(from, finalSourcePath));
      } else {
        if (propertyType === Number || propertyType === Boolean || propertyType === String) {
          if (finalSourcePath) {
            instance[propertyKey] = this.getValue(from, finalSourcePath);
          } else {
            if (!propertySchema.isOptional) {
              throw new Error(`Could not find a mapping for target key '${propertyPath}'`);
            }
          }
        } else {
          if (propertySchema.isArray) {
            const sourceArray = this.getValue(from, finalSourcePath) as unknown[];
            instance[propertyKey] = this.transform(sourceArray, propertyType);
          } else {
            instance[propertyKey] = this.transformObj(
              from,
              propertyType,
              sourceAccessList,
              targetAccessList,
              propertyPath,
            );
          }
        }
      }
    }

    return instance as To;
  }

  private getCustomMapping(propertyPath: string): Mapping | undefined {
    return this.mappings.find((mapping) => {
      return mapping.toKey === propertyPath;
    });
  }

  private getValue(obj: object, path: string): unknown {
    const parts = path.split('.');
    let pointer = obj;
    for (const part of parts) {
      pointer = pointer[part as keyof typeof pointer];
    }
    return pointer;
  }

  private getAccessListByValue(accessList: Record<string, string>, value: string): Record<string, string> {
    const validAccessList: Record<string, string> = {};
    for (const key in accessList) {
      const listValue = accessList[key];
      if (listValue === value) {
        validAccessList[key] = listValue;
      }
    }
    return validAccessList;
  }
}
