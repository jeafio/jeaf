import { NamingConvention } from '../NamingConvention';

export const camelCase: NamingConvention = (propertyPath) => {
  const parts = propertyPath.split('.');
  return parts.reduce((word, part) => {
    return `${word}${firstLetterUppercase(part)}`;
  }, parts.shift() as string);
};

function firstLetterUppercase(property: string): string {
  return property.charAt(0).toUpperCase() + property.slice(1);
}
