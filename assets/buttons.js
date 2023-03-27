document.addEventListener('DOMContentLoaded', () => {
  const genreButtons = document.querySelectorAll('.genre-button');
  const sortButtons = document.querySelectorAll('.sort-button');

  genreButtons.forEach((button) => {
    button.classList.add('hollow');
  });

  genreButtons.forEach((button) => {
    button.addEventListener('click', () => {
      genreButtons.forEach((otherButton) => {
        if (otherButton !== button) {
          otherButton.classList.add('hollow');
        }
      });
      button.classList.remove('hollow');
    });
  });

  sortButtons.forEach((button) => {
    button.classList.add('hollow');
  });

  sortButtons.forEach((button) => {
    button.addEventListener('click', () => {
      sortButtons.forEach((otherButton) => {
        if (otherButton !== button) {
          otherButton.classList.add('hollow');
        }
      });
      button.classList.remove('hollow');
    });
  });
});