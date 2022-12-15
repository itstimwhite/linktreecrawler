import { Dataset, createCheerioRouter } from "crawlee";

export const router = createCheerioRouter();

router.addDefaultHandler(async ({ enqueueLinks, log }) => {
  log.info(`enqueueing new URLs`);
  await enqueueLinks({
    globs: ["https://linktr.ee/*"],
    label: "detail",
  });
});

//write the above function but this time log an index number of each link

router.addHandler("detail", async ({ request, $, log }) => {
  const title = $("title").text();
  //get the title of the page
  log.info(`pushing data for ${request.loadedUrl}`);

  await Dataset.pushData({
    url: request.loadedUrl,
    title,
  });
});
