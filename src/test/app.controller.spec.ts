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
   let expected = 0;

    describe('jestUnitTest(): return value', () => {

       it('Successful: return value greater than 0', async (done) => {

           itAfter = await appController.jestUnitTest(1.5);

           expect(itAfter).toBeGreaterThan(expected);
           done();
       });

       it('Failed: return value less then or equal 0', async (done) => {

          itAfter = await appController.jestUnitTest(-1);
          expect(itAfter).toBeLessThanOrEqual(expected);
          done();
       });
       it('Failed: return value less then or equal 0', async (done) => {

        itAfter = await appController.jestUnitTest(null);
        expect(itAfter).not.toBeNull();
        done();
     });

    })
});
