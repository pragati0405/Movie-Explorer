 const API_KEY = "4ebbc37";

 let searchbox=document.querySelector("#searchInput");
 let searchButton=document.querySelector("#searchButton");
let searchsection=document.querySelector("#searchSection");
let trendingSection=document.querySelector("#trendingSection"); 
let searchResultsList=document.querySelector("#searchResultsList");
let trendingMoviesList=document.querySelector("#trendingMoviesList");


 searchButton.addEventListener("click", function() {
    if(searchbox.value.trim() !== "") {
        let query = searchbox.value.trim();
        fetch(`https://www.omdbapi.com/?apikey=4ebbc37&s=${query}`)
        .then(response => response.json())
        .then((data)=>{  
             
             searchsection.style.display = "block";
            trendingSection.style.display = "none";
            searchResultsList.innerHTML = "";
           data.Search.forEach(function(movie) {
                createMovieCard(movie, searchResultsList);
            });
                    })
        .catch((error)=>{
            console.error("Error fetching movie data:", error);
        });

    } else {
        alert("Please enter a movie name");
    }
 });
 
 
 function createMovieCard(movie,containerId) {
      let moviecard=document.createElement("div");
    moviecard.classList.add("movie-card");
    moviecard.innerHTML=`
    <img src="${movie.Poster}" alt="${movie.Title} Poster" class="movie-poster">
    <h3 class="movie-title">${movie.Title}</h3>
    <p class="movie-year">Year: ${movie.Year}</p>
    <p class="movie-type">Type: ${movie.Type}</p>
    `;

   containerId.appendChild(moviecard);
 };
 
 

//  trending movies section
const trendingQueries = [
  "Batman",
  "Avengers",
  "Spider Man",
  "Harry Potter",
  "Inception",
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
 
  