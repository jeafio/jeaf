import { DataSource } from '../DataSource';
import { Db, MongoClient, MongoClientOptions } from 'mongodb';

export class MongoDataSource implements DataSource<Db> {
  private readonly uri: string;
  private readonly database: string;
  private readonly options: MongoClientOptions;
  private db: Db | null = null;
  private client: MongoClient | null = null;

  constructor(uri: string, database: string, options: MongoClientOptions = {}) {
    this.uri = uri;
    this.database = database;
    this.options = options;
  }

  public getClient(): MongoClient {
    return this.client as MongoClient;
  }

  public getConnection(): Db {
    return this.db as Db;
  }

  public async isConnected(): Promise<boolean> {
    const client = this.getClient();
    return client.isConnected();
  }

  public async connect(): Promise<Db> {
    if (this.db === null) {
      this.client = await MongoClient.connect(this.uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        ...this.options,
      });
    }
    return (this.client as MongoClient).db(this.database);
  }

  public async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
    }
  }
}
