import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/app')
export class AppController {

    constructor(private readonly service: AppService) { }

    @Get()
    async jestUnitTest(a: number):Promise<number>{
        const rs = await this.service.jestUnitTest(a);
        if(rs <= 0){
            console.log(rs)
            return 0;
        }
        console.log(rs)
        return rs;
    }
}
