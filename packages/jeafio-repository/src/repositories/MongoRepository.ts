import { Db, FilterQuery, FindOneOptions, ObjectId } from 'mongodb';
import { Repository } from '../Repository';
import { MongoDataSource } from '../sources/MongoDataSource';

/**
 * Abstracts the connections with the MongoDB Server.
 */
export class MongoRepository<Entity> implements Repository<Entity, string> {
  /**
   * The database to use.
   * @protected
   */
  protected readonly database: MongoDataSource;

  /**
   * The collection that contains the Entity.
   * @protected
   */
  protected readonly collection: string;

  constructor(database: MongoDataSource, collection: string) {
    this.database = database;
    this.collection = collection;
  }

  protected db(): Db {
    return this.database.getConnection();
  }

  protected getId(id: string | ObjectId): ObjectId {
    if (typeof id === 'string') {
      return new ObjectId(id);
    }
    return id;
  }

  /**
   * Executes the aggregate function.
   * @param pipeline
   */
  public aggregate<T>(pipeline: object[]): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.db()
        .collection(this.collection)
        .aggregate(pipeline)
        .toArray((err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
    });
  }

  /**
   * Returns all entities matching the query.
   * @param query
   * @param limit
   * @param options
   */
  public find(query: FilterQuery<Entity>, limit = 0, options?: FindOneOptions<Entity>): Promise<Entity[]> {
    return new Promise<Entity[]>((resolve, reject) => {
      this.db()
        .collection(this.collection)
        .find(query, <any>options)
        .limit(limit)
        .toArray((err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
    });
  }

  public async deleteAll(): Promise<number> {
    const command = await this.db().collection(this.collection).deleteOne({});
    return command.deletedCount || 0;
  }

  public async deleteById(id: string): Promise<number> {
    return this.deleteByKey('_id' as keyof Entity, new ObjectId(id));
  }

  public async deleteByKey(key: keyof Entity, value: unknown): Promise<number> {
    const command = await this.db()
      .collection(this.collection)
      .deleteOne({ [key]: value });
    return command.deletedCount || 0;
  }

  public getAll(): Promise<Entity[]> {
    return this.find({});
  }

  public getAllByKey(key: keyof Entity, value: unknown): Promise<Entity[]> {
    return this.find({ [key]: value } as FilterQuery<Entity>);
  }

  public getById(id: string): Promise<Entity> {
    return this.getByKey('_key' as keyof Entity, new ObjectId(id));
  }

  public async getByKey(key: keyof Entity, value: unknown): Promise<Entity> {
    const entities = await this.find({ [key]: value } as FilterQuery<Entity>, 1);
    return entities[0];
  }

  public async insertMany(entities: Entity[]): Promise<Entity[]> {
    const command = await this.db().collection(this.collection).insertMany(entities);
    return command.ops[0];
  }

  public async insertOne(entity: Entity): Promise<Entity> {
    const command = await this.db().collection(this.collection).insertOne(entity);
    return command.ops[0];
  }

  public updateMany(entities: Entity[]): Promise<Entity[]> {
    return Promise.all(entities.map(this.updateOne));
  }

  public updateOne(entity: Entity): Promise<Entity> {
    return new Promise((resolve, reject) => {
      const patch = { ...entity } as Entity & { _id?: string };
      delete patch._id;
      this.db()
        .collection(this.collection)
        .updateOne(
          {
            _id: this.getId((entity as Entity & { _id: string })._id),
          },
          {
            $set: patch,
          },
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          },
        );
    });
  }
}
