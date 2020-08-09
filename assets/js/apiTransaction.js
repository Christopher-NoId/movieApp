//Valeurs importantes 

const API_KEY = '5f8f59b4a0a0ba55b81262006152fcc4';
const url = "https://api.themoviedb.org/3/search/movie?api_key=5f8f59b4a0a0ba55b81262006152fcc4";
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';



function generateUrl(path) {

  const url = `https://api.themoviedb.org/3${ path }?api_key=5f8f59b4a0a0ba55b81262006152fcc4`;
  return url;
}

function requestMovies(url, onComplete, onError) {

  fetch(url)//on récupère les données de l'API 
    .then((res) => res.json())
    .then(onComplete)
    .catch(onError);

}


function searchMovie(value) {
  const path = '/search/movie';
  const url = generateUrl(path) + '&query=' + value;
  requestMovies(url, renderSearchMovies, handleError);
}


function getUpcomingMovies() {
  const path = '/movie/upcoming';
  const url = generateUrl(path);
  const render = renderMovies.bind({ title: 'Prochaines sorties' });
  requestMovies(url, render, handleError);
}

function getTopRatedMovies() {
  const path = '/movie/top_rated';
  const url = generateUrl(path);
  const render = renderMovies.bind({ title: 'Meilleurs films' });

  requestMovies(url, render, handleError);
}

function getPopularMovies() {
  const path = '/movie/popular';
  const url = generateUrl(path);
  const render = renderMovies.bind({ title: 'Films populaires' });
  requestMovies(url, render, handleError);
}
