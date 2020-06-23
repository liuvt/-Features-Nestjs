import { Controller, Post, Body } from '@nestjs/common';
import { NotificeService } from './notifice.service';
import * as ms from 'message.json';


@Controller('notification')
export class NotificeController {

    constructor(private readonly service: NotificeService) { }

    @Post('send')
    async pushNotification(@Body() body) {
        const { token } = body;
        return this.service.send(Object.assign(ms,{token}));
    }

    @Post('sendmulti')
    async pushMulti(@Body() token) {
        return this.service.sendMulti(ms, token);
    }

}
