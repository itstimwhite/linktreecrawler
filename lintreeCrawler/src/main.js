// For more information, see https://crawlee.dev/
import { CheerioCrawler, ProxyConfiguration } from "crawlee";
import { router } from "./routes.js";

const MAX_PAGES = 4860;
const startUrls = [];

//https://linktr.ee/discover/profile-directory/c/all/page-[PAGE_NUMBER]/
//loop through the pages and add them to the startUrls array
for (let i = 1; i <= MAX_PAGES; i++) {
  startUrls.push(`https://linktr.ee/discover/profile-directory/c/all/page-${i}/`);
}
console.log(startUrls.length);

const crawler = new CheerioCrawler({
  // proxyConfiguration: new ProxyConfiguration({ proxyUrls: ['...'] }),
  requestHandler: router,
});

await crawler.run(startUrls);
