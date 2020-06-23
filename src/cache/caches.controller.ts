import {
    Controller, Get, Post, Body, Delete, Param, Patch,
} from '@nestjs/common';
import { CachesService } from './caches.service';
import { CrudMongoDto } from './payload/caches.payload';
import { Cacheable, ObjectCache, Apply } from './decorator';

@ObjectCache('cache_key')
@Controller('demo-cache')
export class CachesController {

    constructor(private readonly service: CachesService) { }

    @Get('cacheinvalidate')
    async invalidate() {
        return this.service.invalidate();
    }

    @Get('cacheexists')
    async exists() {
        return this.service.exists();
    }

    @Post('cachepush')
    async add(@Body() dto: CrudMongoDto) {
        return this.service.add(dto);
    }

    @Delete('cachedel/:id')
    async del(@Param('id') id) {
        return this.service.del(id);
    }

    @Patch('cacheedit/:id')
    async update(@Param('id') id: string, @Body() dto: CrudMongoDto) {
        return this.service.up(id, dto);
    }

    @Apply('cacheable')
    //@Get('cacheable')
    async get() {
        return this.service.get();
    }

}

