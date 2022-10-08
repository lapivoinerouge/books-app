{
  'use strict';

  const select = {
    bookImage: '.book__image',
    booksList: '.books-list',
    filtersForm: '.filters',
  };

  const classNames = {
    bookImage: 'book__image',
    favorite: 'favorite',
    hidden: 'hidden',
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };

  class BookList {
    constructor() {
      this.favoriteBooks = [];
      this.filters = [];

      this.getElements();
      this.renderBooks();
      this.initActions();
    }

    getElements() {
      const thisBookList = this;
      thisBookList.dom = {};
      thisBookList.dom.wrapper = document.querySelector(select.booksList);
      thisBookList.dom.filtersForm = document.querySelector(select.filtersForm);
    }

    renderBooks() {
      const thisBookList = this;
      const data = dataSource.books;
      const bookContainer = thisBookList.dom.wrapper;
  
      for (const book of data) {
        book.rateBackground = thisBookList.updateRateBar(book.rating);
        book.rateWidth = book.rating * 10;
        const generatedHtml = templates.bookTemplate(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHtml);
        
        bookContainer.appendChild(generatedDOM);
      }
    }
  
    filterBooks() {
      const thisBookList = this;
      const data = dataSource.books;
  
      for (const book of data) {
        let shouldBeHidden = false;
  
        for (const filter of thisBookList.filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        const bookElement = document.querySelector('[data-id="' + book.id + '"]');
        if (shouldBeHidden) {
          bookElement.classList.add(classNames.hidden);
        } else {
          bookElement.classList.remove(classNames.hidden);
        }
      }
    }
  
    updateRateBar(rate) {
      let col1, col2;
      if (rate < 6) {
        col1 = '#fefcea';
        col2 = '#f1da36';
      } else if (rate > 6 && rate <= 8) {
        col1 = '#b4df5b';
        col2 = '#b4df5b';
      } else if (rate > 8 && rate <= 9) {
        col1 = '#299a0b';
        col2 = '#299a0b';
      } else {
        col1 = '#ff0084';
        col2 = '#ff0084';
      }
      return `linear-gradient(to bottom, ${ col1 } 0%, ${ col2 } 100%);`;
    }
  
    initActions() {
      const thisBookList = this,
        booksContainer = thisBookList.dom.wrapper,
        filtersForm = thisBookList.dom.filtersForm;
  
      booksContainer.addEventListener('dblclick', function() {
        event.preventDefault();
  
        if (event.target.offsetParent.classList.contains(classNames.bookImage)) {
          const bookImage = event.target.offsetParent;
  
          const id = bookImage.getAttribute('data-id');
          if (thisBookList.favoriteBooks.indexOf(id) > -1) {
            const idx = thisBookList.favoriteBooks.indexOf(id);
            thisBookList.favoriteBooks.splice(idx, 1);
            bookImage.classList.remove(classNames.favorite);
          } else {
            thisBookList.favoriteBooks.push(id);
            bookImage.classList.add(classNames.favorite);
          }
        }
      });
  
      filtersForm.addEventListener('click', function() {
        const target = event.target;
  
        if (target.tagName == 'INPUT' && target.type == 'checkbox' && target.name == 'filter') {
          if (target.checked) {
            thisBookList.filters.push(target.value);
          } else {
            const idx = thisBookList.filters.indexOf(target.value);
            if (idx > -1) {
              thisBookList.filters.splice(idx);
            }
          }
          thisBookList.filterBooks();
        }
      }); 
    }
  }
  const app = new BookList();
}