export default interface IDatabase {
	connect(): Promise<void>;
  getByKey(key: string): Promise<any>;
  // getAllKeys(): Promise<any>;
  // create(key: string, value: string): Promise<void>;
  // delete(key: string): Promise<void>;
  // deleteAll(): Promise<void>;
}
