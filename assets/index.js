// API key and host for the movies database & streaming availability
const apiKey = '56b9500ae6msh95c67a302f2b6e8p1c367fjsna89523e75e53';
const apiHost = 'moviesdatabase.p.rapidapi.com';
const apiHost2 = 'streaming-availability.p.rapidapi.com';

// References to the HTML elements
const genreButtons = document.querySelectorAll('.genre-button');
const searchButton = document.getElementById('search');
const listContainer = document.getElementById('list');
const sortButtons = document.querySelectorAll('.sort-button');

// Array to store the selected genres
let selectedGenres = [];
// String to store the selected sort
let selectedSort = '';

// Add a click event listener to each genre button
genreButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Remove the 'selected' class from all genre buttons
        genreButtons.forEach((otherButton) => {
            otherButton.classList.remove('selected');
        });

        // Add the 'selected' class to the clicked button
        button.classList.add('selected');

        const genre = button.textContent;

        // Set the selectedGenres array to contain only the clicked genre
        selectedGenres = [genre];
    });
});

// Event listener for sort buttons
sortButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Remove the 'selected' class from all sort buttons
        sortButtons.forEach((otherButton) => {
            otherButton.classList.remove('selected');
        });

        // Add the 'selected' class to the clicked button
        button.classList.add('selected');

        // Set the selectedSort string value
        selectedSort = button.textContent;

        console.log(selectedSort);

        // Replace the selectedSort string value with the corresponding URL string
        if (selectedSort.includes('Popular Movies')) {
            selectedSort = 'most_pop_movies';
        }
        else if (selectedSort.includes('Top Movies')) {
            selectedSort = 'top_rated_english_250';
        }
        else if (selectedSort.includes('In Theaters')) {
            selectedSort = 'top_boxoffice_last_weekend_10';
        }
        else if (selectedSort.includes('Stinkers')) {
            selectedSort = 'top_rated_lowest_100';
        }

        console.log(selectedSort);
    });
});

// Add a click event listener to the search button
searchButton.addEventListener('click', async () => {

    // If no genres are selected, alert the user and return early
    if (selectedGenres.length === 0) {
        alert('Please select one genre.');
        return;
    }

    // Construct the genre query string
    const genreQuery = selectedGenres.map((genre) => `&genre=${encodeURIComponent(genre)}`).join('');
    const sortQuery = '&list=' + selectedSort;
    // Create the Movie Database API URL with query parameters
    const apiUrl = `https://moviesdatabase.p.rapidapi.com/titles?titleType=movie${genreQuery}${sortQuery}`;

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

        console.log(data.results);
                // Extract movie results from the data object
                const movies = data.results;

                // Clear the list container's inner HTML
                listContainer.innerHTML = '';
        
                // Iterate through the movie results
                movies.forEach((movie) => {
                    // Create a movie card element
                    const movieCard = document.createElement('div');
                    movieCard.classList.add('list-el', 'callout', 'secondary');
        
                    // Create and set the movie title element
                    const title = document.createElement('h3');
                    title.classList.add('movie-title');
                    title.textContent = movie.titleText.text;
        
                    // Create and set the movie description element
                    const description = document.createElement('p');
                    description.classList.add('movie-description');
                    description.textContent = `Release Year: ${movie.releaseYear.year}`;
        
                    // Append the title and description to the movie card
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