'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Eventlistener to apply click-functions and load content at init ...
 */
document.addEventListener('DOMContentLoaded', function (event) {
	document.getElementById('addMovieButton').addEventListener('click', function () {
		MovieDatabase.addMovie();
		$("#addMovie").modal("hide");
	});
	document.getElementById('editMovieButton').addEventListener('click', MovieDatabase.editMovie);
	document.getElementById('sortByGenresButton').addEventListener('click', MovieDatabase.sortByGenre);
	document.getElementById('resetButton').addEventListener('click', function () {
		MovieDatabase.appendMovies();
	});
	document.getElementById('yearSortSelect').addEventListener('change', MovieDatabase.sortByYear);
	document.getElementById('sortByRatingsButton').addEventListener('click', MovieDatabase.sortByRatings);

	MovieDatabase.appendGenresList('genresSortList');
	MovieDatabase.appendGenresList('genresAddList');
	MovieDatabase.fillSelectWithYears(document.getElementById('yearSortSelect'));
	MovieDatabase.fillSelectWithYears(document.getElementById('year'));

	MovieDatabase.appendTopLists();
	MovieDatabase.appendMovies(); //Fill index with movies
});

/**
 * The Movie Database (module pattern)
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
		ratings: [4, 8, 7, 10],
		description: 'Two stage magicians engage in competitive one-upmanship in an attempt to create the ultimate stage illusion.',
		image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjA4NDI0MTIxNF5BMl5BanBnXkFtZTYwNTM0MzY2._V1_SX300.jpg'
	}, {
		title: 'Her',
		year: 2013,
		genres: ['Drama', 'Romance', 'Sci-Fi'],
		ratings: [5, 7, 3, 4],
		description: 'A lonely writer develops an unlikely relationship with an operating system designed to meet his every need.',
		image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjA1Nzk0OTM2OF5BMl5BanBnXkFtZTgwNjU2NjEwMDE@._V1_SX300.jpg'
	}, {
		title: 'Interstellar',
		year: 2014,
		genres: ['Adventure', 'Drama', 'Sci-Fi'],
		ratings: [3, 4, 2],
		description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
		image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjIxNTU4MzY4MF5BMl5BanBnXkFtZTgwMzM4ODI3MjE@._V1_SX300.jpg'
	}, {
		title: 'Inception',
		year: 2010,
		genres: ['Action', 'Adventure', 'Sci-Fi'],
		ratings: [3, 4, 5, 6],
		description: 'A thief, who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.',
		image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg'
	}, {
		title: 'Shutter Island',
		year: 2010,
		genres: ['Mystery', 'Thriller'],
		ratings: [7, 6, 8],
		description: 'In 1954, a U.S. marshal investigates the disappearance of a murderess who escaped from a hospital for the criminally insane.',
		image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxMTIyNzMxMV5BMl5BanBnXkFtZTcwOTc4OTI3Mg@@._V1_SX300.jpg'
	}, {
		title: 'Logan: The Wolverine',
		year: 2017,
		genres: ['Action', 'Drama', 'Sci-Fi'],
		ratings: [6, 6, 8],
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

	return {
		/**
   * Get movies by year
   * @param  {Number}	year	The chosen year
   * @return {Array}				Array of all movies released that year  
   */
		getMoviesThisYear: function getMoviesThisYear(year) {
			return movies.filter(function (movie) {
				return movie.year == year;
			});
		},

		/**
   *  Get movies with ratings between two numbers
   * @param  {Number} to   
   * @param  {Number} from 
   * @return {Array}    				Array of movies with specific ratings  
   */
		getMoviesThisRatings: function getMoviesThisRatings(from, to) {
			return movies.filter(function (movie) {
				return MovieDatabase.getRating(movie) > from && MovieDatabase.getRating(movie) <= to;
			});
		},

		/**
   * Get movies by movie genres
   * @param  {Array} genres  	Array of chosen movie genres
   * @return {Array}    			Array of all movies with those genres
   */
		getMoviesByGenre: function getMoviesByGenre(genres) {
			// Check if all values in arr1 is in arr2
			function containsAll(arr1, arr2) {
				return arr1.every(function (v, i) {
					return arr2.indexOf(v) !== -1;
				});
			}

			return movies.filter(function (movie) {
				return containsAll(genres, movie.genres);
			});
		},

		/**
   * Calculate the average rating value of a movie
   * @param  {Object}	movie		A movie object
   * @return {Number}					The average rating  
   */
		getRating: function getRating(movie) {
			if (movie.ratings.length === 0) {
				return '-';
			}
			var sumOfRatings = movie.ratings.reduce(function (total, rating) {
				return total + rating;
			}, 0);
			var numberOfRatings = movie.ratings.length;
			return (sumOfRatings / numberOfRatings).toFixed(1);
		},

		/**
   * Get the movie with highest rating
   * @return {Object}		Single movie object
   */
		getTopRatedMovie: function getTopRatedMovie() {
			var _this = this;

			return movies.reduce(function (prev, curr) {
				if (parseInt(_this.getRating(prev)) < parseInt(_this.getRating(curr))) {
					return curr;
				} else {
					return prev;
				}
			});
		},

		/**
     * Get the movie with lowest rating
     * @return {Object}		Single movie object
     */
		getWorstRatedMovie: function getWorstRatedMovie() {
			var _this2 = this;

			return movies.reduce(function (prev, curr) {
				if (parseInt(_this2.getRating(prev)) > parseInt(_this2.getRating(curr))) {
					return curr;
				} else {
					return prev;
				}
			});
		},

		/**
   * Rate movie by adding it to its ratings array
   * @param  {Object}	movie		Movie object
   * @param  {Number}	rating	Rating to add
   */
		rateMovie: function rateMovie(movie, rating) {
			movie.ratings.push(parseInt(rating));
		},

		/**
   * Create a list of all genres with checkboxes in index.html
   * @param {String} id 			Id of the element to append the list to
   */
		appendGenresList: function appendGenresList(id) {
			var element = document.getElementById(id);
			var htmlChunk = '';
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = genres[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var genre = _step.value;

					htmlChunk += '\n\t\t\t\t\t<label class="checkbox-inline"><input type="checkbox" id="' + genre + '" value="' + genre + '">' + genre + '</label>';
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

			element.innerHTML = htmlChunk;
		},

		/**
   * Add click events to movie list
   * (This is very messy code)
   */
		addClickEventsToMovies: function addClickEventsToMovies() {
			var title = document.getElementById('title');
			var year = document.getElementById('year');
			var description = document.getElementById('description');
			var genresAddList = document.getElementById('genresAddList');

			var appendedMovies = document.getElementsByClassName('movie');
			var rateButton = document.getElementsByClassName('rateButton');
			var edit = document.getElementsByClassName('edit');

			for (var i = 0; i < appendedMovies.length; i++) {
				rateButton[i].addEventListener('click', function (e) {
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;

					try {
						for (var _iterator2 = movies[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var movie = _step2.value;

							var _datasetTitle = e.target.parentElement.parentElement.parentElement.dataset.title;
							if (movie.title == _datasetTitle) {
								var pickedRating = parseInt(e.target.previousSibling.previousSibling.value);
								MovieDatabase.rateMovie(movie, pickedRating); // Add rating to movie array
								MovieDatabase.appendMovies([movie]); // Load movie with new rating
								MovieDatabase.appendTopLists(); // Load top list 
							}
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
				});
				edit[i].addEventListener("click", function (e) {
					datasetTitle = e.target.parentElement.parentElement.parentElement.parentElement.dataset.title;
					var _iteratorNormalCompletion3 = true;
					var _didIteratorError3 = false;
					var _iteratorError3 = undefined;

					try {
						for (var _iterator3 = movies[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
							var movie = _step3.value;

							if (movie.title == datasetTitle) {
								title.value = movie.title;
								year.value = movie.year;
								description.value = movie.description;

								var allInput = genresAddList.querySelectorAll('input');

								for (var j = 0; j < allInput.length; j++) {
									var _iteratorNormalCompletion4 = true;
									var _didIteratorError4 = false;
									var _iteratorError4 = undefined;

									try {
										for (var _iterator4 = movie.genres[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
											var genre = _step4.value;

											if (allInput[j].id == genre) {
												allInput[j].checked = true;
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
						}
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
				});
			}
		},

		/**
   * Append movies to index.html
   * @param  {Array} moviesArray 		Array of movie objects
   */
		appendMovies: function appendMovies(moviesArray) {
			var movieList = document.getElementById('movieList');
			var htmlChunk = '';

			if (moviesArray === undefined) {
				moviesArray = movies;
			} else if (moviesArray.length === 0) {
				htmlChunk = '<div class="alert alert-danger" role="alert">\n\t  \t\t\t<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>\n\t  \t\t\t<span class="sr-only">Error:</span>\n\t  \t\t\tNo movies to display.\n\t\t\t\t\t</div> ';
				movieList.innerHTML = htmlChunk;
			}

			var _iteratorNormalCompletion5 = true;
			var _didIteratorError5 = false;
			var _iteratorError5 = undefined;

			try {
				for (var _iterator5 = moviesArray[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
					var movie = _step5.value;


					var rating = this.getRating(movie);

					var genreList = '';
					var _iteratorNormalCompletion6 = true;
					var _didIteratorError6 = false;
					var _iteratorError6 = undefined;

					try {
						for (var _iterator6 = movie.genres[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
							var genre = _step6.value;

							genreList += '<span class="label label-default">' + genre + '</span>';
						}

						// Popover (Bootstrap)
					} catch (err) {
						_didIteratorError6 = true;
						_iteratorError6 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion6 && _iterator6.return) {
								_iterator6.return();
							}
						} finally {
							if (_didIteratorError6) {
								throw _iteratorError6;
							}
						}
					}

					$(document).ready(function () {
						$('[data-toggle="popover"]').popover({
							trigger: 'focus',
							placement: 'auto right',
							html: true,
							delay: { "show": 0, "hide": 300 }
						});
					});

					var popoverTitle = movie.title + ' (' + movie.year + ')\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\'#\'><span class=\'glyphicon glyphicon-pencil\'></span></a>';
					var popoverContent = movie.description + ' \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\'#\'><span class=\'glyphicon glyphicon-pencil\'></span></a>';

					$(function () {
						$('.movie').matchHeight();
					});

					htmlChunk += '<div class="movie col-xs-6 col-sm-4 col-md-3" data-title="' + movie.title + '">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="panel panel-default">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="panel-heading">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 class="panel-title">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t ' + movie.title + ' <span class="badge">' + rating + '</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="panel-body">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<img src="' + movie.image + '" class="img-fluid poster" alt="' + movie.title + '" tabindex="0" data-toggle="popover" data-title="' + popoverTitle + '" data-content="' + popoverContent + '">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<select id="ratingSelect" class="ratingSelect custom-select mb-2 mr-sm-2 mb-sm-0">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="10">10</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="9">9</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="8">8</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="7">7</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="6">6</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="5">5</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="4">4</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="3">3</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="2">2</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="1">1</option>\n\t\t\t\t\t\t\t\t\t\t\t\t    \t</select>\n\t\t\t\t\t\t\t\t\t\t\t\t    \t<button type="button" class="btn btn-secondary btn-sm rateButton">Rate</button>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<ul class="list-group">' + genreList + '</ul>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>';
				}
			} catch (err) {
				_didIteratorError5 = true;
				_iteratorError5 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion5 && _iterator5.return) {
						_iterator5.return();
					}
				} finally {
					if (_didIteratorError5) {
						throw _iteratorError5;
					}
				}
			}

			movieList.innerHTML = htmlChunk;
			MovieDatabase.addClickEventsToMovies();
		},

		/**
   * Create an array of movie genres based on which checkboxes are checked  
   * @param  {Node} select 
   * @return {Array}        Array of movie genres
   */
		getCheckedElements: function getCheckedElements(select) {
			var result = [];
			var checkboxes = select.querySelectorAll("input[type='checkbox']");
			for (var i = 0; i < checkboxes.length; i++) {
				if (checkboxes[i].checked) {
					result.push(checkboxes[i].id);
				}
			}
			return result;
		},

		/**
   * Fill a select drop down list with years 
   * @param  {Node} select 		A select node
   */
		fillSelectWithYears: function fillSelectWithYears(select) {
			var htmlChunk = '<option value="all">All</option>';
			var y = new Date().getFullYear();

			for (var i = 2000; i <= y; i++) {
				htmlChunk += '<option value="' + i + '">' + i + '</option>';
			}
			select.innerHTML = htmlChunk;
		},

		/**
   * Append top list 
   * @return {[type]} [description]
   */
		appendTopLists: function appendTopLists() {

			//Get div-elements
			var highestRatingList = document.getElementById('highestRatingList');
			var lowestRatingList = document.getElementById('lowestRatingList');

			var highestRatingHtmlChunk = '';
			var lowestRatingHtmlChunk = '';

			// Make new html with movies of highest and lowest rating
			highestRatingHtmlChunk = '<span class="glyphicon glyphicon-film"></span> ' + MovieDatabase.getTopRatedMovie().title;
			lowestRatingHtmlChunk = '<span class="glyphicon glyphicon-film"></span> ' + MovieDatabase.getWorstRatedMovie().title;

			//Add the html chunks to the div-elements 
			highestRatingList.innerHTML = highestRatingHtmlChunk;
			lowestRatingList.innerHTML = lowestRatingHtmlChunk;
		},

		/**
   * Sort movies by genre
   */
		sortByGenre: function sortByGenre() {
			var select = document.getElementById('genresSortList');
			var checked = MovieDatabase.getCheckedElements(select);
			var movies = MovieDatabase.getMoviesByGenre(checked);
			MovieDatabase.appendMovies(movies);
		},

		/**
   * Sort movies by ratings
   */
		sortByRatings: function sortByRatings() {
			var fromRating = parseInt(document.getElementById('fromRatingSortSelect').value);
			var toRating = parseInt(document.getElementById('toRatingSortSelect').value);
			var moviesThisRatings = MovieDatabase.getMoviesThisRatings(fromRating, toRating);
			MovieDatabase.appendMovies(moviesThisRatings);
		},

		/**
   * Sort movies by year
   */
		sortByYear: function sortByYear() {
			if (this.value === 'all') {
				MovieDatabase.appendMovies();
			} else {
				var moviesThisYear = MovieDatabase.getMoviesThisYear(this.value);
				MovieDatabase.appendMovies(moviesThisYear);
			}
		},

		/**
   * Add new movie to the movie array 
   */
		addMovie: function addMovie() {
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
				MovieDatabase.resetInputs();
			}
		},

		/**
   * Edit movie in the movies array 
   */
		editMovie: function editMovie() {
			var title = document.getElementById('title');
			var checked = document.getElementById('genresAddList');
			var year = document.getElementById('year');

			if (year.value === 'all') {
				alert("Pick a year.");
			} else {
				var _iteratorNormalCompletion7 = true;
				var _didIteratorError7 = false;
				var _iteratorError7 = undefined;

				try {
					for (var _iterator7 = movies[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
						var movie = _step7.value;

						if (movie.title == title.value) {
							movie.year = year.value;
							movie.genres = MovieDatabase.getCheckedElements(checked);
							movie.description = description.value;
							MovieDatabase.appendMovies([movie]);
							MovieDatabase.resetInputs();
						}
					}
				} catch (err) {
					_didIteratorError7 = true;
					_iteratorError7 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion7 && _iterator7.return) {
							_iterator7.return();
						}
					} finally {
						if (_didIteratorError7) {
							throw _iteratorError7;
						}
					}
				}
			}
		},

		/**
   * Reset input values in add/edit movie
   */
		resetInputs: function resetInputs() {
			title.value = ''; //reset input value
			description.value = ''; //reset input value

			var checked = document.getElementById('genresAddList');
			var allInput = genresAddList.querySelectorAll('input');

			// reset checkboxes
			for (var i = 0; i < allInput.length; i++) {
				allInput[i].checked = false;
			}
		},

		appendCounter: function appendCounter() {
			var totalMovies = movies.length;
			console.log(totalMovies);
		}

	};

	// end of MovieDatabase
}();

MovieDatabase.appendCounter();

// $(document).ready(function(){
//     $(".edit").click(function(){
//     	$(this).parents('.movie').find('.panel-title').css( "background-color", "red" );
//     	console.log('hej');
//         //$("#test").hide();
//     });
// });

// $(document).ready(function(){
// 	$(".poster").hover(function(){
// 	    $("#test").hide();
// 	    console.log($(this));
// 	    }, function(){
// 	    $(this).css("background-color", "pink");
// 	});
// });
// 
// 
//