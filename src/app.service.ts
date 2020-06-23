import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

    async jestUnitTest(): Promise<number>{
        return 10 + 3;
    }
}

