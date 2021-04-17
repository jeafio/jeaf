export function parseCookies(headers: string): Record<string, string> {
  return headers.split(';').reduce((cookies, cookie) => {
    const cookieSplit = cookie.split('=');
    cookies[cookieSplit[0]] = cookieSplit[1];
    return cookies;
  }, {} as Record<string, string>);
}