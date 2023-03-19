# Movie Database api keys

 - Utelly and Movie Database key 
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '56b9500ae6msh95c67a302f2b6e8p1c367fjsna89523e75e53',
		'X-RapidAPI-Host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com'
    'X-RapidAPI-Key': '56b9500ae6msh95c67a302f2b6e8p1c367fjsna89523e75e53',
    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	}
};

  fetch('URL', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

# url query parameters
- most pop movies (https://moviesdatabase.p.rapidapi.com/titles/utils/lists?list=most_pop_movies)

- genre (https://moviesdatabase.p.rapidapi.com/titles/utils/genres)
  - array with genres available, [0] = null
    - {
    "results": [
      null,
      "Action",
      "Adult",
      "Adventure",
      "Animation",
      "Biography",
      "Comedy",
      "Crime",
      "Documentary",
      "Drama",
      "Family",
      "Fantasy",
      "Film-Noir",
      "Game-Show",
      "History",
      "Horror",
      "Music",
      "Musical",
      "Mystery",
      "News",
      "Reality-TV",
      "Romance",
      "Sci-Fi",
      "Short",
      "Sport",
      "Talk-Show",
      "Thriller",
      "War",
      "Western"
    ]
  }

