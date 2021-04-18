export interface ParsedUrl {
  path: string;
  queries: Record<string, string>;
}

/**
 * Parses an url and returns a normalized path and all
 * query parameter
 * @param url The url to parse.
 */
export function parsePath(url: string): ParsedUrl {
  const splitPath = url.split('?');
  const parserResult: Partial<ParsedUrl> = { queries: {} };
  parserResult.path = splitPath[0].endsWith('/') ? splitPath[0].slice(0, -1) : splitPath[0];

  if (parserResult.path === '') {
    parserResult.path = '/';
  }

  if (splitPath[1]) {
    parserResult.queries = splitPath[1].split('&').reduce((queries, query) => {
      const splitQuery = query.split('=');
      queries[splitQuery[0]] = splitQuery[1];
      return queries;
    }, {} as Record<string, string>)
  }
  return parserResult as ParsedUrl;
}