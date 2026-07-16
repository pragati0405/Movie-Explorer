 const API_KEY = "4ebbc37";

 let searchbox=document.querySelector("#searchInput");
 let searchButton=document.querySelector("#searchButton");
let searchsection=document.querySelector("#searchSection");
let trendingSection=document.querySelector("#trendingSection"); 
let searchResultsList=document.querySelector("#searchResultsList");
let trendingMoviesList=document.querySelector("#trendingMoviesList");
 
let favList = document.querySelector(".fav-list");
 let favCount = document.querySelector(".count");
 let Favourites = document.querySelector(".Favourites");

 let historyList = document.querySelector("#historyList");
let clearBtn = document.querySelector(".clear-btn");

  searchButton.addEventListener("click", function() {
    if (searchbox.value.trim() !== "") {

        let query = searchbox.value.trim();

        let history = JSON.parse(localStorage.getItem("history")) || [];

        if (!history.includes(query)) {
            history.push(query);
        }

        localStorage.setItem("history", JSON.stringify(history));
        renderHistory();

        fetch(`https://www.omdbapi.com/?apikey=4ebbc37&s=${query}`)
            .then(response => response.json())
            .then((data) => {
                searchsection.style.display = "block";
                trendingSection.style.display = "none";
                searchResultsList.innerHTML = "";

                data.Search.forEach(function(movie) {
                    createMovieCard(movie, searchResultsList);
                });
            })
            .catch((error) => {
                console.error("Error fetching movie data:", error);
            });

    } else {
        alert("Please enter a movie name");
    }
});



//   renderFavorites
function renderFavorites() {
    favList.innerHTML = "";
     
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
     
    favorites.forEach(function(title) {
        
        let li = document.createElement("li");
        li.textContent = title;
        favList.appendChild(li);
        
    });
    favCount.textContent = favorites.length;
}


// renderhistory
function renderHistory() {

    historyList.innerHTML = "";

    let history = JSON.parse(localStorage.getItem("history")) || [];

    history.forEach(function(query) {

        let li = document.createElement("li");
        li.textContent = query;

        historyList.appendChild(li);
    });
}


// creating card
 function createMovieCard(movie,containerId) {
      let moviecard=document.createElement("div");
    moviecard.classList.add("movie-card");
    moviecard.innerHTML=`
    <img src="${movie.Poster}" alt="${movie.Title} Poster" class="movie-poster">
    <h3 class="movie-title">${movie.Title}</h3>
    <p class="movie-year">Year: ${movie.Year}</p>
    <p class="movie-type">Type: ${movie.Type}</p>
    <button class="fav_button">❤️</button>
    `;

   containerId.appendChild(moviecard);


//    favorite button functionality
let favButton = moviecard.querySelector(".fav_button");
favButton.addEventListener("click", function () {

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.includes(movie.Title)) {
        favorites.push(movie.Title);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    renderFavorites();

});
 };
 
//  clearbutton
clearBtn.addEventListener("click", function () {

    localStorage.removeItem("history");

    renderHistory();

});

//  trending movies section
const trendingQueries = [
  "Batman",
  "Avengers",
  "Spider Man",
  "Harry Potter",
  "Jumanji",
  "Interstellar",
  "Joker",
  "Titanic",
  "Fast"
];

searchsection.style.display = "none";
 trendingSection.style.display = "block";
let randomIndex = Math.floor(Math.random() * trendingQueries.length);
let randomQuery = trendingQueries[randomIndex];
fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${randomQuery}`)
 .then(response => response.json())
 .then((data)=>{  
            document.querySelector("#trendingMoviesList").innerHTML = "";
            data.Search.forEach(function(movie) {
              createMovieCard(movie,trendingMoviesList);
        });
 })
 .catch((error)=>{
            console.error("Error fetching movie data:", error);
        });
 
  
renderHistory();
 renderFavorites()
        
       
        