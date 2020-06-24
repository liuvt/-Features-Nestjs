import { AppController } from '../app.controller';
import { AppService } from '../app.service';

let itAfter;
let appController: AppController;
let appService: AppService;
let expected;
describe('@Nestjs/Testing with Jest', () => {

    beforeEach(async () => {
        appService = new AppService();
        appController = new AppController(appService);
    });

    describe('jestUnitTest(): return value', () => {

       it('Successful: return value is true', async (done) => {
           expected = 1;

           itAfter = await appController.jestUnitTest(2);

           expect(itAfter).toBe(expected);
           done();
       });

       it('Failed: not match value', async (done) => {
          expected = 0;

          itAfter = await appController.jestUnitTest(0);

          expect(itAfter).toBe(expected);
          done();
       });

    })
});
