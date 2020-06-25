import { Controller, Get, Query, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/app')
export class AppController {
    protected readonly logger = new Logger(`RESULT LOGGER METHOD: ${AppController.name}`);
    constructor(private readonly service: AppService) { }

    //http://localhost:5000/app?a=5
    @Get()
    async jestUnitTest(@Query('a') a: number):Promise<number>{
        const rs = await this.service.jestUnitTest(a);
        if(rs <= 0){
            this.logger.log(rs);
            return 0;
        }
        this.logger.log(rs);
        return rs;
    }
}
