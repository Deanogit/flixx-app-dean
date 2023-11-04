const global = {
  currentPage: window.location.pathname,
};

// Display popular movies
async function displayPopluarMovies() {
  const { results } = await fetchAPIData('movie/popular');
  //   console.log(results);
  results.forEach((movie) => {
    const movieEl = document.createElement('div');
    movieEl.classList.add('card');

    const linkEl = document.createElement('a');
    linkEl.setAttribute = ('href', `${movie.id}`);

    const linkImg = document.createElement('img');
    linkImg.classList.add('card-img-top');
    if (movie.poster_path) {
      linkImg.setAttribute(
        'src',
        `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      );
    } else {
      linkImg.setAttribute('src', 'images/no-image.jpg');
    }
    linkImg.setAttribute('alt', `${movie.title}`);

    linkEl.appendChild(linkImg);

    const cardBodyEl = document.createElement('div');
    cardBodyEl.classList.add('card-body');

    const cardTitleEl = document.createElement('h5');
    cardTitleEl.classList.add('card-title');
    cardTitleEl.textContent = `${movie.title}`;

    const cardTextEl = document.createElement('p');
    cardTextEl.classList.add('card-text');

    const textMutedEl = document.createElement('small');
    textMutedEl.classList.add('text-muted');
    textMutedEl.textContent = `${movie.release_date}`;

    cardTextEl.appendChild(textMutedEl);

    cardBodyEl.appendChild(cardTitleEl, cardTextEl);

    movieEl.appendChild(linkEl, cardBodyEl);

    const popularMovies = document.querySelector('#popular-movies');

    popularMovies.appendChild(movieEl);

    //     <div class="card">
    //     <a href="movie-details.html?id=1">
    //       <img
    //         src="images/no-image.jpg"
    //         class="card-img-top"
    //         alt="Movie Title"
    //       />
    //     </a>
    //     <div class="card-body">
    //       <h5 class="card-title">Movie Title</h5>
    //       <p class="card-text">
    //         <small class="text-muted">Release: XX/XX/XXXX</small>
    //       </p>
    //     </div>
    //   </div>

    //   .console.log(result.original_title);
    console.log(movie.backdrop_path);
    console.log(movie.title);
    console.log(movie.release_date);
  });
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  // For production don't put the key in here, should be on a server
  const API_KEY = 'd1d13de9cd6e9b2b547262bc432f43af';
  const API_URL = 'https://api.themoviedb.org/3/';

  const response = fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = (await response).json();
  return data;
}

// Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');

  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage)
      link.classList.add('active');
  });
}
// I thought there might need to be an eventlistener to listen to the clicks, but actually its not required, if the href matches global.currentPage, then it works fine already, placed in the init, which actually has an eventListener, when the DOMContentLoaded fires!

// Init App

function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      console.log('Home');
      displayPopluarMovies();
      break;
    case '/shows.html':
      console.log('Shows');
      break;
    case '/movie-details.html':
      console.log('Movie-details');
      break;
    case '/tv-details.html':
      console.log('Tv details');
      break;
    case '/search.html':
      console.log('Search');
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init());
