export interface Repository<Entity, Id> {
  getAll(): Promise<Entity[]>;

  getById(id: Id): Promise<Entity>;

  getByKey(key: keyof Entity, value: unknown): Promise<Entity>;

  getAllByKey(key: keyof Entity, value: unknown): Promise<Entity[]>;

  deleteAll(): Promise<number>;

  deleteById(id: Id): Promise<number>;

  deleteByKey(key: keyof Entity, value: unknown): Promise<number>;

  insertOne(entity: Entity): Promise<Entity>;

  insertMany(entity: Entity[]): Promise<Entity[]>;

  updateOne(entity: Entity): Promise<Entity>;

  updateMany(entity: Entity[]): Promise<Entity[]>;
}
