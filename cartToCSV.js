let rows = [];
let head = ['Quantity','Product url','Price']
rows.push(head);

let host = window.location.host; 
let url = window.location.href;

if (host === "groceries.morrisons.com") {
    rows = rows.concat(cartToCSVMorrisons());
} 

if (host === "www.sainsburys.co.uk") {
    rows = rows.concat(cartToCSVSainsburys());
}

function cartToCSVMorrisons () {
    let pathname = window.location.pathname;
    if (pathname.substring(0,10) !== "/products/") {
        alert('Please go to https://groceries.morrisons.com/products/');
    } else {
        let screenWidth = window.screen.width;
        if (screenWidth > 1023) {
            alert('Please make the window width smaller than 1024px');
        } else {
            if (document.getElementsByClassName('hd-trolleyMenuItem').length === 0) {
                document.getElementsByClassName('hd-basketSummary')[0].click();
            }

            let itemRows = [];

            for (let i = 0; i < document.getElementsByClassName('hd-trolleyMenuItem').length; i++) {
                let quantity =  document.getElementsByClassName('hd-trolleyMenuItem')[i].children[1].children[1].children[0].children[0].children[1].value;
                let url =       document.getElementsByClassName('hd-trolleyMenuItem')[i].children[0].href;
                let priceText = document.getElementsByClassName('hd-trolleyMenuItem')[i].children[1].children[0].innerText;
            
                let price = '';
            
                if (priceText.startsWith('£')) {
                    price = priceText.substring(1);
                } else {
                    price = '0.' + priceText.slice(0, -1);
                }
                let row = [quantity, url, price];
                itemRows.push(row);
            }

            return itemRows;
        }
    }
    
}

function cartToCSVSainsburys () {
    let itemRows = [];

    document.getElementsByTagName('tbody')[1]
    
    for (let i = 0; i < document.getElementsByTagName('tbody')[1].children.length; i++) {
        let quantity =  document.getElementsByTagName('tbody')[1].children[i].children[0].children[0].children[0].innerText;
        let url =       document.getElementsByTagName('tbody')[1].children[i].children[1].children[0].children[0].href;
        let priceText = document.getElementsByTagName('tbody')[1].children[i].children[3].innerText;
    
        let price = '';
    
        if (priceText.startsWith('£')) {
            price = priceText.substring(1);
        } else {
            price = '0.' + priceText.slice(0, -1);
        }
        let row = [quantity, url, price];
        itemRows.push(row);
    }

    return itemRows;
}

console.log({rows});
let csvContent = "data:text/csv;charset=utf-8,";

rows.forEach(function(rowArray) {
    let row = rowArray.join(",");
    csvContent += row + "\r\n";
});

var encodedUri = encodeURI(csvContent);
window.open(encodedUri);
  