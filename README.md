# GroceryPicker
This repository is for grocery shopping automation - create csv file from a cart, import csv file to fill a cart

It currently only works on Morrisons, ASDA and Sainsburys website. 

To use both cartToCSV and addToCart, firstly enable Developer mode on your Chrome browser - 
1. Download the repository and unzip it.
2. Go to chrome://extensions/ in your Chrome Browser.
3. Click the 'Developer mode' toggle on the right-up corner. 
4. Click 'Load unpacked' button.
5. Select 'chrome-extension' directory to load it.

To create a csv file from the cart:
1. Click the extension icon
2. Click 'Download items from cart'

To add items from a csv file:
1. Click the extension
2. Check the box 'Enable adding to cart'
3. Open index.html. It is a web form where you can upload the csv of shopping item and convert it into a html table. 
4. Upload the csv file. The csv file should be in the same format as the sample file.
5. Make sure uncheck the box 'Enable adding to cart' after you finish the work

To do:
* Add support for Tesco
* Add support for Other supermarket
* Use jQuery?