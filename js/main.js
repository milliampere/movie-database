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
	    description: 'Two stage magicians engage in competitive one-upmanship in an attempt to create the ultimate stage illusion.',
	    image: "http://www.hidefninja.com/community/attachments/movie-night-clipart-9cp4q9xce-jpeg.279121/"
		},
		{
	    title: 'Her',
	    year: 2013,
	    genres: ['Drama', 'Romance', 'Sci-Fi'],
	    ratings: [5, 4, 3, 4], 
	    description: 'A lonely writer develops an unlikely relationship with an operating system designed to meet his every need.',
	    image: "http://www.hidefninja.com/community/attachments/movie-night-clipart-9cp4q9xce-jpeg.279121/"
		},
		{
	    title: 'Inception',
	    year: 2010,
	    genres: ['Action', 'Adventure', 'Sci-Fi'],
	    ratings: [3, 4, 5, 4],
	    description: '',
		},
		{
	    title: 'Interstellar',
	    year: 2014,
	    genres: ['Adventure', 'Drama', 'Sci-Fi'],
	    ratings: [3, 4, 3, 2],
	    description: '',
		},
	];

	var genres = [
		'Action',
		'Adventure',
		'Comedy',
		'Drama',
		'Mystery',
		'Romance',
		'Sci-Fi',
		'Thriller',
	];


	/**
	 * Class constructor that creates a new movie
	 * @param {String} title 		Name of movie 
	 * @param {Number} year 		Release year
	 * @param {Array} genres 		Genres of movie
	 */
	class Movie {
		constructor(title, year, genres, ratings, description) {
			this.title = title;
			this.year = year;
			this.genres = genres; 
			this.ratings = ratings;
			this.description = description;
		}
	}

	return {

    /**
     * Get movies by year
     * @param  {Number}		Year
     * @return {Array}		Array of all movies released that year  
     */
    getMoviesThisYear: function(year){
    	return movies.filter((movie) => {
    		return movie.year == year;
    	});
    }, 

		/**
		 * Get movies by genres
		 * @param  {Array}  	Array of genres
		 * @return {Array}    Array of all movies with those genres
		 */
    getMoviesByGenre: function(genres){

    	// Create an array of the genre-arguments
    	var genresArray = genres;

    	// Check if all values in arr1 is in arr2
    	function containsAll(arr1, arr2){
   			return arr1.every(function(v,i) {
      		return arr2.indexOf(v) !== -1; 
   			});

			}

    	return movies.filter((movie) => {
    		if (containsAll(genresArray, movie.genres)) {  
 				  return true;
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
			return (sumOfRatings/numberOfRatings).toFixed(1);
		},

    /**
     * Get the movie with highest rating
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

		/**
     * Get the movie with lowest rating
     * @return {Object}
     */
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

		/**
		 * Rate movie
		 * @param  {Object}
		 * @param  {Number}
		 */
		rateMovie: function(movie, rating){
			movie.ratings.push(parseInt(rating));
		},

		/**
		 * List all genres with checkboxes
		 * @param {id} 			Id of the element to append the list to
		 * @return {HTML}
		 */
		listGenresWithCheckboxes: function(element){
			var element = document.getElementById(element);
			let htmlChunk = '';
			for(var genre of genres){
				htmlChunk += `
					<label class="checkbox-inline"><input type="checkbox" id="${genre}" value="${genre}">${genre}</label>`;
			}
			return element.innerHTML = htmlChunk;
		},

    /**
     * [displayMovies description]
     * @param  {Array} m 		Array of movies
     * @return {[type]}   [description]
     */
		displayMovies: function(m) {
			var movieList = document.getElementById('movieList');
			let htmlChunk = '';

			if(m===undefined){
				m = movies;
			}
			else if(m.length === 0){
				htmlChunk = `<div class="alert alert-danger" role="alert">
	  			<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
	  			<span class="sr-only">Error:</span>
	  			No movies to display.
					</div> `;
			}

			for(var movie of m){
				var rating = this.getRating(movie);
				
				// Space between genres
				var genreList = '';
				for(var genre of movie.genres){
					genreList += `<li class="list-group-item">${genre}</li>`;
				}

				htmlChunk += `
					<div class="movie col-sm-3">
						<div class="panel panel-info">
							<div class="panel-heading"><h3 class="panel-title"><span class="glyphicon glyphicon-film"></span> ${movie.title} (${movie.year})</h3></div>
							<div class="panel-body" data-title="${movie.title}">
							<p>${movie.description}</p>
								<p>Rating: ${rating} <span class="glyphicon glyphicon-star"></span></p>

								<select id="ratingSelect" class="ratingSelect form-control" name="rating">
									<option value="rate">Rate this movie (1-10)</option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
									<option value="6">6</option>
									<option value="7">7</option>
									<option value="8">8</option>
									<option value="9">9</option>
									<option value="10">10</option>
					    	</select>

								<h5>Genres</h5>
					    	<ul class="list-group"> ${genreList} </ul>

					    	<p class="edit"><a href="#">Change this movie</a></p>

							</div>
							<div class="panel-footer"></div>
						</div>
					</div>
				`;
			}
			movieList.innerHTML = htmlChunk;

		},

		/**
		 * Get an array of checked genres 
		 * @param  {HTML}  
		 * @return {Array}         Array of genres
		 */
		getCheckedElements: function(select) {
		    var result = [];
		    var checkboxes = select.querySelectorAll("input[type='checkbox']");
		    for (var i = 0; i < checkboxes.length; i++) {
		        if (checkboxes[i].checked){
		        	result.push(checkboxes[i].id);
		        }    
		    }
		    return result;
		},		

		// Create a select drop down list with years 1990-now
		fillSelectWithYears: function(select){
			var htmlChunk = '<option value="all">All</option>';
			var y = new Date().getFullYear();

			for(let i = 1990; i <= y; i++){
				htmlChunk += `<option value="${i}">${i}</option>`;
			}
			select.innerHTML = htmlChunk;
		},

		// Load UI
		loadUI: function(){
			MovieDatabase.displayMovies();
			MovieDatabase.listGenresWithCheckboxes('genresSortList');
			MovieDatabase.listGenresWithCheckboxes('genresAddList');
			getHighestRating();
			getLowestRating();
			MovieDatabase.fillSelectWithYears(document.getElementById('yearSortSelect'));
			MovieDatabase.fillSelectWithYears(document.getElementById('year'));


			yearSortSelect.addEventListener('change', function() {
				if(this.value === 'all'){
					MovieDatabase.displayMovies();
				}
				else{
					var moviesThisYear = MovieDatabase.getMoviesThisYear(this.value);
			 		MovieDatabase.displayMovies(moviesThisYear);
			 	}
  					}, false);


			var sortByGenresButton = document.getElementById('sortByGenresButton');
			sortByGenresButton.addEventListener('click', function() {
				var select = document.getElementById('genresSortList');
    		var checked = MovieDatabase.getCheckedElements(select);
				var movies = MovieDatabase.getMoviesByGenre(checked);
				MovieDatabase.displayMovies(movies);
				});




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


			var ratingSelect = document.getElementsByClassName('ratingSelect');
			for(let i = 0; i < ratingSelect.length; i++) { 
				ratingSelect[i].addEventListener("change", function() {
					
					for(var movie of movies){
						if (movie.title == this.parentElement.dataset.title){
							MovieDatabase.rateMovie(movie, this.value);
						}
					}
					MovieDatabase.loadUI();

				});
			}

			var edit = document.getElementsByClassName('edit');
			var title = document.getElementById('title');
			var year = document.getElementById('year');
			//var genresAddList = document.getElementById('genresAddList');
			//getCheckedElements(genresAddList);	

			for(let i = 0; i < edit.length; i++) { 
				edit[i].addEventListener("click", function() {
					for(var movie of movies){
						if (movie.title == this.parentElement.dataset.title){
							title.value = movie.title;
							year.value = movie.year;	

						}
					}

				});
			}

		}, 

		/**
		 * Add new movie to the movie array 
		 */
		addMovie: function(){
			var title = document.getElementById('title').value;
			var year = parseInt(document.getElementById('year').value);	
			var description = document.getElementById('description').value;			
			var select = document.getElementById('genresAddList');

			// Get all checked genres
    	var genres = MovieDatabase.getCheckedElements(select);

			// Check if input values are valid
			if(title === ""){
				alert("Well... movie needs a title.");
			}
			else {
				var newMovie = new Movie(title, year, genres, [], description);
				// Add to array
				movies.push(newMovie);
				// Update displayed list of movies with new movie
				MovieDatabase.displayMovies();
			}
		}, 

		/**
		 * Edit movie in the movies array 
		 */
		editMovie: function(movie){
			var title = document.getElementById('title').value;
			var year = parseInt(document.getElementById('year').value);

			var newMovie = new Movie(title, year, ['Drama', 'Comedy'], [5], 'Description of the movie');
			MovieDatabase.addMovieToArray(newMovie);
			MovieDatabase.loadUI();
			
		}, 






	// end of return
	};

// end of MovieDatabase
})();







/**
 * Object created with the Class constructor. 
 * @type {Movie}
 */
// var theLobster = new Movie('The Lobster', 2015,['Comedy', 'Drama', 'Romance', 'Sci-Fi']);
// theLobster.ratings = [5, 7, 4];
// MovieDatabase.addMovieToArray(theLobster);



