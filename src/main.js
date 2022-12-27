// For more information, see https://crawlee.dev/
import { CheerioCrawler, ProxyConfiguration } from "crawlee";
import { router } from "./routes.js";
import { KeyValueStore } from "crawlee";
const startUrls = [];
const input = await KeyValueStore.getInput();
console.log(input);
const MAX_PAGES = 6;

for (let i = 1; i <= MAX_PAGES; i++) {
  startUrls.push(`https://linktr.ee/discover/profile-directory/c/all/page-${i}/`);
}

const crawler = new CheerioCrawler({
  // proxyConfiguration: new ProxyConfiguration({ proxyUrls: ['...'] }),
  requestHandler: router,
  useSessionPool: true,
});

await crawler.run(startUrls);
//combine all the data into one array and then save it to a json file
const data = await Dataset.getData();
