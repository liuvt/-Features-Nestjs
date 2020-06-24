import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

    async jestUnitTest(a: number): Promise<number>{
        return a - 1;
    }
}

