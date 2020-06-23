import { Controller, Get , Query} from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { IOpenGraph } from 'src/crawler/interface/crawler.interface';

@Controller('crawler')
export class CrawlerController {

    constructor(private readonly service: CrawlerService) { }

    // https://127.0.0.1:5000/ogp?url=https://www.youtube.com/watch?v=PTkmsDG4dus
    @Get()
    async openGraphCrawler1(@Query('url') url): Promise<IOpenGraph> {
        if (!url || url.length <= 0) {
            return {
                url: null,
            };
        }

        return this.service.crawler(url);
    }
}
