document.addEventListener('DOMContentLoaded', () => {
    const genreButtons = document.querySelectorAll('.genre-button');
  
    genreButtons.forEach((button) => {
      button.classList.add('hollow');
    });
  
    genreButtons.forEach((button) => {
      button.addEventListener('click', () => {
        button.classList.toggle('hollow');
      });
    });
  });

  