import { Module, CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { DecoratorService } from './decorator.service';

@Module({
    imports: [
        CacheModule.register({
            store: redisStore,
            host: 'localhost',
            port: 6379,
            ttl: 600
        }),
    ],
    providers: [
        DecoratorService,
    ]
})
export class DecoratorModule { }
