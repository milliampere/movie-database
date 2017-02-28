/**
 * Eventlistener to apply click-functions and load content at init
 */
document.addEventListener('DOMContentLoaded', function(event) {
	document.getElementById('addMovieButton').addEventListener('click', MovieDatabase.addMovie);
	document.getElementById('sortByGenresButton').addEventListener('click', MovieDatabase.sortByGenre);
	document.getElementById('resetButton').addEventListener('click', () => {MovieDatabase.appendMovies();});
  document.getElementById('yearSortSelect').addEventListener('change', MovieDatabase.sortByYear);
  
  MovieDatabase.appendGenresList('genresSortList');
	MovieDatabase.appendGenresList('genresAddList');
	MovieDatabase.fillSelectWithYears(document.getElementById('yearSortSelect'));
	MovieDatabase.fillSelectWithYears(document.getElementById('year'));

  MovieDatabase.appendTopLists(); 
  MovieDatabase.appendMovies(); //Fill index with movies
});

/**
 * The Movie Database (revealing module pattern)
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
	    description: 'A thief, who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.',
		},
		{
	    title: 'Interstellar',
	    year: 2014,
	    genres: ['Adventure', 'Drama', 'Sci-Fi'],
	    ratings: [3, 4, 3, 2],
	    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
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
			var sumOfRatings = movie.ratings.reduce((total, rating) => {
				return total + rating;
			}, 0);
			var numberOfRatings = movie.ratings.length;
			return (sumOfRatings/numberOfRatings).toFixed(1);
		},

    /**
     * Get the movie with highest rating
     * @return {Object}		Single movie object
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
     * @return {Object}		Single movie object
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
		 * Rate movie by adding it to its ratings array
		 * @param  {Object}	movie		Movie object
		 * @param  {Number}	rating	Rating to add
		 */
		rateMovie: function(movie, rating){
			movie.ratings.push(parseInt(rating));
			console.log('hej');
		},

		/**
		 * Create a list of all genres with checkboxes in HTML
		 * @param {String} id 			Id of the element to append the list to
		 */
		appendGenresList: function(id){
			var element = document.getElementById(id);
			var htmlChunk = '';
			for(let genre of genres){
				htmlChunk += `
					<label class="checkbox-inline"><input type="checkbox" id="${genre}" value="${genre}">${genre}</label>`;
			}
			element.innerHTML = htmlChunk;
		},

		/**
		 * Add click events to movie list
		 */
		addClickEventsToMovies: function(){
			const ratingSelect = document.getElementsByClassName('ratingSelect');
			const edit = document.getElementsByClassName('edit');
			let title = document.getElementById('title');
			let year = document.getElementById('year');

			var allMovies = document.getElementsByClassName('movie');
			var rateButton = document.getElementsByClassName('rateButton');


			for(let i = 0; i < rateButton.length; i++) {
				rateButton[i].addEventListener('click', function(e){
					console.log(e.target.previousSibling);
					for(var movie of movies){
						if (movie.title == e.target.parentElement.parentElement.parentElement.dataset.title){
							console.log('hej');
							//MovieDatabase.rateMovie(movie, this.value);
						}
					}

				});			
			}


			// for(let i = 0; i < ratingSelect.length; i++) { 
			// 	ratingSelect[i].addEventListener("change", function() {
					
			// 		for(var movie of movies){
			// 			if (movie.title == this.parentElement.dataset.title){
			// 				MovieDatabase.rateMovie(movie, this.value);
			// 			}
			// 		}

			// 	});
			// }

			// for(let i = 0; i < edit.length; i++) { 
			// 	edit[i].addEventListener("click", function() {
			// 		for(var movie of movies){
			// 			if (movie.title == this.parentElement.dataset.title){
			// 				title.value = movie.title;
			// 				year.value = movie.year;	

			// 			}
			// 		}
			// 	});
			// }


		},

    /**
     * Append movies to index.html
     * @param  {Array} moviesArray 		Array of movie objects
     */
		appendMovies: function(moviesArray) {
			const movieList = document.getElementById('movieList');
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
					
					var rating = this.getRating(movie);
					
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
															<p>Rating: ${rating} <span class="glyphicon glyphicon-star"></span></p>
															<select id="ratingSelect" class="ratingSelect custom-select mb-2 mr-sm-2 mb-sm-0">
																<option value="rate">-</option>
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
												    	<button type="button" class="btn btn-default rateButton" id="rateButton">Rate</button>
															<h5>Genres</h5>
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
		    const checkboxes = select.querySelectorAll("input[type='checkbox']");
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

			for(let i = 1990; i <= y; i++){
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
			const highestRatingList = document.getElementById('highestRatingList');
			const lowestRatingList = document.getElementById('lowestRatingList');

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
			let title = document.getElementById('title');
			let year = parseInt(document.getElementById('year'));	
			let description = document.getElementById('description');			
			let select = document.getElementById('genresAddList');

			// Get all checked genres
    	let genres = MovieDatabase.getCheckedElements(select);

			// Check if input values are valid
			if(title.value === ""){
				alert("Well... movie needs a title.");
			}
			else {
				const newMovie = new Movie(title.value, year.value, genres, [], description.value);
				movies.push(newMovie);

				MovieDatabase.appendMovies(); 	//Load the new movie list
				title.value = '';								//reset input value
				description.value = '';					//reset input value
			}
		}, 

		/**
		 * Edit movie in the movies array 
		 */
		editMovie: function(movie){
			var title = document.getElementById('title');
			var year = parseInt(document.getElementById('year'));	

			var editedMovie = new Movie(title, year, ['Drama', 'Comedy'], [5], 'Description of the movie');
			MovieDatabase.addMovieToArray(newMovie);
			
		}, 






	// end of return
	};

// end of MovieDatabase
})();


