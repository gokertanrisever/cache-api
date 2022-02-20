export default interface ICache {
  key: string;
  value: string;
  createdAt: Date;
  lastUsed: Date;
}