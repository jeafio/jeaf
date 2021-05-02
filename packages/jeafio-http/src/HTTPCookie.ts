import assert from 'assert';

export interface HttpCookieConfig {
  secure?: true;
  httpOnly?: true;
  maxAge?: number;
  path?: string;
  domain?: string;
  sameSite?: 'Strict' | 'Lax' | 'None';
  expires?: Date;
}

export class HTTPCookie {
  private readonly name: string;
  private readonly value: string;
  private readonly config: HttpCookieConfig;

  public constructor(name: string, value: string, config: HttpCookieConfig = {}) {
    this.name = name;
    this.value = value;
    this.config = config;
  }

  public getName(): string {
    return this.name;
  }

  public getValue(): string {
    return this.value;
  }

  private mapConfigOption(option: keyof HttpCookieConfig): string {
    return {
      secure: 'Secure',
      expires: 'Expires',
      maxAge: 'Max-Age',
      path: 'path',
      domain: 'Domain',
      sameSite: 'SameSite',
      httpOnly: 'HttpOnly',
    }[option];
  }

  private mapStringOption(option: string): string {
    return {
      Secure: 'secure',
      Expires: 'expires',
      'Max-Age': 'maxAge',
      path: 'path',
      Domain: 'domain',
      SameSite: 'sameSite',
      HttpOnly: 'httpOnly',
    }[option] as string;
  }

  public static fromString(cookieString: string): HTTPCookie {
    const parts = cookieString.split(';');
    const cookieValue = (parts.shift() as string).split('=');
    const name = cookieValue[0];
    const value = cookieValue[1];
    const config: Record<string, string | boolean | number | Date> = {};
    const cookie = new HTTPCookie(name, value, config);
    for (const part of parts) {
      const split = part.trim().split('=');
      const mappedName = cookie.mapStringOption(split[0]);
      assert(mappedName, `Invalid key '${split[0]}' found in cookie definition`);
      if (mappedName === 'expires') {
        config[mappedName] = Date.parse(split[1]);
      } else if (mappedName  === 'maxAge') {
        config[mappedName] = Number.parseInt(split[1]);
      } else {
        config[mappedName] = split[1] || true;
      }
    }
    return cookie;
  }

  public toString(): string {
    const configOptions = Object.keys(this.config)
      .map((option: string) => {
        const value = this.config[option as keyof HttpCookieConfig];
        const mappedName = this.mapConfigOption(option as keyof HttpCookieConfig);
        if (typeof value === 'boolean') {
          return mappedName;
        }
        if (value instanceof Date) {
          return `${mappedName}=${value.toUTCString()}`;
        }
        return `${mappedName}=${value}`;
      })
      .join(';');
    return `${this.name}=${this.value}; ${configOptions}`.trim();
  }
}