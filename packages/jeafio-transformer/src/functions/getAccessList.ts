export function getAccessList(propertyPaths: string[]): Record<string, string> {
  const accessList: Record<string, string> = {};
  const uniquePropertyList = new Map<string, string>();
  const reusedPropertyList = new Set<string>();

  // Add direct mappings to all properties
  for (const propertyPath of propertyPaths) {
    const parts = propertyPath.split('.');
    const propertyName = parts.pop() as string;
    accessList[propertyPath] = propertyPath;

    // Find unique property names
    if (!reusedPropertyList.has(propertyName)) {
      if (uniquePropertyList.has(propertyName)) {
        uniquePropertyList.delete(propertyName);
        reusedPropertyList.add(propertyName);
      } else {
        uniquePropertyList.set(propertyName, propertyPath);
      }
    }
  }

  // Add shortened values to access list
  uniquePropertyList.forEach((value, key) => {
    accessList[key] = value;

    // Shorten already registered paths
    if (value.includes('.')) {
      const shortablePaths = Object.keys(accessList).filter((p) => p !== value && p.startsWith(value));
      for (const shortablePath of shortablePaths) {
        const shortenedPath = shortablePath.replace(value, key);
        accessList[shortenedPath] = accessList[shortablePath];
      }
    }
  });

  return accessList;
}
