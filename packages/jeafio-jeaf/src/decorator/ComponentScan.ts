import { glob } from 'glob';
import { resolve } from 'path';
import fs from 'fs';

export function ComponentScan(paths: string[]): ClassDecorator {
  return (target) => {
    for (const path of paths) {
      loadComponents(path);
    }
  };
}

function loadComponents(path: string): void {
  const files = glob.sync(resolve(path, './**/*.{ts,js}'));
  const requireCache = require.cache;
  for (const file of files) {
    const fileContent = fs.readFileSync(file, 'utf8');
    if (fileContent.includes('@Component')) {
      const absolutPath = resolve(file);
      if (!requireCache[absolutPath]) {
        require(absolutPath);
      }
    }
  }
}
