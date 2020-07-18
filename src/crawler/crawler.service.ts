import { Injectable } from '@nestjs/common';
import * as ogs from 'open-graph-scraper';
import * as Prerenderer from 'puppeteer-prerender';

import { detailOgc, etExtensionUrl, isExisthttp, mediaOgc, resultCrawler } from './common/crawler.provider';
import { CrawlerResponseInterface } from './interface/crawler.interface';

@Injectable()
export class CrawlerService {

    async crawl(url: string): Promise<CrawlerResponseInterface> {
        const result = await this.scraper(url);
        return result !== null ? result : this.puppeteer(url);
    }

    private async puppeteer(url: string): Promise<CrawlerResponseInterface> {
        try {
            const prerender = new Prerenderer();
            const { openGraph } = await prerender.render(url, { followRedirect: true, timeout: 20000 });
            const result = await openGraph;
            if (!result) {
                return resultCrawler(url);
            }
            const { og } = result;
            const puppeteerCrawler = await detailOgc(og.site_name, og.title, og.description, url, og.type);
            const imageIndex = og.image[0];
            Object.assign(puppeteerCrawler, {
                image: mediaOgc(
                    imageIndex.url,
                    imageIndex.width,
                    imageIndex.height,
                    imageIndex.type || isExisthttp(imageIndex.url),
                ),
            });
            if (og.video) {
                const videoIndex = result.video[0];
                return Object.assign(puppeteerCrawler, {
                    video: mediaOgc(videoIndex.url, videoIndex.width, videoIndex.height, videoIndex.type),
                });
            }
            return puppeteerCrawler;
        } catch (e) {
            return resultCrawler(url);
        }
    }

    private async scraper(url: string): Promise<CrawlerResponseInterface> {
        try {
            const options = { url, timeout: 7000, followRedirect: true, maxRedirects: 20 };
            const result = await ogs(options);
            const {
                data: { ogImage, ogVideo, ogSiteName, ogType, ogTitle, ogDescription, ogUrl },
            } = result;
            const scraperCrawler = detailOgc(ogSiteName, ogTitle, ogDescription, ogUrl || isExisthttp(url), ogType);
            if (!ogImage.length) {
                Object.assign(scraperCrawler, {
                    image: mediaOgc(ogImage.url, ogImage.width, ogImage.height, ogImage.type || etExtensionUrl(ogImage.url)),
                });
                if (ogVideo) {
                    Object.assign(scraperCrawler, { video: mediaOgc(ogVideo.url, ogVideo.width, ogVideo.height, ogVideo.type) });
                    return scraperCrawler;
                }
            }
            Object.assign(scraperCrawler, {
                image: mediaOgc(
                    ogImage.url ,
                    ogImage.width,
                    ogImage.height,
                    ogImage.type || etExtensionUrl(ogImage.url) || etExtensionUrl(ogImage[0].url),
                ),
            });
            if (ogVideo) {
                Object.assign(scraperCrawler, { video: mediaOgc(ogVideo.url, ogVideo.width, ogVideo.height, ogVideo.type) });
                return scraperCrawler;
            }
            return scraperCrawler;
        } catch (e) {
            return null;
        }
    }
}
