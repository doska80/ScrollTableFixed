# ScrollTableFixed


ScrollTableFixed is a small jquery library functions combined with ScrollFix https://github.com/ShiraNai7/jquery-scrollfix library to provide a header table fixed  below the main menu.
the library supports several tables on the same page


# How Use

Add a class with the name that you want in a table

```html
<table  class="fix-table">
```

call the following function on your page

```javascript
$('.fix-table').headerScrollFix()
```

Customizable options:
```javascript
$('.fix-table').headerScrollFix({		
        fixHeaderClass: 'scroll-fix', // menu class
        scrollTableClass: 'scroll-table', // class div table scroll if your page has a div to create a scroll on the table
 })
```			
#License	
Licensed under the MIT license.

Copyright (c) 2013 Fernando Albuquerque, https://ca.linkedin.com/in/fernando1
