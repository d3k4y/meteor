import { onPageLoad } from "meteor/server-render";

const sockjsVersion = "0.3.4";
const scriptPath =
  "/packages/sockjs-shim/sockjs-" +
  sockjsVersion +
  (Meteor.isProduction ? ".min.js" : ".js");

const hasOwn = Object.prototype.hasOwnProperty;
const minimumMajorVersions = {
  chrome: 16,
  firefox: 11,
  ie: 10,
  safari: 7,
};

onPageLoad(sink => {
  const { browser } = sink.request;

  if (browser &&
      hasOwn.call(minimumMajorVersions, browser.name) &&
      browser.major >= minimumMajorVersions[browser.name]) {
    return;
  }

  sink.appendToHead(
    '<script src="' + scriptPath + '"></script>'
  );
});
