{
  'use strict';

  const select = {
    bookImage: '.book__image',
    booksList: '.books-list',
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };

  const favoriteBooks = [];

  function renderBooks() {
    const data = dataSource.books;
    const bookContainer = document.querySelector(select.booksList);

    for (const book of data) {
      const generatedHtml = templates.bookTemplate(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHtml);
      
      bookContainer.appendChild(generatedDOM);
    }
  }

  function initActions() {
    const bookImages = document.querySelectorAll(select.bookImage);

    for (const bookImage of bookImages) {

      bookImage.addEventListener('dblclick', function() {
        event.preventDefault();

        const id = bookImage.getAttribute('data-id');
        if (favoriteBooks.indexOf(id) > -1) {
          const idx = favoriteBooks.indexOf(id);
          favoriteBooks.splice(idx, 1);
          bookImage.classList.remove('favorite');
        } else {
          favoriteBooks.push(id);
          bookImage.classList.add('favorite');
        }
      });
    }
  }

  renderBooks();
  initActions();
}