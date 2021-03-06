import { Request, Response, NextFunction } from 'express';
import MongoDBService from '../db/mongo';
import { Cache } from '../models/cache';
import logger from '../utils/logger';
import crypto from 'crypto';

const db = new MongoDBService(Cache);
const maxNumberOfEntries = process.env.MAX_CACHE_ENTRIES || 100;
const randomStr = (): string => crypto.randomBytes(32).toString('hex');

const getByKey = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	let { key } = req.params;
	let entry = await db.getByKey(key);
	let message: string;
	if (entry) {
		logger.info('Cache hit');
		message = 'Cache entry found!';
		entry.lastUsed = new Date();
		await entry.save();
		return res.status(200).json({ message, data: entry.get('value') });
	}
	logger.info('Cache miss');
	entry = await db.create({ key, value: randomStr() });
	message = 'Cache entry created!';
  handleCacheLimit();
	return res.status(201).json({ message, data: entry.get('value') });
};

const getKeys = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  let entries = await db.getAll(); 
  return res.status(200).json({ message: 'Cache entry keys', data: entries.map(entry => entry.get('key')) });
}

const createOrUpdate = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  let { key } = req.params;
  let entry = await db.getByKey(key);
  let message: string;
  let statusCode: number;
  if (entry) {
    logger.info('Cache entry updated');
    entry.set('value', randomStr());
    entry.set('lastUsed', new Date());
    await entry.save();
    message = 'Cache entry updated!';
    statusCode = 200;
  } else {
    logger.info('Cache entry created');
    entry = await db.create({ key, value: randomStr() });
    message = 'Cache entry created!';
    statusCode = 201;
  }
  handleCacheLimit();
  return res.status(statusCode).json({ message, data: entry.get('value') });
}

const deleteByKey = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  let { key } = req.params;
  let entry = await db.getByKey(key);
  let message: string;
  if (!entry) {
    message = 'Cache entry not found!';
    logger.info(message);
    return res.status(404).json({ message });
  }
  message = 'Cache entry deleted!';
  logger.info(message);
  await entry.remove();
  return res.status(200).json({ message });
}

const deleteAll = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  let message = 'Cache entries deleted!';
  logger.info(message);
  await db.deleteAll();
  return res.status(200).json({ message });
}

const handleCacheLimit = async (): Promise<any> => {
  let entries = await db.getAll();
  if (entries.length < maxNumberOfEntries) return;
  let oldestEntry = entries.sort((a, b) => a.get('lastUsed').getTime() - b.get('lastUsed').getTime())[0];
  await oldestEntry.remove();
}

export default {
	getByKey,
  getKeys,
  createOrUpdate,
  deleteByKey,
  deleteAll,
};
