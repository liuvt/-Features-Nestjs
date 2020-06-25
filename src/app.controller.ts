import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/app')
export class AppController {

    constructor(private readonly service: AppService) { }

    //http://localhost:5000/app?a=5
    @Get()
    async jestUnitTest(@Query('a') a: number):Promise<number>{
        const rs = await this.service.jestUnitTest(a);
        console.log(a);
        if(rs <= 0){
            console.log(rs)
            return 0;
        }
        console.log(rs)
        return rs;
    }
}
