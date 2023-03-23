// API key and host for the movies database
const apiKey = '56b9500ae6msh95c67a302f2b6e8p1c367fjsna89523e75e53';
const apiHost = 'moviesdatabase.p.rapidapi.com';

// References to the HTML elements
const genreButtons = document.querySelectorAll('.genre-button');
const searchButton = document.getElementById('search');
const listContainer = document.getElementById('list');

// Array to store the selected genres
let selectedGenres = [];

// Add a click event listener to each genre button
genreButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Toggle the 'selected' class on the button
        button.classList.toggle('selected');
        const genre = button.textContent;

        // Add or remove the genre from the selectedGenres array
        if (selectedGenres.includes(genre)) {
            selectedGenres = selectedGenres.filter((g) => g !== genre);
        } else {
            selectedGenres.push(genre);
        }
    });
});

// Add a click event listener to the search button
searchButton.addEventListener('click', async () => {
    
    // If no genres are selected, alert the user and return early
    if (selectedGenres.length === 0) {
        alert('Please select at least one genre.');
        return;
    }

    // Construct the genre query string
    const genreQuery = selectedGenres.map((genre) => `&genre=${encodeURIComponent(genre)}`).join('');
    
    // Create the API URL with query parameters
    const apiUrl = `https://moviesdatabase.p.rapidapi.com/titles?titleType=movie${genreQuery}&list=most_pop_movies`;

    // Define options for the API request
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': apiHost
        }
    };

    // Perform the API request and display the results
    try {
        // Fetch data from the API and await response and JSON data
        const response = await fetch(apiUrl, options);
        const data = await response.json();

        // Extract movie results from the data object
        const movies = data.results;

        // Clear the list container's inner HTML
        listContainer.innerHTML = '';

        // Iterate through the movie results
        movies.forEach((movie) => {
            // Create a movie card element
            const movieCard = document.createElement('div');
            movieCard.classList.add('list-el', 'callout', 'secondary');

            // Create and set the movie poster element
            const poster = document.createElement('img');
            poster.classList.add('movie-poster');
            poster.src = movie.primaryImage.url;
            poster.alt = movie.titleText.text;

            // Create and set the movie title element
            const title = document.createElement('h3');
            title.classList.add('movie-title');
            title.textContent = movie.titleText.text;

            // Create and set the movie description element
            const description = document.createElement('p');
            description.classList.add('movie-description');
            description.textContent = `Release Year: ${movie.releaseYear.year}`;

            // Append the poster, title, and description to the movie card
            movieCard.appendChild(poster);
            movieCard.appendChild(title);
            movieCard.appendChild(description);

            // Append the movie card to the list container
            listContainer.appendChild(movieCard);
        });
    } catch (err) {
        // Log any errors to the console
        console.error(err);
    }
});