import { Dataset, createCheerioRouter, utils } from "crawlee";

export const router = createCheerioRouter();

router.addDefaultHandler(async ({ enqueueLinks, log }) => {
  log.info(`enqueueing new URLs`);
  await enqueueLinks({
    globs: ["https://linktr.ee/*"],
    label: "detail",
  });
});

router.addHandler("detail", async ({ request, $, log }) => {
  log.info(`processing detail page ${request.loadedUrl}`);
  const title = $("title").text();
  //get the html of the page
  const html = $.html();

  //get the profile photo URL
  const profilePhotoUrl = $("[data-testid='ProfileImage']").attr("src");

  //get the name from the h1 tag
  const name = $("h1").text();

  //check if there is a logo in the footer with data-testid="Logo--white" or data-testid="Logo--black"
  const logo = $("[data-testid='Logo--white'], [data-testid='Logo--black']");
  let accountType;
  if (logo.length > 0) {
    //if the logo exists, set the account type to "free"
    accountType = "free";
  } else {
    //if the logo does not exist, set the account type to "paid"
    accountType = "paid";
  }

  const socialLinks = utils.social.parseHandlesFromHtml($("div.dLqIok").html());

  //use the parseHandlesFromHtml function to extract the social media handles from the array
  /* const social = utils.social.parseHandlesFromHtml(socialIcons.html()); */

  log.info(`pushing data for ${request.loadedUrl}`);
  //push data to the dataset with all the extracted information
  await Dataset.pushData({
    url: request.loadedUrl,
    title,
    socialLinks,

    profilePhotoUrl,
    name,
    accountType,
  });
});
