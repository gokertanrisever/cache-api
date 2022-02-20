import IDatabase from "../interfaces/database";
import mongoose from 'mongoose';
import logger from "../utils/logger";
import { Model } from "mongoose"

export default class MongoDBService implements IDatabase {
  private connectionString: string = process.env.DB_URL || 'mongodb://localhost:27017/';
  private mongooseOptions = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverSelectionTimeoutMS: 5000,
	};

  private model: Model<any>; 

  constructor(model: Model<any>) {
    this.model = model;
    this.connect();
  }

  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      logger.debug(`MongoDB connecting to ${this.connectionString}`);
      mongoose.connect(this.connectionString, this.mongooseOptions);
      mongoose.connection.on("error", (err: any) => {
        logger.error(`MongoDB connection error: ${err}`);
        reject(err);
      });
      mongoose.connection.once("open", () => {
        logger.info(`MongoDB connected to ${this.connectionString}`);
        resolve();
      });
    });
  }

  public getByKey(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.model.findOne({ key }, (err: any, result: any) => {
        if (err) {
          logger.error(`MongoDB getByKey error: ${err}`);
          reject(err);
        }
        resolve(result);
      });
    });
  }

  public create(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.model.create(data, (err: any, result: any) => {
        if (err) {
          logger.error(`MongoDB create error: ${err}`);
          reject(err);
        }
        resolve(result);
      });
    });
  }

}