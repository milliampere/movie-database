/**
 * Eventlistener to apply click-functions and load content at init ...
 */
document.addEventListener('DOMContentLoaded', function(event) {
	document.getElementById('addMovieButton').addEventListener('click', () => {
		MovieDatabase.addMovie();
		$("#addMovie").modal("hide");
	});
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
	    ratings: [2, 3, 4, 5], 
	    description: 'Two stage magicians engage in competitive one-upmanship in an attempt to create the ultimate stage illusion.',
	    image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjA4NDI0MTIxNF5BMl5BanBnXkFtZTYwNTM0MzY2._V1_SX300.jpg',
			id: 0,
		},
		{
	    title: 'Her',
	    year: 2013,
	    genres: ['Drama', 'Romance', 'Sci-Fi'],
	    ratings: [5, 3], 
	    description: 'A lonely writer develops an unlikely relationship with an operating system designed to meet his every need.',
	    image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjA1Nzk0OTM2OF5BMl5BanBnXkFtZTgwNjU2NjEwMDE@._V1_SX300.jpg',
			id: 1,
		},
		{
	    title: 'Interstellar',
	    year: 2014,
	    genres: ['Adventure', 'Drama', 'Sci-Fi'],
	    ratings: [3, 4, 2],
	    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
	    image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjIxNTU4MzY4MF5BMl5BanBnXkFtZTgwMzM4ODI3MjE@._V1_SX300.jpg',
			id: 2,
		},
		{
	    title: 'Inception',
	    year: 2010,
	    genres: ['Action', 'Adventure', 'Sci-Fi'],
	    ratings: [3, 4, 5, 1],
	    description: 'A thief, who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.',
			image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
		},
		{
	    title: 'Shutter Island',
	    year: 2010,
	    genres: ['Mystery', 'Thriller'],
	    ratings: [5, 2, 3],
	    description: 'In 1954, a U.S. marshal investigates the disappearance of a murderess who escaped from a hospital for the criminally insane.',
			image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxMTIyNzMxMV5BMl5BanBnXkFtZTcwOTc4OTI3Mg@@._V1_SX300.jpg',
		},
		{
	    title: 'Logan: The Wolverine',
	    year: 2017,
	    genres: ['Action', 'Drama', 'Sci-Fi'],
	    ratings: [2, 2, 3],
	    description: 'In the near future, a weary Logan cares for an ailing Professor X in a hide out on the Mexican border. A young mutant arrives, being pursued by dark forces.',
			image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjI1MjkzMjczMV5BMl5BanBnXkFtZTgwNDk4NjYyMTI@._V1_SX300.jpg',
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
		constructor(title, year, genres, ratings, description, image) {
			this.title = title;
			this.year = year;
			this.genres = genres; 
			this.ratings = ratings;
			this.description = description;
			this.image = image;
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

					let id = 'movie'+moviesArray.indexOf(movie);
					
					let genreList = '';
					for(let genre of movie.genres){
						genreList += `<h6 class="genre-badge"><span class="badge badge-default">${genre}</span></h6>`;
					}


					let ratingHtml = `
														<select id="${id}" class="ratingSelect" name="rating" data-current-rating="${rating}" autocomplete="off">
														  <option value="1">1</option>
														  <option value="2">2</option>
														  <option value="3">3</option>
														  <option value="4">4</option>
														  <option value="5">5</option>
														</select>

						                <span class="title current-rating">
						                  Current rating: <span class="value">${rating}</span>
						                </span>
						                <span class="title your-rating hidden">
						                  Your rating: <span class="value"></span>&nbsp;
						                  <a href="#" class="clear-rating"><i class="fa fa-times-circle"></i></a>
						                </span>

														`;



					$(document).ready(function(){
						var currentRating = $('#'+id).data('current-rating');
					   $(function() {
					      $('#'+id).barrating({
					        theme: 'css-stars',
					        initialRating: currentRating,
					        showSelectedRating: false,
					        onSelect:function(value, text, event){

					        	var that = '#'+id;

					        	// Funkar
					        	$(that).parent().css( "background-color", "red" );

					        	MovieDatabase.rateMovie(movie, value);
					        	
					        	//$('that.parent() .current-rating')
                    //    .addClass('hidden');

                    $(that).parent('.my-movie').find('.current-rating').addClass('hidden');

                    $('.my-movie .your-rating')
                        .removeClass('hidden')
                        .find('span')
                        .html(value);

					        	//that.find('.current-rating').addClass('hidden');
					        	//$('#'+id).css('background-color', 'yellow');
					        	//$(('#'+id)' .current-rating').addClass('hidden');
					        } 
					      });
					   });
					});				



					// Popover (Bootstrap)
					$(document).ready(function(){
					    $('[data-toggle="popover"]').popover({
					    	trigger: 'focus',
					    	placement: 'auto right',
					    	html: true,
					    	delay: { "show": 0, "hide": 300 }
					    }); 
					});

					var popoverTitle = `${movie.title} (${movie.year})
															<a href='#'><span class='glyphicon glyphicon-pencil'></span></a>`;
					var popoverContent = `${movie.description} 
																<a href='#'><span class='glyphicon glyphicon-pencil'></span></a>`;

// 					$(function() {
//     $('.movie').matchHeight();
// });

					htmlChunk += `<div class="movie col-xs-6 col-sm-4 col-md-3" data-title="${movie.title}">
													<div class="panel panel-default">
														<div class="panel-heading">
															<h4>${movie.title}<span class="badge badge-default pull-xs-right">${rating}</span>
															</h4>				
														</div>
														<div class="panel-body my-movie">
															<img src="${movie.image}" class="img-fluid poster" alt="${movie.title}" tabindex="0" data-toggle="popover" data-title="${popoverTitle}" data-content="${popoverContent}">

															${ratingHtml}

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

															<small class="text-muted">Last updated 3 mins ago</small>
															
															${genreList}
														</div>
													</div>
												</div>`;
				}
				movieList.innerHTML = htmlChunk;
				//MovieDatabase.addClickEventsToMovies();
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
				const newMovie = new Movie(title.value, year.value, genres, [], description.value, 'http://images.clipartpanda.com/movie-border-clipart-movie_title_border.png');
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

		appendCounter: function(){
			var totalMovies = movies.length;
			console.log(totalMovies);
		},

		appendStarRating: function(){
			var myStars = document.getElementById('mystars');

			var thisMovieRating = MovieDatabase.getRating(MovieDatabase.movies[0]);
    	console.log(thisMovieRating);

			var htmlChunk = `<div class="stars stars-example-fontawesome-o">
										    <select id="example-fontawesome-o" name="rating" data-current-rating="5.6" autocomplete="off">
										      <option value=""></option>
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
										    <span class="title current-rating">
										      Current rating: <span class="value"></span>
										    </span>
										    <span class="title your-rating hidden">
										      Your rating: <span class="value"></span>&nbsp;
										      <a href="#" class="clear-rating"><i class="fa fa-times-circle"></i></a>
										    </span>
										  </div>`;
		myStars.innerHTML = htmlChunk;
		},

	// end of return
	};

// end of MovieDatabase
})();

