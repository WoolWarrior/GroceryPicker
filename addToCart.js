let host = window.location.host; 
let url = window.location.href;
console.log({url});
let altertText = "Nothing happen!";

// function to download a text file
const downloadToFile = (content, filename, contentType) => {
  const a = document.createElement('a');
  const file = new Blob([content], {type: contentType});
  
  a.href= URL.createObjectURL(file);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
};

if (host === "groceries.morrisons.com") {
  addToCartMorrisons();
  alert(altertText);
} 

if (host === "www.sainsburys.co.uk") {
  addToCartSainsburys(); 
}

function afterAFewSeconds(seconds) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(seconds);
    }, seconds * 1000);
  });
}

function addToCartMorrisons() {
  // if the item is OOS, isOutOfStock is 1.
  let isOutOfStock = document.getElementsByClassName('bop-outOfStock__text').length;

  if (isOutOfStock !== 1) {
    
    // if the item is in cart already, hasInCart is 2
    let hasInCart = document.getElementsByClassName('gn-button gn-button--buy basketControls__changeQuantity--plus').length;
    if (hasInCart !== 2){
      // The item is not in the cart yet.
      document.getElementsByClassName('gn-button gn-button--buy basketControls__add')[0].click();
      altertText = "1 This item is added to your cart!";
    } else {
      // The item is in the cart. 
      let numberInCart = document.getElementsByName('quantity')[0].value;
      document.getElementsByClassName('gn-button gn-button--buy basketControls__changeQuantity--plus')[0].click();
      altertText = "2 This item is added to your cart! You have " + (++numberInCart) + " in your cart.";
    }
  } else {
    altertText = "3 This item is out of stock.";
    let itemName = document.getElementsByClassName('bop-title')[0].getElementsByTagName('h2')[0].innerText;
    itemName += ' ' + url;
    downloadToFile(itemName, 'Out-of-stock-item.txt', 'text/plain');
  }
}

async function addToCartSainsburys() {

  // if the item is OOS, isOutOfStock is 1.
  let isOutOfStock = document.getElementsByClassName('pd__message').length;
  // if the item is in cart already, hasInCart is 1
  let hasInCart = document.getElementsByClassName('ln-c-button ln-c-button--outlined pt-button__quantity').length;
  // if the item is not in cart and is in stock
  let hasAddButton = document.getElementsByClassName('ln-c-button ln-c-button--filled pt__add-button').length;
  let timeCount = 0;
  let timeOut;

  while(isOutOfStock === 0 && hasInCart === 0 && hasAddButton === 0) {
    await afterAFewSeconds(0.5);
    timeCount++;
    isOutOfStock = document.getElementsByClassName('pd__message').length;
    hasInCart = document.getElementsByClassName('ln-c-button ln-c-button--outlined pt-button__quantity').length;
    hasAddButton = document.getElementsByClassName('ln-c-button ln-c-button--filled pt__add-button').length;
    
    console.log({isOutOfStock});
    console.log({hasInCart});
    console.log({hasInCart});
    console.log(timeCount);
    if (timeCount === 600 ){
      timeOut = true;
      //break after 30 seconds
      break;
    }
  }
  
  if (!timeOut) {
    if (isOutOfStock !== 1) { 
      // let hasInCart = document.getElementsByClassName('ln-c-button ln-c-button--outlined pt-button__quantity').length;
      if (hasInCart !== 1){
        // The item is not in the cart yet.
        document.getElementsByClassName('ln-c-button ln-c-button--filled pt__add-button')[0].click();
        altertText = "1 This item is added to your cart!";
      } else {
        // The item is in the cart. 
        let numberInCart = parseInt(document.getElementsByClassName('ln-c-button ln-c-button--outlined pt-button__quantity')[0].innerText);
        document.getElementsByClassName('ln-c-button ln-c-button--filled pt-button__inc')[0].click();
        altertText = "2 This item is added to your cart! You have " + (++numberInCart) + " in your cart.";
      }
    } else {
      altertText = "3 This item is out of stock.";
      let itemName = document.getElementsByClassName('pd__header')[0].innerText;
      itemName += ' ' + url;
      downloadToFile(itemName, 'Out-of-stock-item.txt', 'text/plain');
    }
  } else {
    altertText = 'Timeout no action taken - Please check the item manually'
  }

  alert(altertText);
}