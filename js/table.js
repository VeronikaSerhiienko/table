;(function() {
  var table = document.querySelector('.js-table');
  var tableBody = table.querySelector('.js-table-body');
  var positions = tableBody.querySelectorAll('.position');
  var tableRowsArray = tableBody.querySelectorAll('tr');
  var filterField = document.querySelector('.js-filter');
  var rowsPerPageField = document.querySelector('.js-rows-per-page');
  var pageInformationField = document.querySelector('.js-page-information');
  var pageControls = document.querySelector('.js-page-controls');
  var previousPage = pageControls.querySelector('.js-previous-page');
  var nextPage = pageControls.querySelector('.js-next-page');
  var pageNumberList = pageControls.querySelector('.js-page-number-list');
  var pageNumberListItem = pageControls.querySelectorAll('.js-page-number-list-item');
  var totalAmountOfRows = tableRowsArray.length;
  var amountOfPages;
  var pageNumberListLink;
  var currentPage = 1;
  var rowsPerPageFieldInputedValue;
  
  filterField.addEventListener('input', showRows);
  rowsPerPageField.addEventListener('input', showRowsPerPage);
  pageNumberList.addEventListener('click', showSelectedPage);
  nextPage.addEventListener('click', showNextPage);
  previousPage.addEventListener('click', showPreviousPage);

  function showRows() {
    var filterFieldInputedValue = filterField.value.toLowerCase();
    tableRowsArray = tableBody.querySelectorAll('tr');
    totalAmountOfRows = tableRowsArray.length;
    var filtredTableRowsArray = []; 
    tableRowsArray.forEach(function(item) {
      item.removeAttribute('data-filter');
      item.classList.add('non-visible');
      var countryName = item.querySelector('.country').innerHTML.toLowerCase();
      if (countryName.indexOf(filterFieldInputedValue) !== -1) {        
        item.dataset.filter = true;
        item.classList.remove('non-visible');
        filtredTableRowsArray.push(item);
      }
    });
    tableRowsArray = filtredTableRowsArray;
    totalAmountOfRows = filtredTableRowsArray.length;
    showRowsPerPage();
  }

  function drawPage(rowsPerPageFieldInputedValue) {
    if (rowsPerPageFieldInputedValue < 1) {
      return;
    }
    tableRowsArray.forEach(function(item, i) {
      item.classList.add('non-visible');
      var countryName = item.querySelector('.country').innerHTML.toLowerCase();
      if ((i >= ((currentPage - 1) * rowsPerPageFieldInputedValue)) && 
        (i < currentPage * rowsPerPageFieldInputedValue)) {
        item.classList.remove('non-visible');
        positions[i].innerText = i + 1;
      }
    });
  }

  function showPageInformation (rowsPerPageFieldInputedValue) {
    if (totalAmountOfRows !== 0) {
      pageInformationField.innerHTML = 'Show ' + ((((currentPage - 1) * rowsPerPageFieldInputedValue  + 1))) + ' to ' + Math.min(currentPage * rowsPerPageFieldInputedValue, totalAmountOfRows) +' of ' + totalAmountOfRows + ' rows ';
    } else {
      pageInformationField.innerHTML = 'Show ' + 0 +' of ' + 0 + ' rows ';
    }
  }

  function setOrRemoveHrefAttribute() {
    previousPage.removeAttribute('href', '#');
    nextPage.removeAttribute('href', '#');

    if (currentPage !== 1) {
      previousPage.setAttribute('href', '#');
    }

    if (currentPage !== amountOfPages) {
      nextPage.setAttribute('href', '#');
    }
  }

  function showSelectedPage(event) {
    pageNumberListLink = document.querySelectorAll('.js-page-number-list-link');
    var pageNumberInnerText = event.target.innerHTML;
    pageNumberListLink[currentPage -1].classList.remove('pager__page--current');
    currentPage = +pageNumberInnerText;
    pageNumberListLink[currentPage - 1].classList.add('pager__page--current');

    drawPage(rowsPerPageFieldInputedValue);
    setOrRemoveHrefAttribute();
    showListOfPage();
    showPageInformation(rowsPerPageFieldInputedValue);
  }

  function showNextPage() {
    pageNumberListLink = document.querySelectorAll('.js-page-number-list-link');
    pageNumberListLink[currentPage -1].classList.remove('pager__page--current');
    currentPage++;
    pageNumberListLink[currentPage - 1].classList.add('pager__page--current');

    drawPage(rowsPerPageFieldInputedValue);
    setOrRemoveHrefAttribute();
    showListOfPage();
    showPageInformation(rowsPerPageFieldInputedValue);
  }

  function showPreviousPage() {
    pageNumberListLink = document.querySelectorAll('.js-page-number-list-link');
    pageNumberListLink[currentPage -1].classList.remove('pager__page--current');
    currentPage--;
    pageNumberListLink[currentPage - 1].classList.add('pager__page--current');

    drawPage(rowsPerPageFieldInputedValue);
    setOrRemoveHrefAttribute();
    showListOfPage();
    showPageInformation(rowsPerPageFieldInputedValue);
  }

  function showRowsPerPage() {
    currentPage = 1;
    if (rowsPerPageField.value !== '' || rowsPerPageField.value !== 0) {
      rowsPerPageFieldInputedValue = rowsPerPageField.value;
    } else {
      rowsPerPageFieldInputedValue = totalAmountOfRows;
    }
    
    drawPage(rowsPerPageFieldInputedValue);
    showListOfPage();
    showPageInformation(rowsPerPageFieldInputedValue);
  }

  function showListOfPage() {
    while (pageNumberList.firstChild) {
      pageNumberList.removeChild(pageNumberList.firstChild);
    }
    rowsPerPageFieldInputedValue = rowsPerPageField.value;
    if (rowsPerPageFieldInputedValue < 1) {
      return;
    }    
    amountOfPages = Math.ceil(totalAmountOfRows / rowsPerPageFieldInputedValue);   
    for (var i = 1; i <= amountOfPages; i++) {      
      var pageNumber = document.createElement('li');
      pageNumber.classList.add('pager__list-item');
      pageNumber.classList.add('js-page-number-list-item');      
      pageNumber.classList.add('non-visible');
      if (i === 1 || i === amountOfPages || (i >= currentPage - 1 && i <= currentPage + 1) || ( currentPage === 1 && i === currentPage + 2) ||(currentPage === amountOfPages && i === currentPage - 2)) {
        pageNumber.classList.remove('non-visible');
      }
      var pageNumberLink = document.createElement('a');
      pageNumberLink.classList.add('pager__page');
      pageNumberLink.classList.add('js-page-number-list-link');
      pageNumberLink.setAttribute('href', '#');
      pageNumberLink.innerText = '' + i;
      pageNumberList.appendChild(pageNumber);   
      pageNumber.appendChild(pageNumberLink);
      if (+pageNumberLink.innerHTML === currentPage) {
        pageNumberLink.classList.add('pager__page--current');
      }
    }
    pageNumberListItem = pageControls.querySelectorAll('.js-page-number-list-item');
    removeDots();
    if ( currentPage >= 4) {
      insertDots(pageNumberListItem[1]);
    }
    if (currentPage <= amountOfPages - 3) {   
      insertDots(pageNumberListItem[amountOfPages - 2]);
    }    
    setOrRemoveHrefAttribute();
  }

  function insertDots(place) {
    var tripleDots = document.createElement('li');
    tripleDots.innerText = '...';
    tripleDots.classList.add('js-triple-dots');
    pageNumberList.insertBefore(tripleDots, place);
  }

  function removeDots() {
    var dots = document.querySelectorAll('.js-triple-dots');
    for (var i = 0; i < dots.length; i++) {
      dots[i].remove();
    }
  }
}());