MovieDatabase.appendCounter();
//MovieDatabase.appendStarRating();




$(document).ready(function(){
   $(function() {
      $('#example').barrating({
        theme: 'css-stars',
        initialRating: 4,
        showSelectedRating: false, 

      });
   });



$(function() {
    function ratingEnable() {
    
    		var currentRating = $('#example-fontawesome-o').data('current-rating');

        $('#example-fontawesome').barrating({
            theme: 'fontawesome-stars',
            showSelectedRating: false
        });

        $('.example-css').barrating({
            theme: 'css-stars',
            initialRating: currentRating,
            showSelectedRating: false
        });

        $('#example-bootstrap').barrating({
            theme: 'bootstrap-stars',
            showSelectedRating: false
        });

        $('.stars-example-fontawesome-o .current-rating')
            .find('span')
            .html(currentRating);

        $('.stars-example-fontawesome-o .clear-rating').on('click', function(event) {
            event.preventDefault();

            $('#example-fontawesome-o')
                .barrating('clear');
        });

        $('#example-fontawesome-o').barrating({
            theme: 'fontawesome-stars-o',
            showSelectedRating: false,
            initialRating: currentRating,
            onSelect: function(value, text) {
                if (!value) {
                    $('#example-fontawesome-o')
                        .barrating('clear');
                } else {
                    $('.stars-example-fontawesome-o .current-rating')
                        .addClass('hidden');

                    $('.stars-example-fontawesome-o .your-rating')
                        .removeClass('hidden')
                        .find('span')
                        .html(value);
                }
            },
            onClear: function(value, text) {
                $('.stars-example-fontawesome-o')
                    .find('.current-rating')
                    .removeClass('hidden')
                    .end()
                    .find('.your-rating')
                    .addClass('hidden');
            }
        });
    }

    // For testing (users without JS)
    function ratingDisable() {
        $('select').barrating('destroy');
    }

    $('.rating-enable').click(function(event) {
        event.preventDefault();

        ratingEnable();

        $(this).addClass('deactivated');
        $('.rating-disable').removeClass('deactivated');
    });

    $('.rating-disable').click(function(event) {
        event.preventDefault();

        ratingDisable();

        $(this).addClass('deactivated');
        $('.rating-enable').removeClass('deactivated');
    });

    ratingEnable();
});


});




    	