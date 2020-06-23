import * as mongoose from 'mongoose';

export const CachesSchema = new mongoose.Schema({
  key: String,
  value: String,
});
