'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Eventlistener to apply click-functions and load content at init ...
 */
document.addEventListener('DOMContentLoaded', function (event) {
	document.getElementById('addMovieButton').addEventListener('click', function () {
		MovieDatabase.addMovie();
		$("#addMovieModal").modal("hide");
	});

	document.getElementById('editMovieButton').addEventListener('click', function () {
		MovieDatabase.saveEditedMovie();
		$("#editMovieModal").modal("hide");
	});

	// Filter button events
	document.getElementById('sortByGenresButton').addEventListener('click', AppendToHtml.sortByGenre);
	document.getElementById('yearSortSelect').addEventListener('change', AppendToHtml.sortByYear);
	document.getElementById('sortByRatingsButton').addEventListener('click', AppendToHtml.sortByRatings);

	document.getElementById('resetButton').addEventListener('click', function () {
		MovieDatabase.appendMovies();
		AppendToHtml.resetInputs();
	});

	AppendToHtml.appendGenresList(document.getElementById('genresSortList'));
	AppendToHtml.appendGenresList(document.getElementById('genresAddList'));
	AppendToHtml.fillSelectWithYears(document.getElementById('yearSortSelect'));
	AppendToHtml.fillSelectWithYears(document.getElementById('year'));

	AppendToHtml.appendTopLists();
	MovieDatabase.appendMovies(); //Fill index with movies
	AppendToHtml.clickEventEdit();
});

/**
 * The Movie Database (revealing module pattern)
 * @return {Object}
 */
