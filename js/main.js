
/**
 * The Movie Database (module pattern)
 * @return {Object}
 */
var MovieDatabase  = (function(){

	/**
	 * All the movies
	 * @type {Array}
	 */
	var moviesArray = [

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
		returnMoviesArray: () => {
			return moviesArray;
		},

		// Only for testing
		findMovie: function(title){
			return moviesArray.filter((movie) => {
				return movie.title == title;
			});
		},

		// Adds new movie to the array (why is it better to create a new array?)
		addNewMovie: function(newMovie){
      var newMoviesArray = moviesArray;
      newMoviesArray.push(newMovie);
      moviesArray = newMoviesArray;
    },

    /**
     * Get by year
     * @param  {Number}		Year
     * @return {Array}		Array of all movie released that year  (should return a list)
     */
    getMoviesThisYear: function(year){
    	return moviesArray.filter((movie) => {
    		return movie.year == year;
    	});
    }, 

    /**
     * Get the ?????
     * @return {Object}
     */
    getTopRatedMovie: function(){

// function getMean(movie){
//     	for(var i= 0; i < moviesArray.length; i++){
//     	var totalScores = moviesArray[i].ratings.reduce((acc, val) => {
//     		return (acc + val);
//     	}, 0);

//     	var numberOfScores = moviesArray[i].ratings.length;

//     	console.log(totalScores/numberOfScores);
//     	return (totalScores/numberOfScores);
// 			}
// }

		function getMean(movie){
    	var totalScores = movie.ratings.reduce((acc, val) => {
    		return (acc + val);
    	}, 0);

    	var numberOfScores = movie.ratings.length;

    	console.log(totalScores/numberOfScores);
    	return (totalScores/numberOfScores);
		}

		var obj = 		{
	    title: 'Inception',
	    year: 2010,
	    genres: ['Action', 'Adventure', 'Sci-Fi'],
	    ratings: [3, 4, 5, 4]
		};

		moviesArray.forEach(getMean(movie));


	// moviesArray.reduce((acc, val) => {
	//       return getMean(acc) > getMean(val) ? acc : val; 
	//     }, 0);


    	// return (totalScores/moviesArray[0].ratings.length).toFixed(0);

    	return moviesArray
	    .reduce((acc, val) => {
	      return acc.year > val.year ? acc : val; 
	    }, 0);
	    
    }, 

    // Only for testing
    getRating: function(){
    	var totalScores = moviesArray[0].ratings.reduce((acc, val) => {
    		return (acc + val);
    	}, 0);
    	var numberOfScores = moviesArray[0].ratings.length;
    	return (totalScores/numberOfScores);
    }, 

    // Only for testing
		showMoviesArray: function() {
			// console.log(this);									// MovieDatabase-objekt
			return moviesArray.map((movie) =>{
				// console.log(movie);								// Object {title: "The Lobster", year: 2015, genr.... etc
				return `Title: ${movie.title}, Year: ${movie.year}, Genres: ${movie.genres}`;
			});
		},

    // addRating: function(movie, rating){
    //   var newRatingArray = movie.ratingArray;
    //   newRatingArray.push(rating);
    //   ratingArray = newRatingArray;
    // },

	// end of return
	};

// end of MovieDatabase
})();

console.log(MovieDatabase.getTopRatedMovie());

// console.log(MovieDatabase.showMoviesArray(MovieDatabase.returnMoviesArray()));

// console.log(MovieDatabase.findMovie('Her'));

// console.log("År 2013: ");
// console.log(MovieDatabase.getMoviesThisYear(2013));



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
const theLobster = new Movie('The Lobster', 2015,['Comedy', 'Drama', 'Romance', 'Sci-Fi']);
MovieDatabase.addNewMovie(theLobster);

// console.log(theLobster.getMovie());
// console.log(MovieDatabase.returnMoviesArray());


