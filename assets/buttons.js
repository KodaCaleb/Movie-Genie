document.addEventListener('DOMContentLoaded', () => {
    const genreButtons = document.querySelectorAll('.genre-button');
    const sortButtons = document.querySelectorAll('.sort-button');
  
    genreButtons.forEach((button) => {
      button.classList.add('hollow');
    });
  
    genreButtons.forEach((button) => {
      button.addEventListener('click', () => {
        button.classList.toggle('hollow');
      });
    });

    sortButtons.forEach((button) => {
      button.classList.add('hollow');
    });
  
    sortButtons.forEach((button) => {
      button.addEventListener('click', () => {
        button.classList.toggle('hollow');
      });
    });
  });

  