var MovieDatabase = function () {

	/**
  * All the movies
  * @type {Array}
  */
	var movies = [{
		title: 'The Prestige',
		year: 2006,
		genres: ['Drama', 'Mystery', 'Sci-Fi'],
		ratings: [2, 3, 4, 5],
		description: 'Two stage magicians engage in competitive one-upmanship in an attempt to create the ultimate stage illusion.',
		image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjA4NDI0MTIxNF5BMl5BanBnXkFtZTYwNTM0MzY2._V1_SX300.jpg',
		id: 0
	}, {
		title: 'Her',
		year: 2013,
		genres: ['Drama', 'Romance', 'Sci-Fi'],
		ratings: [5, 3],
		description: 'A lonely writer develops an unlikely relationship with an operating system designed to meet his every need.',
		image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjA1Nzk0OTM2OF5BMl5BanBnXkFtZTgwNjU2NjEwMDE@._V1_SX300.jpg',
		id: 1
	}, {
		title: 'Interstellar',
		year: 2014,
		genres: ['Adventure', 'Drama', 'Sci-Fi'],
		ratings: [3, 4, 2],
		description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
		image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjIxNTU4MzY4MF5BMl5BanBnXkFtZTgwMzM4ODI3MjE@._V1_SX300.jpg',
		id: 2
	}, {
		title: 'Inception',
		year: 2010,
		genres: ['Action', 'Adventure', 'Sci-Fi'],
		ratings: [3, 4, 5, 1],
		description: 'A thief, who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.',
		image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg'
	}, {
		title: 'Shutter Island',
		year: 2010,
		genres: ['Mystery', 'Thriller'],
		ratings: [5, 2, 3],
		description: 'In 1954, a U.S. marshal investigates the disappearance of a murderess who escaped from a hospital for the criminally insane.',
		image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxMTIyNzMxMV5BMl5BanBnXkFtZTcwOTc4OTI3Mg@@._V1_SX300.jpg'
	}, {
		title: 'Logan: The Wolverine',
		year: 2017,
		genres: ['Action', 'Drama', 'Sci-Fi'],
		ratings: [2, 2, 3],
		description: 'In the near future, a weary Logan cares for an ailing Professor X in a hide out on the Mexican border. A young mutant arrives, being pursued by dark forces.',
		image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjI1MjkzMjczMV5BMl5BanBnXkFtZTgwNDk4NjYyMTI@._V1_SX300.jpg'
	}];

	var genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'];

	/**
  * Class constructor that creates a new movie
  * @param {String} title 				Name of movie 
  * @param {Number} year 				Release year
  * @param {Array} genres 				Genres of movie
  * @param {Array} ratings 			Array of ratings
  * @param {String} description 	Movie description
  */

	var Movie = function Movie(title, year, genres, ratings, description, image) {
		_classCallCheck(this, Movie);

		this.title = title;
		this.year = year;
		this.genres = genres;
		this.ratings = ratings;
		this.description = description;
		this.image = image;
	};

	/**
  * Get movies by year
  * @param  {Number}	year	The chosen year
  * @return {Array}				Array of all movies released that year  
  */


	function getMoviesThisYear(year) {
		return movies.filter(function (movie) {
			return movie.year == year;
		});
	}

	/**
  *  Get movies with ratings between two numbers
  * @param  {Number} to   
  * @param  {Number} from 
  * @return {Array}    				Array of movies with specific ratings  
  */
	function getMoviesThisRatings(from, to) {
		return movies.filter(function (movie) {
			return MovieDatabase.getRating(movie) > from && MovieDatabase.getRating(movie) <= to;
		});
	}

	/**
  * Get movies by movie genres
  * @param  {Array} genres  	Array of chosen movie genres
  * @return {Array}    			Array of all movies with those genres
  */
	function getMoviesByGenre(genres) {
		// Check if all values in arr1 is in arr2
		function containsAll(arr1, arr2) {
			return arr1.every(function (v, i) {
				return arr2.indexOf(v) !== -1;
			});
		}

		return movies.filter(function (movie) {
			return containsAll(genres, movie.genres);
		});
	}

	/**
  * Calculate the average rating value of a movie
  * @param  {Object}	movie		A movie object
  * @return {Number}					The average rating  
  */
	function getRating(movie) {
		if (movie.ratings.length === 0) {
			return '-';
		}
		var sumOfRatings = movie.ratings.reduce(function (total, rating) {
			return total + rating;
		}, 0);
		var numberOfRatings = movie.ratings.length;
		return (sumOfRatings / numberOfRatings).toFixed(1);
	}

	/**
  * Get the movie with highest rating
  * @return {Object}		Single movie object
  */
	function getTopRatedMovie() {
		var _this = this;

		return movies.reduce(function (prev, curr) {
			if (parseInt(_this.getRating(prev)) < parseInt(_this.getRating(curr))) {
				return curr;
			} else {
				return prev;
			}
		});
	}

	/**
   * Get the movie with lowest rating
   * @return {Object}		Single movie object
   */
	function getWorstRatedMovie() {
		var _this2 = this;

		return movies.reduce(function (prev, curr) {
			if (parseInt(_this2.getRating(prev)) > parseInt(_this2.getRating(curr))) {
				return curr;
			} else {
				return prev;
			}
		});
	}

	/**
  * Rate movie by adding it to its ratings array
  * @param  {Object}	movie		Movie object
  * @param  {Number}	rating	Rating to add
  */
	function rateMovie(movie, rating) {
		movie.ratings.push(parseInt(rating));
	}

	/**
  * Append movies to index.html
  * @param  {Array} moviesArray 		Array of movie objects
  */
	function appendMovies(moviesArray) {
		var _this3 = this;

		var movieList = document.getElementById('movieList');
		var htmlChunk = '';

		if (moviesArray === undefined) {
			moviesArray = movies;
		} else if (moviesArray.length === 0) {
			htmlChunk = '<div class="alert alert-danger" role="alert">\n  \t\t\t<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>\n  \t\t\t<span class="sr-only">Error:</span>\n  \t\t\tNo movies to display.\n\t\t\t\t</div> ';
			movieList.innerHTML = htmlChunk;
		}

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			var _loop = function _loop() {
				var movie = _step.value;
				rating = _this3.getRating(movie);
				id = 'movie' + moviesArray.indexOf(movie);
				genreList = '';
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = movie.genres[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var genre = _step2.value;

						genreList += '<h6 class="genre-badge"><span class="badge badge-default">' + genre + '</span></h6>';
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}

				ratingHtml = '\n\t\t\t\t\t\t\t\t\t\t\t\t\t<select id="' + id + '" class="ratingSelect" name="rating" data-current-rating="' + rating + '" autocomplete="off">\n\t\t\t\t\t\t\t\t\t\t\t\t\t  <option value="1">1</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t  <option value="2">2</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t  <option value="3">3</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t  <option value="4">4</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t  <option value="5">5</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</select>\n\n\t\t\t\t\t                <span class="title current-rating">\n\t\t\t\t\t                  Current rating: <span class="value">' + rating + '</span>\n\t\t\t\t\t                </span>\n\t\t\t\t\t                <span class="title your-rating hidden">\n\t\t\t\t\t                  Your rating: <span class="value"></span>&nbsp;\n\t\t\t\t\t                  <a href="#" class="clear-rating"><i class="fa fa-times-circle"></i></a>\n\t\t\t\t\t                </span>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t';


				$(document).ready(function () {
					var currentRating = $('#' + id).data('current-rating');
					$(function () {
						$('#' + id).barrating({
							theme: 'css-stars',
							initialRating: currentRating,
							showSelectedRating: false,
							onSelect: function onSelect(value, text, event) {

								var that = '#' + id;

								// Funkar
								$(that).parent().css("background-color", "red");

								MovieDatabase.rateMovie(movie, value);

								//$('that.parent() .current-rating')
								//    .addClass('hidden');

								$(that).parent('.my-movie').find('.current-rating').addClass('hidden');

								$('.my-movie .your-rating').removeClass('hidden').find('span').html(value);

								//that.find('.current-rating').addClass('hidden');
								//$('#'+id).css('background-color', 'yellow');
								//$(('#'+id)' .current-rating').addClass('hidden');
							}
						});
					});
				});

				// Popover (Bootstrap)
				$(document).ready(function () {
					$('[data-toggle="popover"]').popover({
						trigger: 'focus',
						placement: 'auto right',
						html: true,
						delay: { "show": 0, "hide": 300 }
					});
				});

				popoverTitle = movie.title + ' (' + movie.year + ')\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\'#\'><span class=\'glyphicon glyphicon-pencil\'></span></a>';
				popoverContent = movie.description + ' \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\'#\'><span class=\'glyphicon glyphicon-pencil\'></span></a>';

				// 					$(function() {
				//     $('.movie').matchHeight();
				// });

				htmlChunk += '<div class="movie col-xs-6 col-sm-4 col-md-3" data-title="' + movie.title + '">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class="panel panel-default">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="panel-heading">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h4>' + movie.title + '<span class="badge badge-default pull-xs-right">' + rating + '</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</h4>\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="panel-body my-movie">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<img src="' + movie.image + '" class="img-fluid poster" alt="' + movie.title + '">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t' + genreList + ' <br>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<mark>' + movie.year + '</mark>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<small class="text-muted">' + movie.description + '</small>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t' + ratingHtml + '\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<select id="ratingSelect" class="ratingSelect custom-select mb-2 mr-sm-2 mb-sm-0">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="10">10</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="9">9</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="8">8</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="7">7</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="6">6</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="5">5</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="4">4</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="3">3</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="2">2</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="1">1</option>\n\t\t\t\t\t\t\t\t\t\t\t    \t</select>\n\t\t\t\t\t\t\t\t\t\t\t    \t<button type="button" class="btn btn-sm align-middle btn-info rateButton">Rate</button>\n\t\t\t\t\t\t\t\t\t\t\t    \t<button type="button" class="btn btn-sm align-middle btn-info editButton">Edit</button>\n\t\t\t\t\t\t\t\t\t\t\t    \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>';
			};

			for (var _iterator = moviesArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var rating;
				var id;
				var genreList;
				var ratingHtml;
				var popoverTitle;
				var popoverContent;

				_loop();
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		movieList.innerHTML = htmlChunk;
		//MovieDatabase.addClickEventsToMovies();
	}

	/**
  * Create an array of movie genres based on which checkboxes are checked  
  * @param  {Node} select 
  * @return {Array}        Array of movie genres
  */
	function getCheckedElements(select) {
		var result = [];
		var checkboxes = select.querySelectorAll("input[type='checkbox']");
		for (var i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i].checked) {
				result.push(checkboxes[i].id);
			}
		}
		return result;
	}

	/**
  * Find movie in array by title name
  * @param  {String} title 
  * @return {Object}     The movie object    
  */
	function findMovie(title) {
		return movies.filter(function (movie) {
			return movie.title == title;
		})[0];
	}

	/**
  * Add new movie to the movie array 
  */
	function addMovie() {
		var title = document.getElementById('title');
		var year = document.getElementById('year');
		var description = document.getElementById('description');
		var checked = document.getElementById('genresAddList');

		// Get all checked genres
		var genres = MovieDatabase.getCheckedElements(checked);

		// Check if input values are valid
		if (title.value === "") {
			alert("Well... movie needs a title.");
		} else if (year.value === 'all') {
			alert("Pick a year.");
		} else {
			var newMovie = new Movie(title.value, year.value, genres, [], description.value, 'http://images.clipartpanda.com/movie-border-clipart-movie_title_border.png');
			movies.push(newMovie);
			MovieDatabase.appendMovies([movies[movies.length - 1]]); //Load the new movie list
			AppendToHtml.resetInputs();
		}
	}

	/**
  * Edit movie in the movies array 
  */
	function saveEditedMovie() {
		// Find movie object in database
		var titleEdit = document.getElementById('titleEdit').value;
		var movie = MovieDatabase.findMovie(titleEdit);

		// Get changed input data
		var yearEdit = document.getElementById('yearEdit');
		var descriptionEdit = document.getElementById('descriptionEdit');
		var genresEditList = document.getElementById('genresEditList');

		// Change movie object
		movie.year = yearEdit.value;
		movie.description = descriptionEdit.value;
		movie.genres = MovieDatabase.getCheckedElements(genresEditList);

		// Update interface
		MovieDatabase.appendMovies();
	}

	/**
  * Get the array of genres
  * @return {Array} 
  */
	function returnGenresArray() {
		return genres;
	}

	// Only for testing
	function returnMoviesArray() {
		return movies;
	}

	return {

		getMoviesThisYear: getMoviesThisYear,
		getMoviesThisRatings: getMoviesThisRatings,
		getMoviesByGenre: getMoviesByGenre,
		getRating: getRating,
		getTopRatedMovie: getTopRatedMovie,
		getWorstRatedMovie: getWorstRatedMovie,
		rateMovie: rateMovie,
		appendMovies: appendMovies,
		getCheckedElements: getCheckedElements,
		findMovie: findMovie,
		addMovie: addMovie,
		saveEditedMovie: saveEditedMovie,

		genres: returnGenresArray
	};

	// end of MovieDatabase
}();

