function cartToCSVMorrisons (pathname) {
    if (pathname.substring(0,9) !== "/products") {
        alert('Please go to https://groceries.morrisons.com/products');
        window.open('https://groceries.morrisons.com/products');
        return [];
    } else {
        let screenWidth = window.innerWidth;
        if (screenWidth > 1023) {
            alert('Please make the window width smaller than 1024px. Current width: ' + screenWidth + 'px.');
            return [];
        } else {
            if (document.getElementsByClassName('hd-trolleyMenuItem').length === 0) {
                document.getElementsByClassName('hd-basketSummary')[0].click();
            }

            let itemRows = [];

            for (let i = 0; i < document.getElementsByClassName('hd-trolleyMenuItem').length; i++) {
                let quantity =  document.getElementsByClassName('quantityInput__input fop-in-trolley')[i].value;
                let url =       document.getElementsByClassName('hd-trolleyMenuItem__link')[i].href;
                let priceText = document.getElementsByClassName('fop-price')[i].innerText;
                let productText = document.getElementsByClassName('hd-trolleyMenuItem__name')[i].textContent;
                let promoText = '';
                let price = '';
            
                if (priceText.startsWith('£')) {
                    price = priceText.substring(1);
                } else {
                    price = '0.' + priceText.slice(0, -1);
                }
                let row = [quantity, url, price, productText, promoText];
                itemRows.push(row);
            }

            return itemRows;
        }
    }
    
}

function cartToCSVSainsburys (pathname) {
    if (pathname !== "/shop/AjaxOrderItemDisplayView") {
        alert('Please go to My trolley page');
        window.open('/shop/AjaxOrderItemDisplayView')
        return [];
    } else {
        let itemRows = [];
    
        for (let i = 0; i < document.getElementsByTagName('tbody')[1].children.length; i++) {
            let quantity = 0;
            let url = '';
            let priceText = '0';
    
            if (document.getElementsByClassName('inTrolley')[i].innerText){
                quantity = document.getElementsByClassName('inTrolley')[i].innerText;
            }
            if (document.getElementsByClassName('productContainer')[i].firstElementChild.href) {
                url = document.getElementsByClassName('productContainer')[i].firstElementChild.href;
            } 
            if (document.getElementsByClassName('productPrice')[i].innerText) {
                priceText = document.getElementsByClassName('productPrice')[i].innerText;
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

function cartToCSVASDA(pathname) {
    if (pathname !== "/trolley") {
        alert('Please go to My trolley page - https://groceries.asda.com/trolley');
        window.open('https://groceries.asda.com/trolley');
        return [];
    } else {
        let itemRows = [];
        
        for (let i = 0; i < document.getElementsByClassName('department-item__title-price-banner').length; i++) {
            let quantity = 0;
            let url = '';
            let priceText = '0';
            let productText = '';
            let promoText = '';

            if (document.getElementsByClassName('quantity-control__input')[i].value){
                quantity = document.getElementsByClassName('quantity-control__input')[i].value;
            }
            if (document.getElementsByClassName('asda-link asda-link--secondary')[i].href) {
                url = document.getElementsByClassName('asda-link asda-link--secondary')[i].href;
            } 
            if (document.getElementsByClassName('ingredient__price')[i].innerText) {
                priceText = document.getElementsByClassName('ingredient__price')[i].innerText;
            }
            if (document.getElementsByClassName('asda-link asda-link--secondary')[i].innerText) {
                productText = document.getElementsByClassName('asda-link asda-link--secondary')[i].innerText;
            }
            if (document.getElementsByClassName('co-product__promo-text')[i].innerText) {
                promoText = document.getElementsByClassName('co-product__promo-text')[i].innerText;
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

function cartToCSVWaitrose(pathname) {
    if (pathname !== "/ecom/shop/trolley") {
        alert('Please go to https://www.waitrose.com/ecom/shop/trolley');
        window.open('https://www.waitrose.com/ecom/shop/trolley');
        return [];
    } else {
        let itemRows = [];
        
        for (let i = 0; i < document.getElementsByClassName('trolleyPod___3jKcQ').length; i++) {
            let quantity = 0;
            let url = '';
            let priceText = '0';
            let productText = '';
            let promoText = '';

            if (document.getElementsByClassName('quantity___2wfk7')[i].firstChild.textContent){
                quantity = document.getElementsByClassName('quantity___2wfk7')[i].firstChild.textContent;
            }
            if (document.getElementsByClassName('productTitle___3NiuI')[i].href) {
                url = document.getElementsByClassName('productTitle___3NiuI')[i].href;
            } 
            if (document.getElementsByClassName('price___2F5bt')[i].textContent) {
                priceText = document.getElementsByClassName('price___2F5bt')[i].textContent;
            }
            if (document.getElementsByClassName('productTitle___3NiuI')[i].textContent) {
                productText = document.getElementsByClassName('productTitle___3NiuI')[i].textContent;
            }
            
        
            let price = '';
        
            if (priceText.startsWith('£')) {
                price = priceText.substring(1);
            } else {
                price = '0.' + priceText.slice(0, -1);
            }
            let row = [quantity, url, price, productText, promoText];
            itemRows.push(row);
        }

        return itemRows;
    }
}

function runCartToCSV() {
    const pathname = window.location.pathname;
    let rows = [];
    const head = ['Quantity','Product url','Price','Product','Promotion']
    rows.push(head);

    const host = window.location.host; 

    if (host === "groceries.morrisons.com") {
        rows = rows.concat(cartToCSVMorrisons(pathname));
    } 

    if (host === "www.sainsburys.co.uk") {
        rows = rows.concat(cartToCSVSainsburys(pathname));
    }

    if (host === "groceries.asda.com") {
        rows = rows.concat(cartToCSVASDA(pathname));
    }

    if (host === "www.waitrose.com") {
        rows = rows.concat(cartToCSVWaitrose(pathname));
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