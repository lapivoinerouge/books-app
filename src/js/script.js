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

  const favoriteBooks = [];
  const filters = [];

  function renderBooks() {
    const data = dataSource.books;
    const bookContainer = document.querySelector(select.booksList);

    for (const book of data) {
      const generatedHtml = templates.bookTemplate(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHtml);
      
      bookContainer.appendChild(generatedDOM);
    }
  }

  function filterBooks() {
    const data = dataSource.books;

    for (const book of data) {
      let shouldBeHidden = false;

      for (const filter of filters) {
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

  function initActions() {
    const bookContainer = document.querySelector(select.booksList),
      filtersForm = document.querySelector(select.filtersForm);

    bookContainer.addEventListener('dblclick', function() {
      event.preventDefault();

      if (event.target.offsetParent.classList.contains(classNames.bookImage)) {
        const bookImage = event.target.offsetParent;

        const id = bookImage.getAttribute('data-id');
        if (favoriteBooks.indexOf(id) > -1) {
          const idx = favoriteBooks.indexOf(id);
          favoriteBooks.splice(idx, 1);
          bookImage.classList.remove(classNames.favorite);
        } else {
          favoriteBooks.push(id);
          bookImage.classList.add(classNames.favorite);
        }
      }
    });

    filtersForm.addEventListener('click', function() {
      const target = event.target;

      if (target.tagName == 'INPUT' && target.type == 'checkbox' && target.name == 'filter') {
        if (target.checked) {
          filters.push(target.value);
        } else {
          const idx = filters.indexOf(target.value);
          if (idx > -1) {
            filters.splice(idx);
          }
        }
        filterBooks();
      }
    }); 
  }

  renderBooks();
  initActions();
}