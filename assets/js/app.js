

//On sélectionne les éléments du DOM
const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movies-searchable');
const imgElement = document.querySelector('img');
const moviesContainer = document.querySelector('#movies-container');





function movieSection(movies) {

  const section = document.createElement('section');
  section.classList = 'section';


  movies.map((movie) => {

    if (movie.poster_path) {
      const img = document.createElement('img');
      img.src = IMAGE_URL + movie.poster_path;
      img.setAttribute('data-movie-id', movie.id);

      section.appendChild(img);
    }

  })

  return section;
}


//La fonction nous donne une structure html où on récupère les données
// puis on les met en page
function createMovieContainer(movies, title = '') {
  const movieElement = document.createElement('div');
  movieElement.setAttribute('class', 'movie');
  const header = document.createElement('h2');
  header.innerHTML = title;

  const content = document.createElement('div');
  content.classList = 'content';

  const contentClose = `<p id="content-close">X</p>`;
  content.innerHTML = contentClose;

  const section = movieSection(movies);

  movieElement.appendChild(header);
  movieElement.appendChild(section);
  movieElement.appendChild(content);


  return movieElement;

}

function renderSearchMovies(data) {
  //résultats des données
  movieSearchable.innerHTML = '';
  const movies = data.results;
  const movieBlock = createMovieContainer(movies);
  movieSearchable.appendChild(movieBlock);

}

function renderMovies(data) {
  //résultats des données
  const movies = data.results;
  const movieBlock = createMovieContainer(movies, this.title);
  moviesContainer.appendChild(movieBlock);
  console.log('Data:', data);

}


function handleError(error) {
  console.log('Error', error);

}
//envoi d'une fonction au clic sur buttonElement
buttonElement.onclick = function (event) {
  event.preventDefault();
  const value = inputElement.value;//on récupère les valeurs entrées dans l'input
  //const path = '/search/movie';
  //const newUrl = generateUrl(path) + '&query=' + value;

  //fetch(newUrl)//on récupère les données de l'API 
  //  .then((res) => res.json())
  //  .then(renderSearchMovies)
  //  .catch((error) => {
  //  });
  searchMovie(value);

  inputElement.value = '';
  console.log('Valeur:', value);//on les met en console

}

//
function createIframe(video) {
  const iframe = document.createElement('iframe');
  iframe.src = `https://youtube.com//embed/${ video.key }`;
  iframe.width = 360;
  iframe.height = 315;
  iframe.allowFullscreen = true;

  return iframe;

}

function createVideoTemplate(data, content) {

  content.innerHTML = '<p id="content-close">X</p>';
  console.log('Videos: ', data);
  const videos = data.results;
  const length = videos.length > 4 ? 4 : videos.length;
  const iframeContainer = document.createElement('div');

  for (let i = 0; 1 < length; i++) {
    const video = videos[i];
    const iframe = createIframe(video);
    iframeContainer.appendChild(iframe);
    content.appendChild(iframeContainer);
  }

}

//Event delegation

document.onclick = function (event) {

  const target = event.target;

  if (target.tagName.toLowerCase() === 'img') {

    const movieId = target.dataset.movieId;
    console.log('Movie ID: ', movieId);
    const section = event.target.parentElement;// puis on cible l'élément html section,parent de  l'élément html img
    const content = section.nextElementSibling;//on cible l'élément enfant de section, qui est  content
    content.classList.add('content-display');


    const path = `/movie/${ movieId }/videos`;
    const url = generateUrl(path);

    //récupération des vidéos

    fetch(url)
      .then((res) => res.json())
      .then((data) => createVideoTemplate(data, content))
      .catch((error) => {

        console.log('Error: ', error);

      });



  }

  if (target.id === 'content-close') {
    const content = target.parentElement;
    content.classList.remove('content-display');
  }

}

searchMovie('Spiderman');
getUpcomingMovies();

getTopRatedMovies();

getPopularMovies();











//document.onclick = function (event) {

//  const target = event.target;

//  if (target.tagName.toLowerCase() === 'img') {//on cible l'image sur laquelle on click
//    console.log('Event: ', event);
//    const movieId = target.dataset.movieId;
//    console.log('Movie ID : ', movieId);
//    /*point de sauvegarde*/
//    const section = event.target.parentElement;//
//    const content = section.nextElementSibling;//
//    content.classList.add('content-display');
//  }
