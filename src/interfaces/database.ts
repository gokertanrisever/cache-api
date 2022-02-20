export default interface IDatabase {
	connect(): Promise<void>;
  getByKey(key: string): Promise<any>;
  getAll(): Promise<any>;
  create(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
  // deleteAll(): Promise<void>;
}
