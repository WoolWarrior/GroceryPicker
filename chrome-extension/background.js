'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({AddToCartEnabled: false}, function() {
    console.log("Adding to cart is off");
  });
  
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'www.google.com'},
        }),
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'groceries.morrisons.com'},
        }),
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'www.sainsburys.co.uk'},
        }),
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'groceries.asda.com'},
        }),
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'www.waitrose.com'},
        }),
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
