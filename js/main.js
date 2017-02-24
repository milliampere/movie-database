/**
 * Eventlistener to apply click-functions and load content at init
 */
document.addEventListener("DOMContentLoaded", function(event) {
	document.getElementById('addMovieButton').addEventListener('click', MovieDatabase.addMovie);
	document.getElementById('updateButton').addEventListener('click', MovieDatabase.loadUI);
  MovieDatabase.loadUI(); //Fill index with movies
});

/**
 * The Movie Database (module pattern)
 * @return {Object}
 */
var MovieDatabase  = (function(){

	/**
	 * All the movies
	 * @type {Array}
	 */
	var movies = [

		{
	    title: 'The Prestige',
	    year: 2006,
	    genres: ['Drama', 'Mystery', 'Sci-Fi'],
	    ratings: [4, 5, 5, 5], 
	    image: "http://www.hidefninja.com/community/attachments/movie-night-clipart-9cp4q9xce-jpeg.279121/"
		},
		{
	    title: 'Her',
	    year: 2013,
	    genres: ['Drama', 'Romance', 'Sci-Fi'],
	    ratings: [5, 4, 3, 4], 
	    image: "http://www.hidefninja.com/community/attachments/movie-night-clipart-9cp4q9xce-jpeg.279121/"
		},
		{
	    title: 'Inception',
	    year: 2010,
	    genres: ['Action', 'Adventure', 'Sci-Fi'],
	    ratings: [3, 4, 5, 4]
		},
		{
	    title: 'Interstellar',
	    year: 2014,
	    genres: ['Adventure', 'Drama', 'Sci-Fi'],
	    ratings: [3, 4, 3, 2]
		},
	];

	var genres = [
		'Action',
		'Adventure',
		'Drama',
		'Sci-Fi',
	];

	return {

		// Only for testing
		returnMovies: () => {
			return movies;
		},


		// Adds new movie to the array (why is it better to create a new array?)
		addNewMovie: function(newMovie){
      var newMoviesArray = movies;
      newMoviesArray.push(newMovie);
      movies = newMoviesArray;
    },

    /**
     * Get movies by year
     * @param  {Number}		Year
     * @return {Array}		Array of all movie released that year  (should return a list)
     */
    getMoviesThisYear: function(year){
    	return movies.filter((movie) => {
    		return movie.year == year;
    	});
    }, 

		/**
		 * Get movies by genres 
		 * @param  {...String}			any number of values	
		 * @return {Array}
		 */
    getMoviesByGenre: function(...genres){

    	// Create an array of the genre-arguments
    	var genresArray = [];
    	for(let genre of genres){
    		genresArray.push(genre);
    	}

    	// Check if all values in arr1 is in arr2
    	function containsAll(arr1, arr2){
   			return arr1.every(function(v,i) {
      		return arr2.indexOf(v) !== -1; 
   			});

			}

    	return movies.filter((movie) => {
    		if (containsAll(genresArray, movie.genres)) {  
 				  return true;
				} else {
				   //console.log(false);
				}
			});
    },

  	/**
  	 * Calculate the rating of a movie
  	 * @param  {Object}
  	 * @return {Number}					rating 
  	 */
	 	getRating: function(movie){
			var sumOfRatings = movie.ratings.reduce((total, rating) => {
				return total + rating;
			}, 0);
			var numberOfRatings = movie.ratings.length;
			return sumOfRatings/numberOfRatings;
		},

    /**
     * Get the movie with highest ratings
     * @return {Object}
     */
    getTopRatedMovie: function(){
    	return movies.reduce((prev, curr) => {
    		if(this.getRating(prev) < this.getRating(curr)){
    			return curr;
    		}
    		else {
    			return prev;
    		}
    	});
		},

		getWorstRatedMovie: function(){
    	return movies.reduce((prev, curr) => {
    		if(this.getRating(prev) > this.getRating(curr)){
    			return curr;
    		}
    		else {
    			return prev;
    		}
    	});
		},

    // Appends albums to main
		displayMovies: function() {
			var movieList = document.getElementById('movieList');
			let htmlChunk = '';

			for(var movie of movies){
				var rating = this.getRating(movie);
				
				// Space between genres
				var genreList = '';
				for(var genre of movie.genres){
					genreList += (genre + ", ");
				}

				htmlChunk += `
					<div class="movie col-sm-3">
						<div class="panel panel-info">
							<div class="panel-heading"><h3 class="panel-title"><span class="glyphicon glyphicon-film"></span> ${movie.title}</h3></div>
							<div class="panel-body"><p>Title: ${movie.title} </p>
								<p>Year: ${movie.year} </p> 
								<p>Rating: ${rating} </p>
								<button type="button" class="btn btn-default rateMovieButton">Rate this movie</button>
							</div>
							<div class="panel-footer"><p>Genres: ${genreList} <br><a href="#">Lägg till genre</a></p></div>
						</div>
					</div>
				`;
			}
			movieList.innerHTML = htmlChunk;

		},

		// Appends albums to list
		// listMovies: function() {
		// 	var movieList = document.getElementById('list-group');
		// 	var htmlChunk = '';

		// 	for(var movie of movies){
		// 		htmlChunk += `
		// 			<li class="list-group-item"><span class="glyphicon glyphicon-film"></span> ${movie.title}</li>
		// 		`;
		// 	}
		// 	movieList.innerHTML = htmlChunk;
		// },

		/**
		 * Rate movie
		 * @param  {Object}
		 * @param  {Number}
		 * @return 
		 */
		rateMovie: function(movie, rating){
			movie.ratings.push(rating);
		},


		// Load UI
		loadUI: function(){
			MovieDatabase.displayMovies();
			MovieDatabase.showGenres();

			getHighestRating();
			getLowestRating();

			// Highest rating
			function getHighestRating(){
				var highestRatingList = document.getElementById('highestRatingList');
				var movieHighestRating = MovieDatabase.getTopRatedMovie();
				let htmlChunk = '';
				htmlChunk = `<ul class="list-group"><li class="list-group-item"><span class="glyphicon glyphicon-film"></span> ${movieHighestRating.title}</li></ul>`;
				highestRatingList.innerHTML = htmlChunk;
			}

			//Lowest rating
			function getLowestRating(){
				var lowestRatingList = document.getElementById('lowestRatingList');
				var movieLowestRating = MovieDatabase.getWorstRatedMovie();
				let htmlChunk = '';
				htmlChunk = `<ul class="list-group"><li class="list-group-item"><span class="glyphicon glyphicon-film"></span> ${movieLowestRating.title}</li></ul>`;
				lowestRatingList.innerHTML = htmlChunk;
			}

			
			//MovieDatabase.addIdToInputField();

			//Rate
			var rateMovieButtons = document.getElementsByClassName('rateMovieButton');
			for(var i = 0; i < rateMovieButtons.length; i++) { 
				//console.log(rateMovieButtons[i].parentElement.firstChild.innerHTML);
				rateMovieButtons[i].addEventListener("click", function() {
					MovieDatabase.rateMovie(theLobster, 5);
				});
			}
		}, 

		/**
		 * 
		 */
		addMovie: function(){
			var title = document.getElementById('title').value;
			var year = parseInt(document.getElementById('year').value);

			// Check if input values are valid
			if(title === ""){
				alert("Well... a movie needs a title.");
			}
			else if(isNaN(year)){
				alert("Year in numbers pls");
			}
			else {
				var newMovie = new Movie(title, year, ['Drama', 'Comedy'], [5]);
				MovieDatabase.addNewMovie(newMovie);
				MovieDatabase.loadUI();
			}
		}, 


		addIdToMovie: function(){
			//var movieList = document.getElementsByClassName('movie');
		},

		showGenres: function(){
			var genresList = document.getElementById('genresList');
			let htmlChunk = '';
			for(var genre of genres){
				console.log("hej");
				htmlChunk += `
					<label class="checkbox-inline"><input type="checkbox" id="${genre}" value="${genre}">${genre}</label>`;
			}
			genresList.innerHTML = htmlChunk;

		},




	// end of return
	};

// end of MovieDatabase
})();



/*============================================
=              Class Constructor             =
============================================*/

/**
 * Class constructor that creates a new movie
 * @param {String} title 		Name of movie 
 * @param {Number} year 		Release year
 * @param {Array} genres 		Genres of movie
 */
class Movie {
	constructor(title, year, genres, ratings) {
		this.title = title;
		this.year = year;
		this.genres = genres; 
		this.ratings = ratings;
	}
	getMovie() {
		return `(${this.title}, ${this.year}, ${this.genres})`;
	}
}

/**
 * Object created with the Class constructor. 
 * @type {Movie}
 */
var theLobster = new Movie('The Lobster', 2015,['Comedy', 'Drama', 'Romance', 'Sci-Fi']);
theLobster.ratings = [5, 7, 4];
MovieDatabase.addNewMovie(theLobster);



