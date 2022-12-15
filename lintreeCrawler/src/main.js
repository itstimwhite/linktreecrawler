// For more information, see https://crawlee.dev/
import { CheerioCrawler, ProxyConfiguration } from "crawlee";
import { router } from "./routes.js";
import { KeyValueStore } from "crawlee";

const input = await KeyValueStore.getInput();
console.log(input);
const MAX_PAGES = 4860;
//if input is not empty, use it as the startUrls array else use the default
//for (let i = 1; i <= MAX_PAGES; i++) {
//  startUrls.push(`https://linktr.ee/discover/profile-directory/c/all/page-${i}/`);
//}
if (input.length > 0) {
  var startUrls = input;
} else {
  for (let i = 1; i <= MAX_PAGES; i++) {
    startUrls.push(`https://linktr.ee/discover/profile-directory/c/all/page-${i}/`);
  }
}

console.log(startUrls.length);

const crawler = new CheerioCrawler({
  // proxyConfiguration: new ProxyConfiguration({ proxyUrls: ['...'] }),
  requestHandler: router,
});

await crawler.run(startUrls);
