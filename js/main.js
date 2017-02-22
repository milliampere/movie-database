
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
	    title: 'The Lobster',
	    year: 2015,
	    genres: ['Comedy', 'Drama', 'Romance', 'Sci-Fi'],
	    ratings: [4, 2, 3, 2]
		},
		{
	    title: 'Her',
	    year: 2013,
	    genres: ['Drama', 'Romance', 'Sci-Fi'],
	    ratings: [5, 4, 5, 5]
		},
		{
	    title: 'Inception',
	    year: 2010,
	    genres: ['Action', 'Adventure', 'Sci-Fi'],
	    ratings: [3, 4, 5, 4]
		},
	];

	return {

		// Only for testing
		returnmovies: () => {
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
		 * Get movies by genre 
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

    // Only for testing
		showmovies: function() {
			// console.log(this);									// MovieDatabase-objekt
			return movies.map((movie) =>{
				// console.log(movie);								// Object {title: "The Lobster", year: 2015, genr.... etc
				return `Title: ${movie.title}, Year: ${movie.year}, Genres: ${movie.genres}`;
			});
		},


	// end of return
	};

// end of MovieDatabase
})();


//console.log(MovieDatabase.getMoviesByGenre('Drama'));
//console.log(MovieDatabase.getTopRatedMovie());

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
	constructor(title, year, genres) {
		this.title = title;
		this.year = year;
		this.genres = genres; 
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




