function cartToCSVMorrisons () {
    const pathname = window.location.pathname;
    if (pathname.substring(0,9) !== "/products") {
        alert('Please go to https://groceries.morrisons.com/products');
        return [];
    } else {
        const screenWidth = window.screen.width;
        if (screenWidth > 1023) {
            alert('Please make the window width smaller than 1024px');
            return [];
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
    const pathname = window.location.pathname;
    if (pathname !== "/shop/AjaxOrderItemDisplayView") {
        alert('Please go to My trolley page');
        return [];
    } else {
        let itemRows = [];
    
        for (let i = 0; i < document.getElementsByTagName('tbody')[1].children.length; i++) {
            let quantity = 0;
            let url = '';
            let priceText = '0';
    
            if (document.getElementsByTagName('tbody')[1].children[i].children[0].children[0].children[0].innerText){
                quantity = document.getElementsByTagName('tbody')[1].children[i].children[0].children[0].children[0].innerText;
            }
            if (document.getElementsByTagName('tbody')[1].children[i].children[1].children[0].children[0].href) {
                url = document.getElementsByTagName('tbody')[1].children[i].children[1].children[0].children[0].href;
            } 
            if (document.getElementsByTagName('tbody')[1].children[i].children[3].innerText) {
                priceText = document.getElementsByTagName('tbody')[1].children[i].children[3].innerText;
            }
        
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

function cartToCSVASDA() {
    const pathname = window.location.pathname;
    if (pathname !== "/trolley") {
        alert('Please go to My trolley page - https://groceries.asda.com/trolley');
        return [];
    } else {
        let itemRows = [];
        
        for (let i = 0; i < document.getElementsByClassName('department-item__title-price-banner').length; i++) {
            let quantity = 0;
            let url = '';
            let priceText = '0';
            let productText = '';
            let promoText = '';

            if (document.getElementsByClassName('department-item')[i].children[1].children[2].children[0].children[0].children[1].children[0].children[0].children[0].children[0].children[1].children[0].value){
                quantity = document.getElementsByClassName('department-item')[i].children[1].children[2].children[0].children[0].children[1].children[0].children[0].children[0].children[0].children[1].children[0].value
            }
            if (document.getElementsByClassName('department-item')[i].children[1].children[0].children[0].children[0].children[0].children[0].href) {
                url = document.getElementsByClassName('department-item')[i].children[1].children[0].children[0].children[0].children[0].children[0].href;
            } 
            if (document.getElementsByClassName('department-item')[i].children[1].children[0].children[1].children[0].children[0].innerText) {
                priceText = document.getElementsByClassName('department-item')[i].children[1].children[0].children[1].children[0].children[0].innerText;
            }
            if (document.getElementsByClassName('department-item')[i].children[1].children[0].children[0].children[0].innerText) {
                productText = document.getElementsByClassName('department-item')[i].children[1].children[0].children[0].children[0].innerText;
            }
            if (document.getElementsByClassName('department-item')[i].children[1].children[0].children[0].children[1]) {
                promoText = document.getElementsByClassName('department-item')[i].children[1].children[0].children[0].children[1].innerText;
            }
        
            let price = '';
        
            if (priceText.startsWith('£')) {
                price = priceText.substring(1);
            } else {
                price = priceText;
            }
            let row = [quantity, url, price, productText, promoText];
            itemRows.push(row);
        }

        return itemRows;
    }
}

function runCartToCSV() {

    let rows = [];
    const head = ['Quantity','Product url','Price','Product','Promotion']
    rows.push(head);

    const host = window.location.host; 
    // const url = window.location.href;

    if (host === "groceries.morrisons.com") {
        rows = rows.concat(cartToCSVMorrisons());
    } 

    if (host === "www.sainsburys.co.uk") {
        rows = rows.concat(cartToCSVSainsburys());
    }

    if (host === "groceries.asda.com") {
        rows = rows.concat(cartToCSVASDA());
    }

    console.log({rows});
    if (rows.length > 1) {
        let csvContent = "data:text/csv;charset=utf-8,";

        rows.forEach(function(rowArray) {
            let row = rowArray.join(",");
            csvContent += row + "\r\n";
        });
    
        const encodedUri = encodeURI(csvContent);
        window.open(encodedUri);
    }
    

}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)    {
    if(request.command === 'clickToDownload'){
        runCartToCSV();
    }
    sendResponse({result: "success"});
});