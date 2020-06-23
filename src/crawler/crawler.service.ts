import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as ogs from 'open-graph-scraper';
import * as Prerenderer from 'puppeteer-prerender';

import { detailOgc, etExtensionUrl, isExisthttp, mediaOgc } from './common/crawler.provider';
import { IOpenGraph } from './interface/crawler.interface';

@Injectable()
export class CrawlerService {

    async crawler(url: string): Promise<IOpenGraph> {
        try {
            const result = await this.scraper(url);
            return (result !== null) ? result : await this.puppeteer(url);
        } catch (e) {
            throw new InternalServerErrorException('Could not crawl OG data.');
        }
    }
    /* check puppeteer, if not found return is 'null' */
    private async puppeteer(url: string): Promise<IOpenGraph> {
        try {
            const prerender = new Prerenderer();
            const { openGraph } = await prerender.render(url, { followRedirect: true, timeout: 10000 });
            const result = await openGraph;
            const { og: { title, description, image, type, video } } = result;
            const puppeteerCrawler = detailOgc(result.og.site_name, title, description, result.og.url, type);
            const imageIndex = image[0];
            const { width, height } = imageIndex;
            Object.assign(puppeteerCrawler, { image: mediaOgc(imageIndex.url, width, height, imageIndex.type || etExtensionUrl(imageIndex.url)) });
            if (video) {
                const videoIndex = video[0];
                const { width, height } = videoIndex;
                return Object.assign(puppeteerCrawler, { video: mediaOgc(videoIndex.url, width, height, videoIndex.type) });
            }
            return puppeteerCrawler;
        } catch (e) {
            throw new InternalServerErrorException('Could not crawl OG data.');
        }
    }

    private async scraper(url: string): Promise<IOpenGraph> {
        try {
            const options = { url, timeout: 5000, allMedia: false, followAllRedirects: true };
            const result = await ogs(options);
            const { data: { ogImage, ogVideo, ogSiteName, ogType, ogTitle, ogDescription, ogUrl } } = result;
            const scraperCrawler = detailOgc(ogSiteName, ogTitle, ogDescription, ogUrl || isExisthttp(url), ogType);
            const { width, height, type } = ogImage;
            Object.assign(scraperCrawler, { image: mediaOgc(ogImage.url, width, height, type || etExtensionUrl(ogImage.url)) });
            if (ogVideo) {
                const { width, height, type } = ogVideo;
                Object.assign(scraperCrawler, { video: mediaOgc(ogVideo.url, width, height, type) });
                return scraperCrawler;
            }
            return scraperCrawler;
        } catch (e) {
            return null;
        }
    }
}
