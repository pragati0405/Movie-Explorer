 const API_KEY = "4ebbc37";

 let searchbox=document.querySelector("#searchInput");
 let searchButton=document.querySelector("#searchButton");
let searchsection=document.querySelector(".searchSection");
let trendingSection=document.querySelector(".trendingSection");   
 searchButton.addEventListener("click", function() {
    if(searchbox.value.trim() !== "") {
        let movie = searchbox.value.trim();
        fetch(`https://www.omdbapi.com/?apikey=4ebbc37&s==${movie}`)
        .then(response => response.json())
        .then((data)=>{
            createMovieCards(data.Search);
             })
        .catch((error)=>{
            console.error("Error fetching movie data:", error);
        });

    } else {
        alert("Please enter a movie name");
    }
 });
 
 
 function createMovieCards(movies) {
     document.querySelector(".movie-grid").innerHTML = "";
     searchsection.style.display = "block";
     trendingSection.style.display = "none";
    let moviecard=document.createElement("div");
    moviecard.classList.add("movie-card");
    moviecard.innerHTML=`

   document.querySelector(".movie-grid").appendChild(moviecard);
 };
 
 data.Search.forEach(function(movie){
                console.log(movie.Title);
                console.log(movie.Year);
                console.log(movie.Type);
                console.log(movie.Poster);
                console.log(" -------------------");

            });