var AppendToHtml = function () {

	/**
  * Sort movies by genre
  */
	function sortByGenre() {
		var select = document.getElementById('genresSortList');
		var checked = MovieDatabase.getCheckedElements(select);
		var movies = MovieDatabase.getMoviesByGenre(checked);
		MovieDatabase.appendMovies(movies);
	}

	/**
  * Sort movies by ratings
  */
	function sortByRatings() {
		var fromRating = parseInt(document.getElementById('fromRatingSortSelect').value);
		var toRating = parseInt(document.getElementById('toRatingSortSelect').value);
		var moviesThisRatings = MovieDatabase.getMoviesThisRatings(fromRating, toRating);
		MovieDatabase.appendMovies(moviesThisRatings);
	}

	/**
  * Sort movies by year
  */
	function sortByYear() {
		if (this.value === 'all') {
			MovieDatabase.appendMovies();
		} else {
			var moviesThisYear = MovieDatabase.getMoviesThisYear(this.value);
			MovieDatabase.appendMovies(moviesThisYear);
		}
	}

	/**
  * Create a list of all genres with checkboxes in index.html
  * @param {String} element   DOM Element to add checkboxes to
  */
	function appendGenresList(element) {
		var allGenres = MovieDatabase.genres();

		var htmlChunk = '';
		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = allGenres[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var genre = _step3.value;

				htmlChunk += '\n\t\t\t\t<label class="checkbox-inline"><input type="checkbox" id="' + genre + '" value="' + genre + '">' + genre + '</label>';
			}

			// Append to html
		} catch (err) {
			_didIteratorError3 = true;
			_iteratorError3 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion3 && _iterator3.return) {
					_iterator3.return();
				}
			} finally {
				if (_didIteratorError3) {
					throw _iteratorError3;
				}
			}
		}

		element.innerHTML = htmlChunk;
	}

	/**
  * Fill a select drop down list with years 
  * @param  {Node} select 		A select node
  */
	function fillSelectWithYears(select) {
		var htmlChunk = '<option value="all">All</option>';
		var y = new Date().getFullYear();

		for (var i = 2000; i <= y; i++) {
			htmlChunk += '<option value="' + i + '">' + i + '</option>';
		}
		select.innerHTML = htmlChunk;
	}

	/**
  * Reset input values in add/edit movie
  */
	function resetInputs() {
		var title = document.getElementById('title');
		var description = document.getElementById('description');
		var allInput = document.querySelectorAll("input[type='checkbox']");

		title.value = ''; //reset input value
		description.value = ''; //reset input value

		// reset checkboxes
		for (var i = 0; i < allInput.length; i++) {
			allInput[i].checked = false;
		}
	};

	/**
  * Append rating top lists 
  */
	function appendTopLists() {

		//Get div-elements
		var highestRatingList = document.getElementById('highestRatingList');
		var lowestRatingList = document.getElementById('lowestRatingList');

		var highestRatingHtmlChunk = '';
		var lowestRatingHtmlChunk = '';

		// Make new html with movies of highest and lowest rating
		highestRatingHtmlChunk = '<b>Highest rating:</b> ' + MovieDatabase.getTopRatedMovie().title;
		lowestRatingHtmlChunk = '<b>Lowest rating:</b> ' + MovieDatabase.getWorstRatedMovie().title;

		//Add the html chunks to the div-elements 
		highestRatingList.innerHTML = highestRatingHtmlChunk;
		lowestRatingList.innerHTML = lowestRatingHtmlChunk;
	}

	/**
  * Add click events to movie list
  */
	function addClickEventsToMovies() {
		var movieList = document.querySelector("#movieList");
		movieList.addEventListener("click", whenMovieIsClicked, false);
	}

	/**
  * Find out which button was clicked and do stuff
  * @param  {MouseEvent} e 
  */
	function whenMovieIsClicked(e) {
		// Find movie div with dataset attribute
		var movieDiv = e.target.closest('[data-title]');
		// Get dataset title
		var datasetTitle = movieDiv.dataset.title;

		if (e.target !== e.currentTarget) {
			var clickedItem = e.target;
			// Edit button was clicked
			if (clickedItem.classList.contains('editButton') === true) {
				$("#editMovieModal").modal("show");
				fillEditMovieModal(datasetTitle);
			}
			// Rate button was clicked
			else if (clickedItem.classList.contains('rateButton') === true) {
					console.log("RATE");
				}
		}
		e.stopPropagation();
	}

	/**
  * Fill inputs in edit movie modal with movie information from the database
  * @param  {String} title  Movie title
  */
	function fillEditMovieModal(title) {
		// Find movie object in database
		var movie = MovieDatabase.findMovie(title);

		// Fill select with years
		fillSelectWithYears(document.getElementById('yearEdit'));

		// Append genre list with checked genres
		var genresEditList = document.getElementById('genresEditList');
		appendGenresList(genresEditList);
		fillGenreListWithChecked(genresEditList, movie.genres);

		// Fill input values
		document.getElementById('titleEdit').value = movie.title;
		document.getElementById('yearEdit').value = movie.year;
		document.getElementById('descriptionEdit').value = movie.description;
	}

	/**
  * Fill checkbox inputs with checked genres 
  * @param  {String} element 	DOM element with checkboxes 
  * @param  {Array} genres  		Array of genres
  */
	function fillGenreListWithChecked(element, genres) {

		// Get all checkbox inputs
		var allInput = element.querySelectorAll('input');

		// Look for match in checkbox input id and genre in movie object
		for (var i = 0; i < allInput.length; i++) {
			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;

			try {
				for (var _iterator4 = genres[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
					var genre = _step4.value;

					if (allInput[i].id == genre) {
						allInput[i].checked = true;
					}
				}
			} catch (err) {
				_didIteratorError4 = true;
				_iteratorError4 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion4 && _iterator4.return) {
						_iterator4.return();
					}
				} finally {
					if (_didIteratorError4) {
						throw _iteratorError4;
					}
				}
			}
		}
	}

	function appendStarRating() {
		var myStars = document.getElementById('mystars');

		var thisMovieRating = MovieDatabase.getRating(MovieDatabase.movies[0]);
		console.log(thisMovieRating);

		var htmlChunk = '<div class="stars stars-example-fontawesome-o">\n\t\t\t\t\t\t\t\t\t    <select id="example-fontawesome-o" name="rating" data-current-rating="5.6" autocomplete="off">\n\t\t\t\t\t\t\t\t\t      <option value=""></option>\n\t\t\t\t\t\t\t\t\t      <option value="1">1</option>\n\t\t\t\t\t\t\t\t\t      <option value="2">2</option>\n\t\t\t\t\t\t\t\t\t      <option value="3">3</option>\n\t\t\t\t\t\t\t\t\t      <option value="4">4</option>\n\t\t\t\t\t\t\t\t\t      <option value="5">5</option>\n\t\t\t\t\t\t\t\t\t      <option value="6">6</option>\n\t\t\t\t\t\t\t\t\t      <option value="7">7</option>\n\t\t\t\t\t\t\t\t\t      <option value="8">8</option>\n\t\t\t\t\t\t\t\t\t      <option value="9">9</option>\n\t\t\t\t\t\t\t\t\t      <option value="10">10</option>\n\t\t\t\t\t\t\t\t\t    </select>\n\t\t\t\t\t\t\t\t\t    <span class="title current-rating">\n\t\t\t\t\t\t\t\t\t      Current rating: <span class="value"></span>\n\t\t\t\t\t\t\t\t\t    </span>\n\t\t\t\t\t\t\t\t\t    <span class="title your-rating hidden">\n\t\t\t\t\t\t\t\t\t      Your rating: <span class="value"></span>&nbsp;\n\t\t\t\t\t\t\t\t\t      <a href="#" class="clear-rating"><i class="fa fa-times-circle"></i></a>\n\t\t\t\t\t\t\t\t\t    </span>\n\t\t\t\t\t\t\t\t\t  </div>';
		myStars.innerHTML = htmlChunk;
	}

	return {

		sortByGenre: sortByGenre,
		sortByRatings: sortByRatings,
		sortByYear: sortByYear,
		appendGenresList: appendGenresList,
		fillSelectWithYears: fillSelectWithYears,
		resetInputs: resetInputs,
		appendTopLists: appendTopLists,
		addClickEventsToMovies: addClickEventsToMovies,

		//appendCounter: appendCounter,
		appendStarRating: appendStarRating

		// end of return
	};

	// end of AppendToHtml
}();