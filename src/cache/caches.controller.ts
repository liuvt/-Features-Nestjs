import {
    Controller, Get, Post, Body, Delete, Param, Patch,
} from '@nestjs/common';
import { CachesService } from './caches.service';
import { CrudPayload } from './payload';
import { Cacheable, ObjectCache, Apply } from './decorator';
import { CachesInterface } from './interface';

@ObjectCache('cache_key')
@Controller('demo-cache')
export class CachesController {

    constructor(private readonly service: CachesService) { }

    @Get('cacheinvalidate')
    async invalidate() {
        return this.service.invalidate();
    }

    @Get('cacheexists')
    async exists(){
        return this.service.exists();
    }

    @Post('cachepush')
    async add(@Body() dto: CrudPayload): Promise<CachesInterface> {
        return this.service.add(dto);
    }

    @Delete('cachedel/:id')
    async del(@Param('id') id) {
        return this.service.del(id);
    }

    @Patch('cacheedit/:id')
    async update(@Param('id') id: string, @Body() dto: CrudPayload): Promise<CachesInterface> {
        return this.service.up(id, dto);
    }

    @Apply('cacheable')
    //@Get('cacheable')
    async get(): Promise<CachesInterface[]> {
        return this.service.get();
    }

}

