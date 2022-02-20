import { model, Schema } from 'mongoose';
import ICache from '../interfaces/cache';

const ttl = process.env.TTL_IN_SECONDS || 60 * 60 * 24; // default is 1 day

const cacheSchema = new Schema<ICache>(
	{
		key: { type: String, required: true },
		value: { type: String, required: true },
		createdAt: { type: Date, expires: ttl, default: Date.now },
		lastUsed: { type: Date, expires: ttl, default: Date.now },
	},
	{ collection: 'cache' },
);

export const Cache = model<ICache>('Cache', cacheSchema);
