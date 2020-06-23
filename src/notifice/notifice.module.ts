import { NotificeService } from './notifice.service';
import { Module } from '@nestjs/common';
import { NotificeController } from './notifice.controller';

@Module({
    controllers: [
        NotificeController
    ],
    providers: [
        NotificeService
    ],
})
export class NotificeModule { }
