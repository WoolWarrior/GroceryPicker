'use strict';

downloadCSV.onclick = function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {command: "clickToDownload"}, function(response) {
      console.log('response.result');
    });
  });
};

let checkbox1 = document.getElementById('checkbox1');

let uploadButton = document.getElementById('openUpload');

chrome.storage.sync.get('AddToCartEnabled', function(data) {
  checkbox1.checked = data.AddToCartEnabled;
});

checkbox1.onchange = function() {
  let value = this.checked;
  chrome.storage.sync.set({'AddToCartEnabled': value}, function() {
    console.log('The value is'+ value);
  });

  if(value) {
    uploadButton.disabled = false;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {command: "initAddToCart", AddToCartEnabled: value}, function(response) {
        console.log(response.result);
      });
    });
  } else {
    uploadButton.disabled = true;
  }
}

openUpload.onclick = function () {
  chrome.tabs.create({url : "upload.html"}); 
}