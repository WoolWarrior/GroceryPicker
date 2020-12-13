let url = window.location.href;
console.log({url});

// if the item is OOS, isOutOfStock is 1.
let isOutOfStock = document.getElementsByClassName('bop-outOfStock__text').length;
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

if (isOutOfStock !== 1) {
  
  // if the item is in cart already, hasInCart is 2
  let hasInCart = document.getElementsByClassName('gn-button gn-button--buy basketControls__changeQuantity--plus').length;
  if (hasInCart !== 2){
    // The item is no in the cart yet.
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
alert(altertText);
