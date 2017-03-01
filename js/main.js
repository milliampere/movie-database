/**
 * Eventlistener to apply click-functions and load content at init
 */
document.addEventListener('DOMContentLoaded', function(event) {
	document.getElementById('addMovieButton').addEventListener('click', MovieDatabase.addMovie);
	document.getElementById('editMovieButton').addEventListener('click', MovieDatabase.editMovie);
	document.getElementById('sortByGenresButton').addEventListener('click', MovieDatabase.sortByGenre);
	document.getElementById('resetButton').addEventListener('click', () => {MovieDatabase.appendMovies();});
  document.getElementById('yearSortSelect').addEventListener('change', MovieDatabase.sortByYear);
  document.getElementById('sortByRatingsButton').addEventListener('click', MovieDatabase.sortByRatings);
  
  MovieDatabase.appendGenresList('genresSortList');
	MovieDatabase.appendGenresList('genresAddList');
	MovieDatabase.fillSelectWithYears(document.getElementById('yearSortSelect'));
	MovieDatabase.fillSelectWithYears(document.getElementById('year'));

  MovieDatabase.appendTopLists(); 
  MovieDatabase.appendMovies(); 	//Fill index with movies
});

/**
 * The Movie Database (module pattern)
 * @return {Object}
 */
const MovieDatabase  = (function(){

	/**
	 * All the movies
	 * @type {Array}
	 */
	const movies = [

		{
	    title: 'The Prestige',
	    year: 2006,
	    genres: ['Drama', 'Mystery', 'Sci-Fi'],
	    ratings: [4, 8, 7, 10], 
	    description: 'Two stage magicians engage in competitive one-upmanship in an attempt to create the ultimate stage illusion.',
	    image: "http://www.hidefninja.com/community/attachments/movie-night-clipart-9cp4q9xce-jpeg.279121/"
		},
		{
	    title: 'Her',
	    year: 2013,
	    genres: ['Drama', 'Romance', 'Sci-Fi'],
	    ratings: [5, 7, 3, 4], 
	    description: 'A lonely writer develops an unlikely relationship with an operating system designed to meet his every need.',
	    image: "http://www.hidefninja.com/community/attachments/movie-night-clipart-9cp4q9xce-jpeg.279121/"
		},
		{
	    title: 'Interstellar',
	    year: 2014,
	    genres: ['Adventure', 'Drama', 'Sci-Fi'],
	    ratings: [3, 4, 2],
	    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
		},
		{
	    title: 'Inception',
	    year: 2010,
	    genres: ['Action', 'Adventure', 'Sci-Fi'],
	    ratings: [3, 4, 5, 6],
	    description: 'A thief, who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.',
		},
		{
	    title: 'Shutter Island',
	    year: 2010,
	    genres: ['Mystery', 'Thriller'],
	    ratings: [7, 6, 8],
	    description: 'In 1954, a U.S. marshal investigates the disappearance of a murderess who escaped from a hospital for the criminally insane.',
		},
		{
	    title: 'Logan: The Wolverine',
	    year: 2017,
	    genres: ['Action', 'Drama', 'Sci-Fi'],
	    ratings: [6, 6, 8],
	    description: 'In the near future, a weary Logan cares for an ailing Professor X in a hide out on the Mexican border. A young mutant arrives, being pursued by dark forces.',
		},
	];

	const genres = [
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
	 * @param {String} title 				Name of movie 
	 * @param {Number} year 				Release year
	 * @param {Array} genres 				Genres of movie
	 * @param {Array} ratings 			Array of ratings
	 * @param {String} description 	Movie description
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
     * @param  {Number}	year	The chosen year
     * @return {Array}				Array of all movies released that year  
     */
    getMoviesThisYear: function(year){
    	return movies.filter((movie) => {
    		return movie.year == year;
    	});
    }, 

    /**
     *  Get movies with ratings between two numbers
     * @param  {Number} to   
     * @param  {Number} from 
     * @return {Array}    				Array of movies with specific ratings  
     */
    getMoviesThisRatings: function(from, to){
    	return movies.filter((movie) => {
    		return (MovieDatabase.getRating(movie) > from && MovieDatabase.getRating(movie) <= to);
    	});
    },

		/**
		 * Get movies by movie genres
		 * @param  {Array} genres  	Array of chosen movie genres
		 * @return {Array}    			Array of all movies with those genres
		 */
    getMoviesByGenre: function(genres){
    	// Check if all values in arr1 is in arr2
    	function containsAll(arr1, arr2){
   			return arr1.every((v,i) => {
      		return arr2.indexOf(v) !== -1; 
   			});
			}

    	return movies.filter((movie) => {
    		return containsAll(genres, movie.genres);
			});
    },

  	/**
  	 * Calculate the average rating value of a movie
  	 * @param  {Object}	movie		A movie object
  	 * @return {Number}					The average rating  
  	 */
	 	getRating: function(movie){
	 		if (movie.ratings.length === 0) {
	 			return '-';
	 		}
			let sumOfRatings = movie.ratings.reduce((total, rating) => {
				return total + rating;
			}, 0);
			let numberOfRatings = movie.ratings.length;
			return (sumOfRatings/numberOfRatings).toFixed(1);
		},

    /**
     * Get the movie with highest rating
     * @return {Object}		Single movie object
     */
    getTopRatedMovie: function(){
    	return movies.reduce((prev, curr) => {
    		if(parseInt(this.getRating(prev)) < parseInt(this.getRating(curr))){
    			return curr;
    		}
    		else {
    			return prev;
    		}
    	});
		},

		/**
     * Get the movie with lowest rating
     * @return {Object}		Single movie object
     */
		getWorstRatedMovie: function(){
    	return movies.reduce((prev, curr) => {
    		if(parseInt(this.getRating(prev)) > parseInt(this.getRating(curr))){
    			return curr;
    		}
    		else {
    			return prev;
    		}
    	});
		},

		/**
		 * Rate movie by adding it to its ratings array
		 * @param  {Object}	movie		Movie object
		 * @param  {Number}	rating	Rating to add
		 */
		rateMovie: function(movie, rating){
			movie.ratings.push(parseInt(rating));
		},

		/**
		 * Create a list of all genres with checkboxes in index.html
		 * @param {String} id 			Id of the element to append the list to
		 */
		appendGenresList: function(id){
			let element = document.getElementById(id);
			let htmlChunk = '';
			for(let genre of genres){
				htmlChunk += `
					<label class="checkbox-inline"><input type="checkbox" id="${genre}" value="${genre}">${genre}</label>`;
			}
			element.innerHTML = htmlChunk;
		},

		/**
		 * Add click events to movie list
		 * (This is very messy code)
		 */
		addClickEventsToMovies: function(){
			let title = document.getElementById('title');
			let year = document.getElementById('year');
			let description = document.getElementById('description');
			let genresAddList = document.getElementById('genresAddList');

			let appendedMovies = document.getElementsByClassName('movie');
			let rateButton = document.getElementsByClassName('rateButton');
			let edit = document.getElementsByClassName('edit');


			for(let i = 0; i < appendedMovies.length; i++) {
				rateButton[i].addEventListener('click', function(e){
					for(var movie of movies){
						let datasetTitle = e.target.parentElement.parentElement.parentElement.dataset.title;
						if (movie.title == datasetTitle){
							let pickedRating = parseInt(e.target.previousSibling.previousSibling.value);
							MovieDatabase.rateMovie(movie, pickedRating);			// Add rating to movie array
							MovieDatabase.appendMovies([movie]);			// Load movie with new rating
							MovieDatabase.appendTopLists();		// Load top list 
						}
					}
				});
				edit[i].addEventListener("click", function(e) {
					datasetTitle = e.target.parentElement.parentElement.parentElement.parentElement.dataset.title;
					for(var movie of movies){
						if (movie.title == datasetTitle){
							title.value = movie.title;
							year.value = movie.year;
							description.value = movie.description;

							var allInput = genresAddList.querySelectorAll('input');

							for (let j = 0; j < allInput.length; j++) {
								for(let genre of movie.genres){
									if (allInput[j].id == genre){
									 	allInput[j].checked = true;
									 }
								}
							}
						}
					}
				});			
			}
		},

    /**
     * Append movies to index.html
     * @param  {Array} moviesArray 		Array of movie objects
     */
		appendMovies: function(moviesArray) {
			let movieList = document.getElementById('movieList');
			let htmlChunk = '';

			if(moviesArray===undefined){
				moviesArray = movies;
			}
			else if(moviesArray.length === 0){
				htmlChunk = `<div class="alert alert-danger" role="alert">
	  			<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
	  			<span class="sr-only">Error:</span>
	  			No movies to display.
					</div> `;
					movieList.innerHTML = htmlChunk;
			}
			
				for(let movie of moviesArray){
					
					let rating = this.getRating(movie);
					
					let genreList = '';
					for(let genre of movie.genres){
						genreList += `<span class="label label-primary">${genre}</span>`;
					}

					htmlChunk += `<div class="movie col-sm-3" data-title="${movie.title}">
													<div class="panel panel-info">
														<div class="panel-heading">
															<h3 class="panel-title">
															<span class="glyphicon glyphicon-film"></span> ${movie.title} (${movie.year})
															</h3>
														</div>
														<div class="panel-body">
															<p>${movie.description}</p>
															Rating: ${rating} <span class="glyphicon glyphicon-star"></span>
															<select id="ratingSelect" class="ratingSelect custom-select mb-2 mr-sm-2 mb-sm-0">
																<option value="10">10</option>
																<option value="9">9</option>
																<option value="8">8</option>
																<option value="7">7</option>
																<option value="6">6</option>
																<option value="5">5</option>
																<option value="4">4</option>
																<option value="3">3</option>
																<option value="2">2</option>
																<option value="1">1</option>
												    	</select>
												    	<button type="button" class="btn btn-secondary btn-sm rateButton">Rate</button>
						    							<ul class="list-group"> ${genreList} </ul>
						    							<p class="edit"><a href="#">Edit this movie</a></p>
														</div>
													</div>
												</div>`;
				}
				movieList.innerHTML = htmlChunk;
				MovieDatabase.addClickEventsToMovies();
		},

		/**
		 * Create an array of movie genres based on which checkboxes are checked  
		 * @param  {Node} select 
		 * @return {Array}        Array of movie genres
		 */
		getCheckedElements: function(select) {
		    let result = [];
		    let checkboxes = select.querySelectorAll("input[type='checkbox']");
		    for (let i = 0; i < checkboxes.length; i++) {
		        if (checkboxes[i].checked){
		        	result.push(checkboxes[i].id);
		        }    
		    }
		    return result;
		},		

		/**
		 * Fill a select drop down list with years 
		 * @param  {Node} select 		A select node
		 */
		fillSelectWithYears: function(select){
			let htmlChunk = '<option value="all">All</option>';
			let y = new Date().getFullYear();

			for(let i = 2000; i <= y; i++){
				htmlChunk += `<option value="${i}">${i}</option>`;
			}
			select.innerHTML = htmlChunk;
		},

		/**
		 * Append top list 
		 * @return {[type]} [description]
		 */
		appendTopLists: function(){

			//Get div-elements
			let highestRatingList = document.getElementById('highestRatingList');
			let lowestRatingList = document.getElementById('lowestRatingList');

			let highestRatingHtmlChunk = '';
			let lowestRatingHtmlChunk = '';

			// Make new html with movies of highest and lowest rating
			highestRatingHtmlChunk = `<span class="glyphicon glyphicon-film"></span> ${MovieDatabase.getTopRatedMovie().title}`;
			lowestRatingHtmlChunk = `<span class="glyphicon glyphicon-film"></span> ${MovieDatabase.getWorstRatedMovie().title}`;
			
			//Add the html chunks to the div-elements 
			highestRatingList.innerHTML = highestRatingHtmlChunk;
			lowestRatingList.innerHTML = lowestRatingHtmlChunk;
		}, 

		/**
		 * Sort movies by genre
		 */
		sortByGenre: function(){
			var select = document.getElementById('genresSortList');
  		var checked = MovieDatabase.getCheckedElements(select);
			var movies = MovieDatabase.getMoviesByGenre(checked);
			MovieDatabase.appendMovies(movies);
		},

		/**
		 * Sort movies by ratings
		 */
		sortByRatings: function(){
			var fromRating = parseInt(document.getElementById('fromRatingSortSelect').value);
			var toRating = parseInt(document.getElementById('toRatingSortSelect').value);
			var moviesThisRatings = MovieDatabase.getMoviesThisRatings(fromRating, toRating);
			MovieDatabase.appendMovies(moviesThisRatings);
		},

		/**
		 * Sort movies by year
		 */
		sortByYear: function(){
			if(this.value === 'all'){
				MovieDatabase.appendMovies();
			}
			else{
				var moviesThisYear = MovieDatabase.getMoviesThisYear(this.value);
		 		MovieDatabase.appendMovies(moviesThisYear);
		 	}
		},

		/**
		 * Add new movie to the movie array 
		 */
		addMovie: function(){
			var title = document.getElementById('title');
			var year = document.getElementById('year');	
			var description = document.getElementById('description');			
			var checked = document.getElementById('genresAddList');

			// Get all checked genres
    	var genres = MovieDatabase.getCheckedElements(checked);

			// Check if input values are valid
			if(title.value === ""){
				alert("Well... movie needs a title.");
			}
			else if(year.value === 'all'){
				alert("Pick a year.");
			}
			else {
				const newMovie = new Movie(title.value, year.value, genres, [], description.value);
				movies.push(newMovie);
				MovieDatabase.appendMovies([movies[movies.length-1]]); 	//Load the new movie list
				MovieDatabase.resetInputs();
			}
		}, 

		/**
		 * Edit movie in the movies array 
		 */
		editMovie: function(){
			let title = document.getElementById('title');
			let checked = document.getElementById('genresAddList');
			let year = document.getElementById('year');

			if(year.value === 'all'){
				alert("Pick a year.");
			}
			else{
				for(let movie of movies){
					if (movie.title == title.value){
						movie.year = year.value;
						movie.genres = MovieDatabase.getCheckedElements(checked);
						movie.description = description.value;
						MovieDatabase.appendMovies([movie]);
						MovieDatabase.resetInputs();
					}
				}		
			}
		}, 

		/**
		 * Reset input values in add/edit movie
		 */
		resetInputs: function(){
			title.value = '';								//reset input value
			description.value = '';					//reset input value

			var checked = document.getElementById('genresAddList');
			var allInput = genresAddList.querySelectorAll('input');

			// reset checkboxes
			for (let i = 0; i < allInput.length; i++) {
				allInput[i].checked = false;
			}	
		},


	// end of return
	};

// end of MovieDatabase
})();

