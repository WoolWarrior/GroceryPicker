if (document.getElementsByClassName('hd-trolleyMenuItem').length === 0) {
    document.getElementsByClassName('hd-basketSummary')[0].click();
}
  
let rows = [];
let head = ['Quantity','Product url','Price']
rows.push(head);

for (let i = 0; i < document.getElementsByClassName('hd-trolleyMenuItem').length; i++) {
let quantity = document.getElementsByClassName('hd-trolleyMenuItem')[i].children[1].children[1].children[0].children[0].children[1].value;
let url = document.getElementsByClassName('hd-trolleyMenuItem')[i].children[0].href;
let price = document.getElementsByClassName('hd-trolleyMenuItem')[i].children[1].children[0].innerText.substring(1);
let row = [quantity, url, price];
rows.push(row);
}

console.log({rows});
let csvContent = "data:text/csv;charset=utf-8,";

rows.forEach(function(rowArray) {
    let row = rowArray.join(",");
    csvContent += row + "\r\n";
});

var encodedUri = encodeURI(csvContent);
window.open(encodedUri);
  