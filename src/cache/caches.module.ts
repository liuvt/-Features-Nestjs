import { Module, CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { CachesService } from './caches.service';
import { CachesController } from './caches.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CachesSchema } from './schema/caches-schema';
import { DecoratorModule } from './decorator/decorator.module';

@Module({
    imports: [
        CacheModule.register({
            store: redisStore,
            host: 'localhost',
            port: 6379,
            ttl: 600
        }),
        DecoratorModule,
        MongooseModule.forFeature([{ name: 'CrudMongo', schema: CachesSchema }]),
    ],
    controllers: [CachesController],
    providers: [CachesService],
})
export class CachesModule { }
