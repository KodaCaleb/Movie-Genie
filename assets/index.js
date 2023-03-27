// API key and host for the movies database & streaming availability
const apiKey = '23a236a5b5msh24ce8ba5cf5619ap1aba3bjsn78c3d934c5be';
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

let data2;

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

        if (selectedSort.includes('Top Movies')) {
            selectedSort = 'top_rated_english_250';
        }
        else if (selectedSort.includes('In Theaters')) {
            selectedSort = 'top_boxoffice_last_weekend_10';
        }
        else if (selectedSort.includes('🤢Stinkers🤢')) {
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
    let apiUrl = `https://moviesdatabase.p.rapidapi.com/titles?titleType=movie&list=most_pop_movies${genreQuery}`;

    if (selectedSort) {
        const sortQuery = '&list=' + selectedSort;
        // Create the Movie Database API URL with both query parameters
        apiUrl = `https://moviesdatabase.p.rapidapi.com/titles?titleType=movie${genreQuery}${sortQuery}`;
    }

    // Define options for the API request 1
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': apiHost
        }
    };

    const options2 = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': apiHost2
        }
    };

    // Perform the API request and display the results
    try {
        // Fetch data from the APIs and await response and JSON data
        const response1 = await fetch(apiUrl, options);
        const data1 = await response1.json();

        

        console.log(data1.results);
        // Extract movie results from the data object
        const movies = data1.results;
                
        // Clear the list container's inner HTML
        listContainer.innerHTML = '';

        

        // Iterate through the movie results
        movies.forEach((movie) => {
            let imdbID = movie.id;
            console.log(imdbID);


            //construct apiUrl2 using imdbID from first api results
            const imdbQuery = '&imdb_id=' + imdbID;
            console.log(imdbQuery)
            let apiUrl2 = `https://streaming-availability.p.rapidapi.com/v2/get/basic?country=us${imdbQuery}`

            async function fetchData() {
                const response = await fetch(apiUrl2, options2);
                data2 = await response.json();
            }

            fetchData()
            .then(() => {
                console.log(data2);

                // Create a movie card element
                let movieCard = document.createElement('div');
                movieCard.classList.add('list-el', 'callout', 'secondary');

                // Create and set the movie title element
                const title = document.createElement('h3');
                title.classList.add('movie-title');
                title.textContent = data2.result.originalTitle;
                
                const platforms = data2.result.streamingInfo.us;
                const availability = document.createElement('p');
                availability.classList.add('platforms');
                
                // Extract the platform names and join them with a comma and a space
                const platformNames = Object.keys(platforms)
                    .map(platformKey => {
                        // Capitalize the first letter of the platform name
                        return platformKey.charAt(0).toUpperCase() + platformKey.slice(1);
                    })
                    .join(', ');
                
                // Check if there are any platforms available
                if (platformNames.length > 0) {
                    availability.textContent = `Available on: ${platformNames}`;
                } else {
                    availability.textContent = 'Not available on any platform.';
                }
                
                movieCard.appendChild(availability);
                console.log(platforms);

                // Create and set the movie description element if year exist
                const synopsis = data2.result.overview
                if (synopsis) {
                    var description = document.createElement('p');
                    description.classList.add('movie-description');
                    description.textContent = `Release Year: ${data2.result.overview}`;
                    movieCard.appendChild(description);
                }

                
                // create and set movie poster image if image exist
                const posterURl = movie.primaryImage
                if (posterURl) {
                    var poster = document.createElement('img');
                    poster.classList.add('movie-poster');
                    poster.src = movie.primaryImage.url;
                    poster.alt = movie.titleText.text;
                    movieCard.appendChild(poster);
                }
                
                // Append the title and description to the movie card
                movieCard.appendChild(title);
                
                

                // Append the movie card to the list container
                listContainer.appendChild(movieCard);







            })
            .catch((error) => {
            console.error(error);
            });



            // fetch(apiUrl2, options2)
            // .then((response) => response.json())
            // .then((data) => {
            //     console.log(data);
            //     //assign data to the data2 variable
            //     data2 = data;
            // })
            
            
        
            
                });
            } catch (err) {
                // Log any errors to the console
                console.error(err);
            }
        });