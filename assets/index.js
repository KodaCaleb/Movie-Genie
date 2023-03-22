
const apiKey = '56b9500ae6msh95c67a302f2b6e8p1c367fjsna89523e75e53';
const apiHost = 'moviesdatabase.p.rapidapi.com';

const genreButtons = document.querySelectorAll('.genre-button');
const searchButton = document.getElementById('search');
const listContainer = document.getElementById('list');

let selectedGenres = [];

genreButtons.forEach((button) => {
    button.addEventListener('click', () => {
        button.classList.toggle('selected');
        const genre = button.textContent;
    if (selectedGenres.includes(genre)) {
        selectedGenres = selectedGenres.filter((g) => g !== genre);
    } else {
        selectedGenres.push(genre);
        }
    });
});

searchButton.addEventListener('click', async () => {
    if (selectedGenres.length === 0) {
        alert('Please select at least one genre.');
        return;
    }

    const genreQuery = selectedGenres.map((genre) => `&genre=${encodeURIComponent(genre)}`).join('');
    const apiUrl = `https://moviesdatabase.p.rapidapi.com/titles?titleType=movie${genreQuery}&list=most_pop_movies`;

    const options = {
        method: 'GET',
        headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': apiHost
    }
};


    try {
        const response = await fetch(apiUrl, options);
        const data = await response.json();
        const movies = data.results; // Access the 'results' property

        listContainer.innerHTML = ''; // Clear the list container

    movies.forEach((movie) => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('list-el', 'callout', 'secondary');

        const poster = document.createElement('img');
        poster.classList.add('movie-poster');
        poster.src = movie.primaryImage.url;
        poster.alt = movie.titleText.text;

        const title = document.createElement('h3');
        title.classList.add('movie-title');
        title.textContent = movie.titleText.text;

        const description = document.createElement('p');
        description.classList.add('movie-description');
        description.textContent = `Release Year: ${movie.releaseYear.year}`;

        movieCard.appendChild(poster);
        movieCard.appendChild(title);
        movieCard.appendChild(description);

        listContainer.appendChild(movieCard);
    });
    } catch (err) {
        console.error(err);
    }
});
