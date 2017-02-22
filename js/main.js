
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
		 * @param  {String}					should be more?
		 * @return {Array}
		 */
    getMoviesByGenre: function(...genres){

    	// Create an array of the genres
    	var genresArray = [];
    	for(let genre of genres){
    		genresArray.push(genre);
    	}
    	console.log(genresArray);
    	var arr1 = genresArray;

    	// Kollar att alla värden i arr1 finns i arr2
    	function containsAll(arr1, arr2){
   			return arr1.every(function(v,i) {
      		return arr2.indexOf(v) !== -1; 
   			});

			}

    	return movies.filter((movie) => {

    		var arr2 = movie.genres;
    		console.log(movie);

    		if (containsAll(arr1, arr2)) {  
 				  return movie;
				} else {
				   console.log(false);
				}

			});

    },






    /**
     * Get the ?????
     * @return {Object}
     */
//     getTopRatedMovie: function(){

// // function getMean(movie){
// //     	for(var i= 0; i < movies.length; i++){
// //     	var totalScores = movies[i].ratings.reduce((acc, val) => {
// //     		return (acc + val);
// //     	}, 0);

// //     	var numberOfScores = movies[i].ratings.length;

// //     	console.log(totalScores/numberOfScores);
// //     	return (totalScores/numberOfScores);
// // 			}
// // }

// 		function getMean(movie){
//     	var totalScores = movie.ratings.reduce((acc, val) => {
//     		return (acc + val);
//     	}, 0);

//     	var numberOfScores = movie.ratings.length;

//     	console.log(totalScores/numberOfScores);
//     	return (totalScores/numberOfScores);
// 		}

// 		var obj = 		{
// 	    title: 'Inception',
// 	    year: 2010,
// 	    genres: ['Action', 'Adventure', 'Sci-Fi'],
// 	    ratings: [3, 4, 5, 4]
// 		};

// 		movies.forEach(getMean(movie));


	// movies.reduce((acc, val) => {
	//       return getMean(acc) > getMean(val) ? acc : val; 
	//     }, 0);


    	// return (totalScores/movies[0].ratings.length).toFixed(0);

    // 	return movies
	   //  .reduce((acc, val) => {
	   //    return acc.year > val.year ? acc : val; 
	   //  }, 0);
	    
    // }, 

    // Only for testing
    getRating: function(){
    	var totalScores = movies[0].ratings.reduce((acc, val) => {
    		return (acc + val);
    	}, 0);
    	var numberOfScores = movies[0].ratings.length;
    	return (totalScores/numberOfScores);
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


console.log(MovieDatabase.getMoviesByGenre('Drama', 'Comedy'));


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



