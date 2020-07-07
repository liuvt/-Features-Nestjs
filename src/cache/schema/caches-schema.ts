import * as mongoose from 'mongoose';
export const CachesSchema = new mongoose.Schema({
  mongoid: String,
  data: [{
    key: String,
    value: String,
  }]
});

mongoose.model('TextCaches', CachesSchema);