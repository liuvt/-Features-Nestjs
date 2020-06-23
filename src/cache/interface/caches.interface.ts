import { Document } from 'mongoose';

export interface CachesInterface extends Document {
  key: string;
  value: string;
}
