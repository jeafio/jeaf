import { NamingConvention } from '../NamingConvention';

export function applyNamingConvention(
  accessList: Record<string, string>,
  convention: NamingConvention,
): Record<string, string> {
  const translatedObj: Record<string, string> = {};
  for (const key in accessList) {
    const translatedKey = convention(key);
    translatedObj[translatedKey] = accessList[key];
  }
  return translatedObj;
}
