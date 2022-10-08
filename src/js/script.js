{
  'use strict';

  const select = {
    bookImage: '.book__image',
    booksList: '.books-list',
  };

  const classNames = {
    bookImage: 'book__image',
    favorite: 'favorite',
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
    // const bookImages = document.querySelectorAll(select.bookImage);

    const bookContainer = document.querySelector(select.booksList);

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

    // for (const bookImage of bookImages) {

    //   bookImage.addEventListener('dblclick', function() {
    //     event.preventDefault();

    //     const id = bookImage.getAttribute('data-id');
    //     if (favoriteBooks.indexOf(id) > -1) {
    //       const idx = favoriteBooks.indexOf(id);
    //       favoriteBooks.splice(idx, 1);
    //       bookImage.classList.remove('favorite');
    //     } else {
    //       favoriteBooks.push(id);
    //       bookImage.classList.add('favorite');
    //     }
    //   });
    // }
  }

  renderBooks();
  initActions();
}