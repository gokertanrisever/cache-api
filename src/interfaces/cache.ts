import { Document } from 'mongoose';
export default interface ICache extends Document {
  key: string;
  value: string;
  createdAt: Date;
  lastUsed: Date;
}