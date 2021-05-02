export function transformName(name: string): string {
  return name.toLowerCase().replace(/_([a-z])/g, (v) => v.slice(1).toUpperCase());
}