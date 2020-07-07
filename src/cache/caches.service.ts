import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CachesInterface } from './interface';
import { CrudPayload } from './payload';
import { CacheExist, Cacheable, CachePush, CacheDelete, CacheInvalidate, ObjectCache, CacheUpdate, } from './decorator';
import { methodDecorator } from './decorator';

//metadata : value = cache_key , key : metadata_key
@Injectable()
@ObjectCache('cache_key')
export class CachesService {

    constructor(@InjectModel('TextCaches') private model: Model<CachesInterface>) {
    }

    @CacheExist()
    async exists() {
        return "Result: ";
    }

    @CacheInvalidate()
    async invalidate() {
        return "Deleted cache!";
    }

    //@Cacheable()
    @methodDecorator()
    async get(): Promise<CachesInterface[]> {
        return this.model.find();
    }

    @CachePush()
    async add(dto: CrudPayload): Promise<CachesInterface> {
        return this.model.create(dto);
    }

    @CacheDelete()
    async del(id: string): Promise<CachesInterface> {
        return this.model.findOneAndRemove({ _id: id });
    }

    @CacheUpdate()
    async up(id: string, dto: CrudPayload): Promise<CachesInterface> {
        return this.model.findOneAndUpdate({ _id: id }, dto);
    }

}

