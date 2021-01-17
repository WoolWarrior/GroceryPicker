'use strict';

downloadCSV.onclick = function(element) {
  let clicked = true;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {command: "clickToDownload"}, function(response) {
      console.log('response.result');
    });
  });
};

let checkbox1 = document.getElementById('checkbox1');

chrome.storage.sync.get('AddToCartEnabled', function(data) {
  checkbox1.checked=data.AddToCartEnabled;
});

checkbox1.onchange = function() {
  let value = this.checked;
  chrome.storage.sync.set({'AddToCartEnabled': value}, function() {
    console.log('The value is'+ value);
  });

  if(value) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {command: "initAddToCart", AddToCartEnabled: value}, function(response) {
        console.log(response.result);
      });
    });
  }
}
