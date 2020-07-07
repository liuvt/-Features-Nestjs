import { Document } from 'mongoose';

export interface CachesInterface extends Document {
  mongoid: string;
  data: IData[]

}

interface IData {
  key: string;
  value: string;
}