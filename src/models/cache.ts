import { model, Schema } from 'mongoose';
import ICache from '../interfaces/cache';

const ttl = process.env.TTL_MINUTES || 60;

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
