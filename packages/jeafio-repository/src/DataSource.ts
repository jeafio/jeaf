export interface DataSource<Db> {
  getConnection(): Db;
  connect(): Promise<Db>;
  disconnect(): Promise<void>;
  isConnected(): Promise<boolean>;
}
