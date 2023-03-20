# Movie Database api keys

 -Movie Database key 
const options = {
	method: 'GET',
	headers: {
    'X-RapidAPI-Key': '56b9500ae6msh95c67a302f2b6e8p1c367fjsna89523e75e53',
    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	}
};

  fetch('URL', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

# Movie Database url query parameters

- basic api url:
'https://moviesdatabase.p.rapidapi.com/titles?titleType=movie'
  -'titleType=movie' query will filter out tv shows -MANDATORY
  -'&genre=' + GENRE will be how we add the genre button value 
  -we can filter from the most pop movies or highest rated list
    -'&list=most_pop_movies'
    -'&list=top_rated_250'
    -

- Ex: 'https://moviesdatabase.p.rapidapi.com/titles?titleType=movie&genre=Action&list=most_pop_movies'
  -first movie entry in object is RRR, second entry is the Northman
  -the dataset includes:
  -imdb id, can utilize this to pull ratings in another fetch function
    -poster img url is available
    -release date
  -10 is the max amount of results given by each search

- Rating fetch url:
  'https://moviesdatabase.p.rapidapi.com/titles/'+ID+'/ratings'
  -we can define the ID with the imdb id value and insert it to the url 
  -then insert rating into movie card w/ votes, add a star for styling or something
  
- Ex: 'https://moviesdatabase.p.rapidapi.com/titles/tt8178634/ratings'
  -this returns a data array for RRR
   -3 values in it
    -tconst: "tt8178634" (the imdb id) 
    -averageRating: 7.9
    -numVotes: 141408




- genre query values available for buttons
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
