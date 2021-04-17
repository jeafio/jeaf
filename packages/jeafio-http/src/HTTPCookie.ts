
export interface HttpCookieConfig {
  secure?: true;
  httpOnly?: true;
  maxAge?: number;
  path?: string;
  domain?: string;
  sameSite?: 'Strict' | 'Lax' | 'None';
  expires?: Date;
}

export class HttpCookie {
  private readonly name: string;
  private readonly value: string;
  private readonly config: HttpCookieConfig;

  public constructor(name: string, value: string, config: HttpCookieConfig = {}) {
    this.name = name;
    this.value = value;
    this.config = config;
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