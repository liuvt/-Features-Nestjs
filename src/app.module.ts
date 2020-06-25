import { CachesModule } from './cache/caches.module';
import { NotificeModule } from './notifice/notifice.module';
import { CrawlerModule } from './crawler/crawler.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
       imports: [
           MongooseModule.forRoot('mongodb://localhost:27017/dbTest', { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true }),
           CachesModule,
           //NotificeModule,
           CrawlerModule
       ],
       controllers: [
           AppController
       ],
       providers: [
           AppService
       ],
})
export class AppModule { }
